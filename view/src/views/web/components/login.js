import './index.scss';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, Tabs } from 'ant-design-vue';
const { TabPane } = Tabs;
const { Option } = Select;
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
        const { getFieldDecorator } = this.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return <div class="loginform">
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
                <Form.Item label="账号">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入账号"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="密码">
                    {getFieldDecorator('pass', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
            </Form>
            <div style="width:100%;text-align:center">
                <button class="custom-btn-red">登录</button>
                <button class="custom-btn-red">重置</button>
            </div>
        </div>
    }
};
var login = Form.create()(Index);
export default login;


