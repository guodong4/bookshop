import './index.scss';
import { Icon, Table, message } from "ant-design-vue";
import moment  from "moment";
var autoscroll = null;
const Index = {
    data() {
        return {
            data: [],
            member: {},
            option: {
                page: 1,
                pageSize: 10
            },
        };
    },
    mounted() {
        var member = localStorage.getItem("member");
        this.member = JSON.parse(member) || {};
        if (this.member.id) {
            this.getData(this.member.id);
        }
    },
    methods: {
        getData(id) {
            $ajax({
                url: "/comment/findAllByMemberId",
                data: {
                    member_id: id
                }
            }).then(data => {
                this.data = data;
            })
        },
        deleteCom(id){
            $ajax({
                url: "/comment/delete",
                data: {id}
            }).then(data => {
                message.success(data.msg);
                this.getData(id);
            })
        }
    },
    render() {
        const columns = [
            {
                title: '评价内容',
                dataIndex: 'comment',
            }, {
                title: '回复',
                dataIndex: 'comment_replay',
            }, {
                title: '宝贝信息',
                dataIndex: 'comment_book_name',
                customRender: (text, record, index) => {
                    return <a href={"/detail?id=" + record.comment_book_id} target="_blank">{text}</a>
                }
            },
            {
                title: '评论时间',
                dataIndex: 'comment_time',
                customRender: (text, record, index) => {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: '删除',
                dataIndex: 'id',
                customRender: (text, record, index) => {
                    return <button class="custom-btn-red custom-btn-small" onClick={this.deleteCom.bind(this,record.id)}>删除</button>
                }
            },
        ]
        return <div class="comment">
            <Table columns={columns} dataSource={this.data} rowKey={record=>record.id}/>;
        </div >
    }
};
export default Index;


