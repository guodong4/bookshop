import './index.scss';
import { Form, Upload, Input, Menu, Dropdown, Button, Icon, message, Modal, InputNumber, DatePicker, Select, Checkbox } from 'ant-design-vue';
import moment from 'moment';
const { SubMenu } = Menu;

const { Option } = Select;
const Index = {
    props: ["reload"],
    data() {
        return {
            showAdd: false,
            order: {},
            addressId:""
        };
    },
    mounted() {
        this.member = localStorage.getItem("member");
        this.member = JSON.parse(this.member);
    }, 
    methods: {
        show(id) {
            this.addressId=id||"";
            this.showAdd = true;
            if(this.addressId){
                this.getAddress()
            }
        },
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    if (this.addressId == "") {
                        values.is_default = values.is_default?1:0;
                        $ajax({
                            url: "/order/saveAddress",
                            data: {
                                ...values,
                                member_id:this.member.id,
                            }
                        }).then(data => {
                            this.handleCancel()
                            message.success(data.msg);
                            this.reload();
                        })
                    } else {
                        values.is_default = values.is_default?1:0;
                        $ajax({
                            url: "/order/updateAddress",
                            data: { ...values, id: this.order.id,member_id:this.member.id}
                        }).then(data => {
                            this.handleCancel()
                            message.success(data.msg);
                            this.reload();
                        })
                    }

                } else {
                    console.log(err);
                }
            });
        },
        getAddress(){
            $ajax({
                url: "/order/findOneAddress",
                data: {
                    id:this.addressId
                }
            }).then(data=>{
                this.order = data;
            })
        },
        handleCancel() {
            this.form.resetFields();
            this.order = {};
            this.showAdd = false;
        }
    },
    render() {
        const { getFieldDecorator } = this.form;
        return <Modal
            title="设置地址"
            visible={this.showAdd}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确定"
            width="60%"
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} class="ant-advanced-search-form">
                <Form.Item label="详细地址">
                    {getFieldDecorator("address", {
                        initialValue: this.order.address || "",
                        rules: [
                            {
                                required: true,
                                message: '地址必填',
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="手机号">
                    {getFieldDecorator("phone_number", {
                        initialValue: this.order.phone_number || "",
                        rules: [
                            {
                                required: true,
                                message: '手机号必填',
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="收件人">
                    {getFieldDecorator("receiver", {
                        initialValue: this.order.receiver || "",
                        rules: [
                            {
                                required: true,
                                message: '收件人必填',
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="设置为默认">
                    {getFieldDecorator("is_default", {
                        initialValue: this.order.is_default,
                    })(
                        <Checkbox checked={this.order.is_default==1} onChange={(e)=>{
                            this.order.is_default= e.target.checked?1:0;
                        }}/>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    }
};
var form = Form.create()(Index);
export default form;


