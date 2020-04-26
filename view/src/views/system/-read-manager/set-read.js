import { Form, Upload, Input, Menu, Dropdown, Button, Icon, message, Modal, InputNumber, DatePicker, Select } from 'ant-design-vue';
import moment from 'moment';
const { SubMenu } = Menu;

const { Option } = Select;
const Index = {
    props: ["reload"],
    data() {
        return {
            showAdd: false,
            book: {},
            bookId: "",
            bookType: [],
            fileList: []
        };
    },
    methods: {
        show(id) {
            this.bookId = id || "";
            if (id) {
                this.getBook(id);
            }
            this.showAdd = true;
        },
        getBook(id) {
            $ajax({
                url: "/read/findOne",
                data: { id }
            }).then(data => {
                if (data.code == 1) {
                    this.book = data.data;
                    this.bookId = data.data.id;
                    this.fileList = [{
                        uid: data.data.id + "1",
                        name: data.data.book_img,
                        status: "done",
                        url: host + "/" + data.data.book_img
                    }];
                }
            })
        },
        handleOk() {
            this.form.validateFields((err, values) => {
                values.publish_time = values.publish_time.format('YYYY-MM-DD');
                values.book_img = this.book.book_img;
                
                //this.book = Object.assign(values, this.book);
                //console.log(this.book)
                // this.book.book_press_time = this.book.book_press_time.format('YYYY-MM-DD');
                if (!err) {
                    if (this.bookId == "") {
                        values.read_num=0;
                        $ajax({
                            url: "/read/save",
                            data: values
                        }).then(data => {
                            if (data.code == 1) {
                                this.book = data.data;
                                this.bookId = data.data.id;
                            }
                            this.handleCancel()
                            message.success(data.msg);
                            this.reload();
                        })
                    } else {
                        $ajax({
                            url: "/read/update",
                            data: { ...values, id: this.bookId }
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
        uploadImg(file) {
            this.fileList = [{
                ...file.file,
                url: file.file.response ? host + "/" + file.file.response.data.filename : ""
            }];
            if (file.file.status == "done") {
                this.book.book_img = file.file.response.data.filename;
            }
            if (file.file.status == "removed") {
                this.fileList = [];
                this.book.book_img = "";
            }
        },
        preview(file) {
            var win = window.open("", "img");
            win.document.write("<img src='" + file.url + "' style='margin:0 auto'/>")
        },
        handleCancel() {
            this.form.resetFields();
            this.book = {};
            this.bookId = "";
            this.fileList = [];
            this.showAdd = false;
        },
        selectType(data) {
            this.book.book_type_text = data.domEvent.target.innerText;
            this.book.book_type = data.key;
            this.$forceUpdate();
        }
    },
    render() {
        const { getFieldDecorator } = this.form;
        return <Modal
            title="配置图书"
            visible={this.showAdd}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确定"
            width="60%"
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} class="ant-advanced-search-form">
                <Form.Item label="电子书名">
                    {getFieldDecorator("title", {
                        initialValue: this.book.title || "",
                        rules: [
                            {
                                required: true,
                                message: '名称必填',
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="图书简介">
                    {getFieldDecorator("desc", {
                        initialValue: this.book.desc || "",
                        rules: [
                            {
                                required: true,
                                message: '简介必填',
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="封皮">
                    {getFieldDecorator("book_img", {
                        initialValue: this.book.book_img || "",
                        rules: [
                            {
                                required: true,
                                message: '封皮不能为空',
                            },
                        ],
                    })(
                        <Upload
                            listType="picture-card"
                            showUploadList={true}
                            onPreview={this.preview}
                            fileList={this.fileList}
                            action={host + "/book/upload"}
                            onChange={this.uploadImg}
                        >
                            {
                                <div>
                                    <Icon type='plus' />
                                    <div class="ant-upload-text">上传</div>
                                </div>
                            }
                        </Upload>
                    )}
                </Form.Item>
                <Form.Item label="作者">
                    {getFieldDecorator("author", {
                        initialValue: this.book.author || "",
                        rules: [
                            {
                                required: true,
                                message: '作者不能为空',
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="出版时间">
                    {getFieldDecorator("publish_time", {
                        initialValue: this.book.publish_time?moment(this.book.publish_time):this.book.publish_time,
                        rules: [
                            {
                                required: true,
                                message: '出版时间不能为空!'
                            }
                        ],
                    })(
                        <DatePicker placeholder="选择时间" format='YYYY-MM-DD'/>
                    )}
                </Form.Item>
                <Form.Item label="阅读人群">
                    {getFieldDecorator("type", {
                        initialValue: this.book.type || "0",
                        rules: [
                            {
                                required: true,
                                message: '阅读人群',
                            },
                        ],
                    })(
                        <Select>
                            <Option value="1">会员</Option>
                            <Option value="0">游客</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="上下架">
                    {getFieldDecorator("book_status", {
                        initialValue: this.book.book_status || "0",
                    })(
                        <Select>
                            <Option value="1">上架</Option>
                            <Option value="0">下架</Option>
                        </Select>
                    )}
                </Form.Item>
                {/* <Form.Item label="发布时间">
                    {getFieldDecorator("book_publish_time", {
                        initialValue: book.idcard || "",
                        rules: [
                            {
                                required: true,
                                message: '请填写正确的身份证号码',
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item> */}
            </Form>
        </Modal>
    }
};
var form = Form.create()(Index);
export default form;


