import './index.scss';
import { Form, Row, Col, Input, Button, message, Modal } from 'ant-design-vue';

const Index = {
    props: ["reload"],
    data() {
        return {
            showModal: false,
            bookTypeId: "",
            type: "",
            bookType:{}
        };
    },
    mounted() {
    },
    methods: {
        show(id, type) {
            this.bookTypeId = id || "";
            this.type = type || "";
            if (id&&this.type=="") {
                this.getData(id);
            }
            this.showModal = true;
        },
        getData(id) {
            $ajax({
                url: "/bookType/findOne",
                data: { id }
            }).then(data => {
                if (data.code == 1) {
                    this.bookType = data.data;
                    this.bookTypeId = data.data.id;
                }
            })
        },
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    if (this.bookTypeId == "") {
                        $ajax({
                            url: "/bookType/save",
                            data: values
                        }).then(data => {
                            if (data.code == 1) {
                                this.bookType = data.data;
                            }
                            message.success(data.msg);
                            this.reload();
                            this.handleCancel();
                        })
                    } else {
                        if (this.type == "addChild") {
                            $ajax({
                                url: "/bookType/save",
                                data: {...values,parent:this.bookTypeId }
                            }).then(data => {
                                if (data.code == 1) {
                                    this.bookType = data.data;
                                }
                                message.success(data.msg);
                                this.reload();
                                this.handleCancel();
                            })
                        } else {
                            $ajax({
                                url: "/bookType/update",
                                data: { ...values, id: this.bookTypeId }
                            }).then(data => {
                                message.success(data.msg);
                                this.reload();
                                this.handleCancel();
                            })
                        }
                    }
                }
            });
        },
        handleCancel() {
            this.bookType={};
            this.showModal = false;
        }
    },
    render() {
        const { getFieldDecorator } = this.form;
        const bookType = this.bookType;
        return <Modal
            title="配置分类"
            visible={this.showModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确定"
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} class="ant-advanced-search-form">
                <Form.Item label="分类名称">
                    {getFieldDecorator("type", {
                        initialValue: bookType.type || "",
                        rules: [
                            {
                                required: true,
                                message: '分类名称必填',
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


