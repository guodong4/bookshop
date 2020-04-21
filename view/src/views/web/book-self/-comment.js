import './index.scss';
import { Icon,Table  } from "ant-design-vue";

var autoscroll = null;
const Index = {
    data() {
        return {
           data:[]
        };
    },
    mounted() {

    },
    methods: {
    },
    render() {
        const columns= [{
            title: '评价内容',
            dataIndex: 'name',
          },{
            title: '回复',
            dataIndex: 'name1',
          },{
            title: '宝贝信息',
            dataIndex: 'name2',
          },]
        return <div class="comment">
            <Table columns={columns} dataSource={this.data} />;
        </div >
    }
};
export default Index;


