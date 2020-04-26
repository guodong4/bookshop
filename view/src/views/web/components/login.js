import './index.scss';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, Tabs } from 'ant-design-vue';
const { TabPane } = Tabs;
const { Option } = Select;
const Index = {
    data() {
        return {
        };
    },
    mounted() {

    },
    methods: {
        login() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    $ajax({
                        url: "/member/login",
                        data: values
                    }).then(data => {
                        if (data.code == 1) {
                            localStorage.setItem("user", JSON.stringify(data.data));
                            this.$router.push("/system");
                        } else {
                            this.msg = data.msg;
                        }
                    })
                }
            });
        },
        toLogin() {
            this.login = true;
        },
        onClose() {
            this.login = false;
        }
    },
    render() {
        const { getFieldDecorator } = this.form;
        return <div class="loginform">
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 12 }}>
                <Form.Item label="手机号">
                    {getFieldDecorator('telphone', {
                        rules: [{ required: true, message: '请输入手机号' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入手机号"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="密码">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
            </Form>
            <div style="width:100%;text-align:center">
                <button class="custom-btn-red" onClick={this.login}>登录</button>
                <button class="custom-btn-red" onClick={()=>{this.form.resetFields();}}>重置</button>
            </div>
        </div>
    }
};
var login = Form.create()(Index);
export default login;


