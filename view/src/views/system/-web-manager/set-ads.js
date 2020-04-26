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
            fileList: [],
            adsId: "",
            ads: {},
            value: ""
        };
    },

    methods: {
        show(id) {
            this.adsId = id || "";
            if (id) {
                this.getAds(id);
            }
            this.showAdd = true;
        },
        getAds(id) {
            $ajax({
                url: "/ads/findOne",
                data: { id }
            }).then(data => {
                if (data.code == 1) {
                    this.ads = data.data;
                    this.adsId = data.data.id;
                    this.fileList = [{
                        uid: data.data.id + "1",
                        name: data.data.img_path,
                        status: "done",
                        url: host + "/" + data.data.img_path
                    }];
                }
            })
        },
        handleOk() {
            this.form.validateFields((err, values) => {
                if (!err) {
                    values.img_path = this.ads.img_path;
                    if (!values.url || !values.desc || !values.img_path) {
                        message.error("信息不能有空");
                        return;
                    }
                    if (this.adsId == "") {
                        $ajax({
                            url: "/ads/save",
                            data: values
                        }).then(data => {
                            if (data.code == 1) {
                                this.ads = data.data;
                                this.adsId = data.data.id;
                            }
                            this.handleCancel()
                            message.success(data.msg);
                            this.reload();
                        })
                    } else {
                        $ajax({
                            url: "/ads/update",
                            data: { ...values, id: this.adsId }
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
                this.ads.img_path = file.file.response.data.filename;
            }
            if (file.file.status == "removed") {
                this.fileList = [];
                this.ads.img_path = "";
            }
        },
        preview(file) {
            var win = window.open("", "img");
            win.document.write("<img src='" + file.url + "' style='margin:0 auto'/>")
        },
        handleCancel() {
            this.form.resetFields();
            this.ads = {};
            this.adsId = "";
            this.fileList = [];
            this.showAdd = false;
            this.value = "";
        }
    },
    render() {
        const { getFieldDecorator } = this.form;
        const ads = this.ads;
        return <Modal
            title="配置广告"
            visible={this.showAdd}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确定"
            width="60%"
        >
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} class="ant-advanced-search-form">
                <Form.Item label="广告描述">
                    {getFieldDecorator("desc", {
                        initialValue: ads.desc || "",
                        rules: [
                            {
                                required: false,
                                message:"广告链接不能为空"
                            },
                        ],
                    })(
                       <Input/>
                    )}
                </Form.Item>
                <Form.Item label="广告链接">
                    {getFieldDecorator("url", {
                        initialValue: ads.url || "",
                        rules: [
                            {
                                required: false,
                                message:"广告链接不能为空"
                            },
                        ],
                    })(
                       <Input/>
                    )}
                </Form.Item>
                <Form.Item label="广告类型">
                    {getFieldDecorator("type", {
                        initialValue: ads.type || "1",
                        rules: [
                            {
                                required: false,
                                message:"广告链接不能为空"
                            },
                        ],
                    })(
                        <Select>
                            <Option value="1">长条图</Option>
                            <Option value="2">小图</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="广告图">
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
                        initialValue: ads.status || "0",
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


