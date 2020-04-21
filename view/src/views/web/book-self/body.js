import './index.scss';
import { Layout, Menu, Icon} from "ant-design-vue";
const { Content, Sider } = Layout;
import "@/components/broadcast/index.css";
import SearchModule from "../components/search"
import Comment from "./-comment";
import OrderList from "./-order-list";
import MySelf from "./-myself";
var autoscroll = null;
const Index = {
    data() {
        return {
            menu_item: "5"
        };
    },
    mounted() {

    },
    methods: {
        changeItem(data) {
            if (data.key == 1) this.$router.push("/cart");
            if (data.key == 3) this.$router.push("/collection");
            this.menu_item = data.key;
        }
    },
    render() {
        var components = {
            "2": <OrderList />,
            "4": <Comment />,
            "5": <MySelf />
        }
        return <div class="book-self">
            <SearchModule />
            <div class="content">
                <Layout class="system">
                    <Layout style="min-height:800px">
                        <Sider>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={["5"]} onClick={this.changeItem}>
                                <Menu.Item key="5">
                                    <Icon type="user" />
                                    <span>个人信息</span>
                                </Menu.Item>
                                <Menu.Item key="1">
                                    <Icon type="shopping-cart" />
                                    <span>我的购物车</span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon type="unordered-list" />
                                    <span>我的订单</span>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Icon type="heart" />
                                    <span>我的收藏</span>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Icon type="smile" />
                                    <span>评价管理</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{
                            margin: '4px',
                            padding: "10px",
                            background: '#fff',
                            minHeight: 280,
                        }}>{
                                components[this.menu_item]
                            }</Content>
                    </Layout>
                </Layout>
            </div >
            
        </div >
    }
};
export default Index;


