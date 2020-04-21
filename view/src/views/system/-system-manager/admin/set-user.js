import './index.scss';
import { Form, Row, Col, Input, Button, message, Modal } from 'ant-design-vue';

const Index = {
    props:["reload"],
    data() {
        return {
            showAdd: false,
            user: {},
            userId: ""
        };
    },
    mounted() {
    },
    methods: {
        show(id) {
            this.userId = id || "";
            if(id){
                this.getUser(id);
            }
            this.showAdd = true;
        },
        getUser(id) {
            $ajax({
                url: "/user/findOne",
                data: {id}
            }).then(data => {
                if (data.code == 1) {
                    this.user = data.data;
                    this.userId = data.data.id;
                }
            })
        },
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    if (this.userId == "") {
                        $ajax({
                            url: "/user/save",
                            data: values
                        }).then(data => {
                            if (data.code == 1) {
                                this.user = data.data;
                                this.userId = data.data.id;
                            }
                            message.success(data.msg);
                            this.reload();
                        })
                    } else {
                        $ajax({
                            url: "/user/update",
                            data: { ...values, id: this.userId }
                        }).then(data => {
                            message.success(data.msg);
                            this.reload();
                        })
                    }

                }
            });
        },
        handleCancel() {
            this.showAdd = false;
        }
    },
    render() {
        const { getFieldDecorator } = this.form;
        const user = this.user;
        return <Modal
            title="配置用户"
            visible={this.showAdd}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确定"
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} class="ant-advanced-search-form">
                <Form.Item label="账号">
                    {getFieldDecorator("username", {
                        initialValue: user.username || "",
                        rules: [
                            {
                                required: true,
                                message: '账户名称必填',
                            },
                        ],
                    })(
                        this.userId==""?<Input />:<Input disabled/>
                    )}
                </Form.Item>
                <Form.Item label="昵称">
                    {getFieldDecorator("nickname", {
                        initialValue: user.nickname || "",
                        rules: [
                            {
                                required: true,
                                message: '昵称必填',
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="密码">
                    {getFieldDecorator("password", {
                        initialValue: user.password || "123",
                        rules: [
                            {
                                required: true,
                                message: '密码必填',
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="年龄">
                    {getFieldDecorator("age", {
                        initialValue: user.password || "",
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="手机号">
                    {getFieldDecorator("telphone", {
                        initialValue: user.telphone || "",
                        rules: [
                            {
                                required: true,
                                message: '请填写正确的手机号',
                                pattern: /^1[3456789]\d{9}$/
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="身份证">
                    {getFieldDecorator("idcard", {
                        initialValue: user.idcard || "",
                        rules: [
                            {
                                required: true,
                                message: '请填写正确的身份证号码',
                                pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
            </Form>
        </Modal>
    }
};
var form = Form.create()(Index);
export default form;


