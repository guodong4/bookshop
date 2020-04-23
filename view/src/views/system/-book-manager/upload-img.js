import './index.scss';
import { Upload, Icon, message, Modal } from 'ant-design-vue';
const Index = {
    props: ["reload"],
    data() {
        return {
            showModal: false,
            fileList: [],
            bookImg: []
        };
    },
    methods: {
        show(bookId) {
            this.bookId = bookId;
            this.getBookFile(bookId);
            this.showModal = true;
        },
        getBookFile(book_id) {
            $ajax({
                url: "/book/findBookImg",
                data: { book_id }
            }).then(data => {
                if (data.code == 1) {
                    this.bookImg = data.data;
                    this.fileList = data.data.map(arr => {
                        return {
                            uid: arr.id,
                            name: arr.img_path,
                            status: "done",
                            url: host + "/" + arr.img_path
                        }
                    })
                }
            })
        },
        async handleOk() {
            await this.bookImg.map(arr => {
                if (this.fileList.filter(item => item.uid == arr.id).length == 0) {
                    this.deleteImg(arr.id)
                }
            })
            console.log(this.fileList);
            await this.fileList.map(arr => {
                if (this.bookImg.filter(item => item.id == arr.uid).length == 0) {
                    // console.log(arr);
                    this.saveImg(arr);
                }
            })
            message.success("操作成功");
            this.handleCancel()
        },
        saveImg(file) {
            $ajax({
                url: "/book/saveImg",
                data: {
                    book_id: this.bookId,
                    img_path: file.name
                }
            })
        },
        deleteImg(id) {
            $ajax({
                url: "/book/deleteImg",
                data: { id }
            })
        },
        uploadImg(file) {
            if(file.file.status=="removed"){
                this.fileList = this.fileList.filter(arr=>arr.uid!=file.file.uid);
            }else{
                this.fileList = file.fileList.map(arr=>{
                    arr.name = arr.response ? arr.response.data.filename : arr.name;
                    arr.url=arr.url||(arr.response ? host + "/" + arr.response.data.filename : "");
                    return arr;
                })
            }
        },
        preview(file) {
            var win = window.open("", "img");
            win.document.write("<img src='" + file.url + "' style='margin:0 auto'/>")
        },
        handleCancel() {
            this.bookId = "";
            this.fileList = [];
            this.showModal = false;
        }
    },
    render() {
        return <Modal
            title="图书附件图"
            visible={this.showModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确定"
            width="60%"
        >
            <Upload
                listType="picture-card"
                multiple={true}
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
        </Modal>
    }
};
export default Index;


