import { Icon , message, Modal ,Button } from 'ant-design-vue';
import TagLab from "@/components/TagLab";
import ReadContent from '../book-read-detail/body';
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
                this.chapter = this.chaperList[this.chaperList.length-1];
            })
        },
        handleCancel() {
            this.showAdd = false;
            this.chaperList= [],
            this.read_id="",
            this.chapter_id=""
            this.chapter={},
            this.parent=""
        },
        selectChapter(chapter){
            this.chapter = chapter;
            this.$refs.readcontent.changeContent(chapter.content)
        }
    },
    render() {
        return <Modal
            title="阅读内容"
            visible={this.showAdd}
            footer={null}
            width="70%"
            footer={null}
            onCancel={this.handleCancel}
        >
            <div style="min-height:600px;width:100%">
            <TagLab
                tags={this.chaperList}
                closeTag={false}
                ref="chaperlist"
                value="id"
                clickFn={this.selectChapter}
            />
            {
                this.chaperList.length!=0?<ReadContent content={this.chapter.content} ref="readcontent"/>:""
            }<br/>
            </div>
        </Modal>
    }
};
export default Index;


