import './index.scss';
import { Icon, Table, Tabs } from "ant-design-vue";
const { TabPane } = Tabs;
var autoscroll = null;
const Index = {
    data() {
        return {
            data: []
        };
    },
    mounted() {

    },
    methods: {
    },
    render() {
        const columns = [{
            title: '宝贝详情',
            dataIndex: 'name',
        }, {
            title: '单价',
            dataIndex: 'name1',
        }, {
            title: '数量',
            dataIndex: 'name2',
        },{
            title: '实付款',
            dataIndex: 'name3',
        },{
            title: '交易状态',
            dataIndex: 'name32',
        },{
            title: '操作',
            dataIndex: 'operation',
            customRender:()=>{
                return <button class="custom-btn-red custom-btn-small">再次购买</button>
            },
        },]
        return <div class="comment">
            <Tabs defaultActiveKey="1" >
                <TabPane tab="全部订单" key="1">
                    <Table columns={columns} dataSource={this.data} bordered/>;
                </TabPane>
                <TabPane tab="待付款" key="2">
                    <Table columns={columns} dataSource={this.data} bordered/>;
                </TabPane>
                <TabPane tab="待发货" key="3">
                    <Table columns={columns} dataSource={this.data} bordered/>;
                </TabPane>
                <TabPane tab="待收货" key="4">
                    <Table columns={columns} dataSource={this.data} bordered/>;
                </TabPane>
            </Tabs>

        </div >
    }
};
export default Index;


