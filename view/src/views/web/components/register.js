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
        return <div>
            <Form labelCol={{ span: 9 }} wrapperCol={{ span: 14 }}>
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
                <Form.Item label="再输入一次">
                    {getFieldDecorator('pass', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="昵称">
                    {getFieldDecorator('pass', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="身份证">
                    {getFieldDecorator('pass', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="生日">
                    {getFieldDecorator('pass', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="性别">
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
                <button class="custom-btn-red">注册</button>
                <button class="custom-btn-red">重置</button>
            </div>
        </div>
    }
};
var login = Form.create()(Index);
export default login;


