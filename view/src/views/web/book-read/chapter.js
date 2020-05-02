import { Input, List, Popover, message, Modal, Button } from 'ant-design-vue';
import ChapterContent from "./chaper-content";
const Index = {
    props: ["reload"],
    data() {
        return {
            showAdd: false,
            chapterList: [],
            chapter: "",
            read_id: "",
            showChapter: false

        };
    },
    methods: {
        show(id) {
            this.read_id = id;
            this.getChaper(id);
            this.showAdd = true;
        },
        getChaper(id) {
            $ajax({
                url: "/read/findChapterByReadId",
                data: { read_id: id }
            }).then(data => {
                data = data.map(arr => {
                    arr.showChapter = false;
                    return arr;
                })
                this.chapterList = data.reverse()
            })
        },
        closePop(){
            this.showChapter=false;
        },
        handleCancel() {
            this.chapterList = [];
            this.showAdd = false;
            this.chapter={}
        },
        changeChapter(e) {
            this.chapter = e.target.value;
        },
        changeChapterList(item, e) {
            item.chapter = e.target.value;
        },
        submitChapter() {
            $ajax({
                url: "/read/saveChapter",
                data: {
                    read_id: this.read_id,
                    chapter: this.chapter
                }
            }).then(data => {
                if (data.code == 1) {
                    message.success(data.msg);
                    this.getChaper(this.read_id);
                    this.showChapter = false;
                }
            })
        },
        submitChapterList(item) {
            $ajax({
                url: "/read/updateChapter",
                data: item
            }).then(data => {
                message.success(data.msg);
                this.getChaper(this.read_id);
                item.showChapter = false;
            })
        },
        
        update(id) {
            $ajax({
                url: "/read/findOneChapter",
                data: {
                    id
                }
            }).then(data => {
                if (data.code == 1) {
                    message.success(data.msg);
                    this.getChaper(this.read_id);
                    this.showChapter = false;
                }
            })
        },
        content(id) {
            this.$refs.chaptercontent.show(id,this.read_id);
        },
        delete(id) {
            if(confirm("删除后不可恢复，确定删除？")){
                $ajax({
                    url: "/read/deleteChapter",
                    data: {
                        id
                    }
                }).then(data => {
                    if (data.code == 1) {
                        message.success(data.msg);
                        this.getChaper(this.read_id);
                        this.showChapter = false;
                    }
                })
            }
        }
    },
    render() {
        return <Modal
            title="章节"
            visible={this.showAdd}
            onCancel={this.handleCancel}
            width="60%"
            footer={
                <Button onClick={this.handleCancel}>关闭</Button>
            }
        >
            <List bordered
                dataSource={this.chapterList}
                renderItem={item => (
                    <List.Item style="width:100%">
                        <div style="float:left;width:70%"><label>{item.chapter}</label></div>
                        <div style="float:right;width:300px">
                            <button class="custom-btn-green custom-btn-small" onClick={this.content.bind(this, item.id)}>内容</button>
                        </div>
                    </List.Item>
                )}
            />
            <ChapterContent ref="chaptercontent"/>
        </Modal>
    }
};
export default Index;


