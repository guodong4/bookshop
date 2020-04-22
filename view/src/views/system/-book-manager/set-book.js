import './index.scss';
import { Form, Upload, Input, Menu, Dropdown, Button, Icon, message, Modal, InputNumber, DatePicker, Select } from 'ant-design-vue';

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
    mounted() {
        this.getTypeData();
    },
    methods: {
        getTypeData() {
            $ajax({
                url: "/bookType/findAll",
            }).then(data => {
                var parentArr = data.rows.filter(arr => arr.parent == null);
                this.bookType = parentArr.map(arr => {
                    var bookType = {
                        id: arr.id,
                        type: arr.type
                    };
                    data.rows.map(item => {
                        if (item.parent == arr.id) {
                            bookType.child = bookType.child || [];
                            bookType.child.push({
                                id: item.id,
                                type: item.type,
                            })
                        }
                    })
                    return bookType;
                })
            })
        },
        show(id) {
            this.bookId = id || "";
            if (id) {
                this.getBook(id);
            }
            this.showAdd = true;
        },
        getBook(id) {
            $ajax({
                url: "/book/findOne",
                data: { id }
            }).then(data => {
                if (data.code == 1) {
                    this.book = data.data;
                    this.bookId = data.data.id;
                }
            })
        },
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    if (this.bookId == "") {
                        $ajax({
                            url: "/book/save",
                            data: values
                        }).then(data => {
                            if (data.code == 1) {
                                this.book = data.data;
                                this.bookId = data.data.id;
                            }
                            message.success(data.msg);
                            this.reload();
                        })
                    } else {
                        $ajax({
                            url: "/book/update",
                            data: { ...values, id: this.bookId }
                        }).then(data => {
                            message.success(data.msg);
                            this.reload();
                        })
                    }

                }
            });
        },
        uploadImg(file) {
            this.fileList = [{
                uid: file.file.uid,
                name: file.file.name,
                status: file.file.status,
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
            this.showAdd = false;
        },
        selectType(data) {
            console.log(data);
            this.book.book_type_text = data.item.$attrs.data;
            this.book.book_type = data.key;
            this.$forceUpdate();
        }
    },
    render() {
        const { getFieldDecorator } = this.form;
        const book = this.book;
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
                <Form.Item label="图书名称">
                    {getFieldDecorator("book_name", {
                        initialValue: book.book_name || "",
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
                    {getFieldDecorator("book_desc", {
                        initialValue: book.book_desc || "",
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
                <Form.Item label="现价">
                    {getFieldDecorator("book_price", {
                        initialValue: book.book_price || "",
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="原价">
                    {getFieldDecorator("book_old_price", {
                        initialValue: book.book_old_price || "",
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="封皮">
                    {getFieldDecorator("book_img", {
                        initialValue: book.book_img || "",
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
                    {getFieldDecorator("book_author", {
                        initialValue: book.book_author || "",
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
                <Form.Item label="出版社">
                    {getFieldDecorator("book_press", {
                        initialValue: book.book_press || "",
                        rules: [
                            {
                                required: true,
                                message: '出版社不能为空',
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="库存">
                    {getFieldDecorator("book_stock", {
                        initialValue: book.book_stock || 0,
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(
                        <InputNumber />
                    )}
                </Form.Item>
                <Form.Item label="出版时间">
                    {getFieldDecorator("book_press_time", {
                        initialValue: book.book_press_time,
                        rules: [
                            {
                                required: true,
                                message: '出版时间不能为空',
                            },
                        ],
                    })(
                        <DatePicker placeholder="选择时间" />
                    )}
                </Form.Item>
                <Form.Item label="商品编码">
                    {getFieldDecorator("book_code", {
                        initialValue: book.book_code || "",
                        rules: [
                            {
                                required: true,
                                message: '商品编码不能为空',
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="图书类别">
                    {getFieldDecorator("book_type", {
                        initialValue: book.book_type || "",
                        rules: [
                            {
                                required: true,
                                message: '图书类别不能为空',
                            },
                        ],
                    })(
                        <Dropdown overlay={
                            <Menu onClick={this.selectType}>
                                {
                                    this.bookType.map(arr => {
                                        if (arr.child) {
                                            return <SubMenu title={arr.type}>
                                                {arr.child.map(item => <Menu.Item key={item.id} data={item.type}>{item.type}</Menu.Item>)}
                                            </SubMenu>
                                        }
                                        return <Menu.Item key={arr.id} data={arr.type}>{arr.type}</Menu.Item>
                                    })
                                }
                            </Menu>
                        }>
                            <a class="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                {book.book_type_text || "请选择分类"} <Icon type="down" />
                            </a>
                        </Dropdown>
                    )}
                </Form.Item>
                <Form.Item label="图书备注">
                    {getFieldDecorator("book_remarks", {
                        initialValue: book.book_remarks || "",
                        rules: [
                            {
                                required: false
                            },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label="上下架">
                    {getFieldDecorator("book_status", {
                        initialValue: book.book_status || "2",
                    })(
                        <Select>
                            <Option value="1">上架</Option>
                            <Option value="2">下架</Option>
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


