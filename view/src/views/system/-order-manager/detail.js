import { Input, Descriptions, Card, Table, Modal, Button } from 'ant-design-vue';
import moment from 'moment';
const Index = {
    props: ["reload"],
    data() {
        return {
            showo: false,
            order: {},
            record: [],
            booklist: []
        };
    },
    methods: {
        show(id) {
            this.order_id = id;
            this.getOrder(id);
            this.getRecord(id);
            this.showo = true;
        },
        getOrder(id) {
            $ajax({
                url: "/order/findOne",
                data: { id: id }
            }).then(data => {
                this.order = data.data
                this.getBookList(data.data.book_id)
            })
        },
        getRecord(id) {
            $ajax({
                url: "/order/findRecordByOrderId",
                data: { order_id: id }
            }).then(data => {
                this.record = data
            })
        },
        getBookList(id) {
            $ajax({
                url: "/order/findBookByOrderId",
                data: { order_id: id }
            }).then(data => {
                this.record = data
            })
        },
        handleCancel() {
            this.order = {};
            this.record = [];
            this.booklist = [];
            this.showo = false;
        }
    },
    render() {
        var status = {
            0: "待付款",
            1: "已取消",
            2: "已付款",
            3: "已发货",
            4: "已收货",
            5: "申请退款",
            6: "申请退货退款",
            7: "申请通过",
            8: "退货中",
            9: "已完成"
        }
        const bookcolumns = [
            {
                title: '图书图片',
                dataIndex: 'book_img',
                customRender: (text, record, index) => {
                    return <Popover content={
                        <img src={host + "/" + text} style="max-height:300px;max-width:300px" />
                    }><img src={host + "/" + text} width="40px" style="max-height:40px" /></Popover>
                }
            },
            {
                title: '图书名称',
                dataIndex: 'book_name',
            },
            {
                title: '价格',
                dataIndex: 'book_price',
            },
            {
                title: '购买数量',
                dataIndex: 'buy_num',
            },
            {
                title: '小计',
                dataIndex: 'price_total',
            },
        ];
        const recordcolumns = [
            {
                title: '操作人',
                dataIndex: 'record_user',
            },
            {
                title: '操作时间',
                dataIndex: 'record_time',
            },
            {
                title: '操作详情',
                dataIndex: 'order'
            }
        ]
        return <Modal
            title="订单详情"
            visible={this.showo}
            onCancel={this.handleCancel}
            width="60%"
            footer={
                <Button onClick={this.handleCancel}>关闭</Button>
            }
        >
            <Card type="inner" title="基本信息">
                <ul class="desc">
                    <li>订单编号{this.order.order_number}</li>
                    <li >订单金额:{this.order.order_price}</li>
                    <li >订单状态:{status[this.order.order_status]}</li>
                    <li >收货地址:{this.order.order_address}</li>
                    <li>快递公司:{this.order.order_express}</li>
                    <li >快递单号:{this.order.express_number}</li>
                    {
                        this.order.order_status == 5 || this.order.order_status == 6 || this.order.order_status == 7 || this.order.order_status == 8 ?
                            <li >退单原因:{this.order.order_cancel_reason}</li> : ""
                    }
                    {
                        this.order.order_status == 8 ? <li>退货快递公司:{this.order.return_express}</li> : ""
                    }
                    {
                        this.order.order_status == 8 ? <li>退货快递单号:{this.order.return_express_number}</li> : ""
                    }
                </ul>
            </Card>
            <Card type="inner" title="商品信息">
                <Table dataSource={this.booklist} bordered columns={bookcolumns} style="padding:10px;" rowKey={record => record.id} />
            </Card>
            <Card type="inner" title="操作记录">
                <Table dataSource={this.record} bordered columns={recordcolumns} style="padding:10px;" rowKey={record => record.id} />
            </Card>
        </Modal>
    }
};
export default Index;


