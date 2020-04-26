import './index.scss';
import { Form, Button, Col, Row, Input, Select, DatePicker, Icon, Tabs, message } from 'ant-design-vue';
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
        register(){
            this.form.validateFields((err, values) => {
                if (!err) {
                    values.birthday = values.birthday.format('YYYY-MM-DD');
                    if(values.aginpass!=values.password){
                        message.error("两次密码输入不一致");
                        return;
                    }
                    $ajax({
                        url: "/member/register",
                        data: values
                    }).then(data => {
                        if (data.code == 1) {
                            localStorage.setItem("member", JSON.stringify(data.data));
                            message.success(data.msg);
                            wondow.location.reload();
                        } else {
                            message.error(data.msg);
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
                <Form.Item label="手机号">
                    {getFieldDecorator('telphone', {
                        rules: [{ required: true, message: '手机号不能为空' }],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="密码">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input.Password/>
                    )}
                </Form.Item>
                <Form.Item label="再输入一次">
                    {getFieldDecorator('aginpass', {
                        rules: [{ required: true, message: '不能为空' }],
                    })(
                        <Input.Password/>
                    )}
                </Form.Item>
                <Form.Item label="昵称">
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '昵称不能为空' }],
                    })(
                        <Input/>
                    )}
                </Form.Item>

                <Form.Item label="身份证">
                    {getFieldDecorator('idcard', {
                        rules: [{ required: true, message: '身份证不能为空' }],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item label="生日">
                    {getFieldDecorator('birthday')(
                        <DatePicker/>
                    )}
                </Form.Item>
                <Form.Item label="性别">
                    {getFieldDecorator('sex')(
                        <Select><Option value="0">男</Option><Option value="1">女</Option></Select>
                    )}
                </Form.Item>
            </Form>
            <div style="width:100%;text-align:center">
                <button class="custom-btn-red" onClick={this.register}>注册</button>
                <button class="custom-btn-red" onClick={this.form.resetFields}>重置</button>
            </div>
        </div>
    }
};
var login = Form.create()(Index);
export default login;


