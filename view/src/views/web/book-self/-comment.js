import './index.scss';
import { Icon, Table } from "ant-design-vue";

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
                    member_id:id
                }
            }).then(data => {
                this.data=data;
            })
        },
    },
    render() {
        const columns = [{
            title: '评价内容',
            dataIndex: 'name',
        }, {
            title: '回复',
            dataIndex: 'name1',
        }, {
            title: '宝贝信息',
            dataIndex: 'name2',
        },]
        return <div class="comment">
            <Table columns={columns} dataSource={this.data} />;
        </div >
    }
};
export default Index;


