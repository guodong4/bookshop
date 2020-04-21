import './index.scss';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, Tabs } from 'ant-design-vue';
const { TabPane } = Tabs;
const { Option } = Select;
import LoginPage from "./login";
import RegisterPage from "./register";
const Index = {
    data() {
        return {
            login: false
        };
    },
    mounted() {

    },
    methods: {
        toLogin() {
            this.login = true;
        },
        onClose() {
            this.login = false;
        }
    },
    render() {
        return <div class="header">
            <div class="content">
                <span class="left">
                    <Icon type="read" /> &nbsp;欢迎光临 welcome to our shop
                </span>
                <span class="right">
                    <Icon type="user" />&nbsp;&nbsp;<a href="javascript:;" onClick={this.toLogin}>登录</a>&nbsp;/&nbsp;<a>注册</a>
                </span>
                <span class="right">
                    admin&nbsp;&nbsp;<a>我的订单</a>&nbsp;&nbsp;<Icon type="user" />&nbsp;&nbsp;<a href="/myself">个人中心</a>&nbsp;/&nbsp;<a>退出</a>
                </span>

            </div>
            <Drawer
                title={null}
                width={420}
                onClose={this.onClose}
                visible={this.login}
                bodyStyle={{ paddingBottom: 80}}
            >
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="登录账号" key="1">
                        <LoginPage/>
                    </TabPane>
                    <TabPane tab="注册新账号" key="2">
                        <RegisterPage/>
                    </TabPane>
                </Tabs>
            </Drawer>
        </div>
    }
};
export default Index;


