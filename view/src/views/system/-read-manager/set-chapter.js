import { Input, List, Popover, message, Modal, Button } from 'ant-design-vue';
import moment from 'moment';
import AddChapterContent from "./add-chaper-content";
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
            this.chaperList = [];
            this.showAdd = false;
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
            this.$refs.addchaptercontent.show(id,this.read_id);
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
            title="配置章节"
            visible={this.showAdd}
            onCancel={this.handleCancel}
            width="60%"
            footer={
                <Button onClick={this.handleCancel}>关闭</Button>
            }
        >
            <List
                header={<Popover
                    placement="right"
                    content={
                        <div style="width:300px">
                            <div style="text-align:center;width:100%"><Input onInput={this.changeChapter} /></div>
                            <div style="text-align:center;width:100%;margin-top:20px">
                                <Button type="primary" onClick={this.closePop}>关闭</Button>&nbsp;&nbsp;
                                <Button type="primary" onClick={this.submitChapter}>提交</Button>
                            </div>
                        </div>
                    }
                    title="请添加章节名称"
                    trigger="click"
                    visible={this.showChapter}
                >
                    <Button type="primary" onClick={() => { this.showChapter = true }}>添加章节</Button>
                </Popover>}
                bordered
                dataSource={this.chapterList}
                renderItem={item => (
                    <List.Item style="width:100%">
                        <div style="float:left;width:70%"><label>{item.chapter}</label></div>
                        <div style="float:right;width:300px">
                            <Popover
                                placement="left"
                                content={
                                    <div style="width:300px">
                                        <div style="text-align:center;width:100%"><Input onInput={this.changeChapterList.bind(this, item)} value={item.chapter} /></div>
                                        <div style="text-align:center;width:100%;margin-top:20px">
                                            <Button type="primary" onClick={this.getChaper.bind(this,this.read_id)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.submitChapterList.bind(this, item)}>提交</Button></div>
                                    </div>
                                }
                                title="修改章节名称"
                                trigger="click"
                                visible={item.showChapter}
                            >
                                <Button type="primary" class="custom-btn-blue custom-btn-small" onClick={() => { item.showChapter = true }}>编辑</Button>
                            </Popover>
                            <button class="custom-btn-green custom-btn-small" onClick={this.content.bind(this, item.id)}>内容</button>
                            <button class="custom-btn-red custom-btn-small" onClick={this.delete.bind(this, item.id)}>删除</button>
                        </div>
                    </List.Item>
                )}
            />
            <AddChapterContent ref="addchaptercontent"/>
        </Modal>
    }
};
export default Index;


