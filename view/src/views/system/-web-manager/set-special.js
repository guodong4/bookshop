import './index.scss';
import { Form, Upload, Input, Menu, Icon, message, Modal, Select } from 'ant-design-vue';
import moment from 'moment';
const { SubMenu } = Menu;

const { Option } = Select;
const Index = {
    props: ["reload"],
    data() {
        return {
            showAdd: false,
            booklist: [],
            bookId: "",
            book: {},
            value: ""
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
                url: "/special/findOne",
                data: { id }
            }).then(data => {
                if (data.code == 1) {
                    this.book = data.data;
                    this.bookId = data.data.id;
                    this.value = data.data.book_name;
                }
            })
        },
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log(this.book);
                    values.book_name = this.book.book_name;
                    values.book_id = this.book.id;
                    values.book_img = this.book.book_img;
                    values.book_desc = this.book.book_desc;
                    if(!values.book_name||!values.book_id){
                        message.error("图书信息不能有空");
                        return;
                    }
                    if (this.bookId == "") {
                        $ajax({
                            url: "/special/save",
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
                            url: "/special/update",
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
        
        handleCancel() {
            this.form.resetFields();
            this.book = {};
            this.bookId = "";
            this.fileList = [];
            this.showAdd = false;
            this.value="";
        },
        handleSearch(value) {
            this.value = value;
            $ajax({
                url: "/book/findAllByName",
                data: { book_name: value }
            }).then(data => {
                this.booklist = data;
            })
        },
        changeBook(book_id) {
            this.booklist.map(arr => {
                if (arr.id == book_id) {
                    this.value = arr.book_name;
                    this.book = arr;
                }
            })
        }
    },
    render() {
        const { getFieldDecorator } = this.form;
        const book = this.book;
        return <Modal
            title="配置今日特价"
            visible={this.showAdd}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确定"
            width="60%"
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} class="ant-advanced-search-form">
                <Form.Item label="图书选择">
                    <Select
                        showSearch
                        value={this.value}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={this.handleSearch}
                        onChange={this.changeBook}
                        notFoundContent={null}
                    >
                        {
                            this.booklist.map((arr, index) => {
                                return <Option key={index} value={arr.id} data={arr.book_name}>{arr.book_name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="上下架">
                    {getFieldDecorator("status", {
                        initialValue: book.status || "0",
                    })(
                        <Select>
                            <Option value="1">上架</Option>
                            <Option value="0">下架</Option>
                        </Select>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    }
};
var form = Form.create()(Index);
export default form;


