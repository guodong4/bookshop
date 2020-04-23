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
            fileList: [],
            swoingId: "",
            swoing: {},
            value: ""
        };
    },

    methods: {
        show(id) {
            this.swoingId = id || "";
            if (id) {
                this.getBook(id);
            }
            this.showAdd = true;
        },
        getBook(id) {
            $ajax({
                url: "/swoing/findOne",
                data: { id }
            }).then(data => {
                if (data.code == 1) {
                    this.swoing = data.data;
                    this.swoingId = data.data.id;
                    this.fileList = [{
                        uid: data.data.id + "1",
                        name: data.data.banner_img,
                        status: "done",
                        url: host + "/" + data.data.banner_img
                    }];
                }
            })
        },
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    values.book_name = this.swoing.book_name;
                    values.book_id = this.swoing.book_id;
                    values.banner_img =this.swoing.banner_img;
                    if(!values.book_name||!values.book_id||!values.banner_img){
                        message.error("图书信息不能有空");
                        return;
                    }
                    if (this.swoingId == "") {
                        $ajax({
                            url: "/swoing/save",
                            data: values
                        }).then(data => {
                            if (data.code == 1) {
                                this.swoing = data.data;
                                this.swoingId = data.data.id;
                            }
                            this.handleCancel()
                            message.success(data.msg);
                            this.reload();
                        })
                    } else {
                        $ajax({
                            url: "/swoing/update",
                            data: { ...values, id: this.swoingId }
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
                this.swoing.banner_img = file.file.response.data.filename;
            }
            if (file.file.status == "removed") {
                this.fileList = [];
                this.swoing.banner_img = "";
            }
        },
        preview(file) {
            var win = window.open("", "img");
            win.document.write("<img src='" + file.url + "' style='margin:0 auto'/>")
        },
        handleCancel() {
            this.form.resetFields();
            this.swoing = {};
            this.swoingId = "";
            this.fileList = [];
            this.showAdd = false;
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
                    this.swoing.book_name = arr.book_name;
                    this.swoing.book_id = book_id;
                }
            })
        }
    },
    render() {
        const { getFieldDecorator } = this.form;
        const swoing = this.swoing;
        return <Modal
            title="配置轮播图"
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
                <Form.Item label="轮播图">
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
                </Form.Item>
                <Form.Item label="上下架">
                    {getFieldDecorator("status", {
                        initialValue: swoing.status || "0",
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


