import { Icon , message, Modal ,Button } from 'ant-design-vue';
import TagLab from "@/components/TagLab";
import VueUeditorWrap from 'vue-ueditor-wrap';
import { relativeTimeThreshold } from 'moment';
const Index = {
    props: ["reload"],
    data() {
        return {
            showAdd: false,
            chaperList: [],
            read_id:"",
            chapter_id:"",
            chapter:{},
            parent:""
        };
    },
    methods: {
        show(id,read_id) {
            this.read_id = read_id;
            this.parent = id;
            this.getChaperContent(id);
            this.showAdd = true;
        },
        getChaperContent(id) {
            $ajax({
                url: "/read/findAllChapterContent",
                data: { parentId:id }
            }).then(data => {
                this.chaperList = data;
                if(this.chapter.id){
                    this.chapter = this.chaperList.filter(arr=>arr.id = this.chapter.id);
                }else{
                    this.chapter = this.chaperList[this.chaperList.length-1];
                }
            })
        },
        closeTag(chapter){
            if(confirm("删除后不能恢复，确认删除？")){
                $ajax({
                    url: "/read/deleteChapter",
                    data: { id:chapter.id }
                }).then(data => {
                    this.chaperList = data;
                })
            }
        },
        
        handleCancel() {
            this.showAdd = false;
            this.chaperList= [],
            this.read_id="",
            this.chapter_id=""
            this.chapter={},
            this.parent=""
        },
        addChapter(){
            if(this.chaperList.length!=0){
                if(!this.chaperList[this.chaperList.length-1].id){
                    message.error("请先录入"+this.chaperList.length+"页的内容");
                    return;
                }
            }
            this.chapter = {
                content:"",
                parent:this.parent,
                read_id:this.read_id
            }
            this.chaperList.push(this.chapter);
        },
        selectChapter(chapter){
            this.chapter = chapter;
        },
        changeContent(value){
            this.chapter.content=value;
        },
        submitContent(){
            console.log(this.chapter);
            if(this.chapter.id){
                $ajax({
                    url: "/read/updateChapterContent",
                    data:this.chapter
                }).then(data => {
                    message.success(data.msg);
                    this.getChaperContent(this.parent);
                })
            }else{
                $ajax({
                    url: "/read/addChapterContent",
                    data:this.chapter
                }).then(data => {
                    message.success(data.msg);
                    this.getChaperContent(this.parent);
                })
            }
        }
    },
    render() {
        const myConfig={
            UEDITOR_HOME_URL: '/ueditor/',
            // 如果需要上传功能,找后端小伙伴要服务器接口地址
            autoHeightEnabled: false,
            // 工具栏是否可以浮动
            autoFloatEnabled: false,
            // 初始容器高度
            initialFrameHeight: 340,
            // 初始容器宽度
            initialFrameWidth: '100%',
            // 关闭自动保存
            enableAutoSave: true
          };
        return <Modal
            title="配置内容"
            visible={this.showAdd}
            onCancel={this.handleCancel}
            footer={null}
            width="70%"
        >
            <div style="min-height:600px;width:100%">
            分页输入：<TagLab
                tags={this.chaperList}
                closeTag={true}
                ref="chaperlist"
                value="id"
                closeFn={this.closeTag}
                clickFn={this.selectChapter}
                addBtn={<Icon type="plus-circle" theme="filled" style="font-size:20px;color:green;cursor:pointer" onClick={this.addChapter} />}
            />
            {
                this.chaperList.length!=0?<VueUeditorWrap config={myConfig} value={this.chapter.content} onInput={this.changeContent}/>:""
            }<br/>
            <Button type="primary" onClick={this.submitContent}>提交</Button>
            </div>
        </Modal>
    }
};
export default Index;


