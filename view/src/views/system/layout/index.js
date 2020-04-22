import './index.scss';
import { Layout, Menu, Icon, message } from 'ant-design-vue';
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
import BookManager from "../-book-manager";
import BookTypeManager from "../-book-type-manager";
import CommentManager from "../-comment-manager";
import OrderManager from "../-order-manager";
import MemberManager from "../-member-manager";
import Ad from "../-web-manager/ad";
import Swoing from "../-web-manager/sowing";
import UpdatePass from "../-system-manager/updatePass/";
import Admin from "../-system-manager/admin/";
import TodaySpecial from "../-web-manager/today-special";
const Index = {
    data() {
        return {
            menu_item: "1-1",
            systemrule: "1,1-1,1-2,1-3,2,3,4,5,6,7,6-1,6-2".split(","),
            user: {}
        };
    },
    mounted() {
        //this.checkLogin();
    },
    methods: {
        checkLogin() {
            var user = localStorage.getItem("user");
            user = JSON.parse(user);
            if (!user || !user.id) {
                message.error("未登录，跳转登录页");
                this.$router.push("/system/login");
            } else {
                this.getUser(user.id);
            }
        },
        getUser(id) {
            $ajax({
                url: "/user/findOne",
                data: { id }
            }).then(data => {
                if (data.code == 1) {
                    this.user = data.data;
                    this.systemrule = data.data.systemrule ? data.data.systemrule.split(",") : [];
                }
            })
        },
        selectItem(data) {
            this.menu_item = data.key;
        },
        logout(){
            localStorage.removeItem("user");
            this.$router.push("/system/login");　
        }
    },
    render() {
        const components = {
            "1-1": <Swoing />,
            "1-2": <TodaySpecial />,
            "1-3": <Ad />,
            "2": <BookManager />,
            "3": <OrderManager />,
            "4": <CommentManager />,
            "5": <MemberManager />,
            "7": <BookTypeManager />,
            "6-1": <Admin />,
            "6-2": <UpdatePass />,
        };
        return <Layout class="system">
            <Header>
                <div class="logoadmin">
                    <Icon type="read" />&nbsp;&nbsp;黄金书屋管理系统
                </div>
                <div class="adminmsg" style="margin-left:20px">
                    <button class="custom-btn-red custom-btn-small" onClick={this.logout}>退出</button>
                </div>
                <div class="adminmsg">
                    欢迎您，{this.user.nickname}
                </div>
            </Header>
            <Layout style="min-height:800px">
                <Sider>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.selectItem}>
                        {
                            this.systemrule.indexOf("1") > -1 ?
                                <SubMenu
                                    key="1"
                                    title={
                                        <span>
                                            <Icon type="hdd" />
                                            <span>网站管理</span>
                                        </span>
                                    }
                                >
                                    {this.systemrule.indexOf("1-1") > -1 ? <Menu.Item key="1-1">轮播图管理</Menu.Item> : ""}
                                    {this.systemrule.indexOf("1-2") > -1 ? <Menu.Item key="1-2">今日特价</Menu.Item> : ""}
                                    {this.systemrule.indexOf("1-3") > -1 ? <Menu.Item key="1-3">广告位</Menu.Item> : ""}
                                </SubMenu> : ""
                        }
                        {
                            this.systemrule.indexOf("2") > -1 ? <Menu.Item key="2">
                                <Icon type="read" />
                                <span>图书管理</span>
                            </Menu.Item> : ""
                        }
                        {
                            this.systemrule.indexOf("7") > -1 ? <Menu.Item key="7">
                                <Icon type="deployment-unit" />
                                <span>分类管理</span>
                            </Menu.Item> : ""
                        }
                        {
                            this.systemrule.indexOf("3") > -1 ? <Menu.Item key="3">
                                <Icon type="ordered-list" />
                                <span>订单管理</span>
                            </Menu.Item> : ""
                        }
                        {
                            this.systemrule.indexOf("4") > -1 ? <Menu.Item key="4">
                                <Icon type="smile" />
                                <span>评论管理</span>
                            </Menu.Item> : ""
                        }
                        {
                            this.systemrule.indexOf("5") > -1 ? <Menu.Item key="5">
                                <Icon type="user" />
                                <span>会员管理</span>
                            </Menu.Item> : ""
                        }
                        {
                            this.systemrule.indexOf("6") > -1 ?
                                <SubMenu
                                    key="6"
                                    title={
                                        <span>
                                            <Icon type="hdd" />
                                            <span>系统管理</span>
                                        </span>
                                    }
                                >
                                    {this.systemrule.indexOf("6-1") > -1 ? <Menu.Item key="6-1">管理员管理</Menu.Item> : ""}
                                    {this.systemrule.indexOf("6-2") > -1 ? <Menu.Item key="6-2">修改密码</Menu.Item> : ""}
                                </SubMenu> : ""
                        }
                    </Menu>
                </Sider>
                <Content style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 280,
                }}>{components[this.menu_item]}</Content>
            </Layout>
        </Layout>
    }
};
export default Index;


