import { Input, Popover, Card, Table, Modal, Button } from 'ant-design-vue';
import moment from 'moment';
import "./index.scss"
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
                this.getBookList(data.data.order_number)
            })
        },
        getRecord(id) {
            $ajax({
                url: "/order/findRecordByOrderId",
                data: { order_id: id }
            }).then(data => {
                this.record = data.data
            })
        },
        getBookList(order_number) {
            $ajax({
                url: "/order/findBookByOrderId",
                data: { order_number: order_number }
            }).then(data => {
                this.booklist = data.data
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
                customRender: (text, record, index) => {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: '操作详情',
                dataIndex: 'record'
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
                    <li><span>订单编号:</span>{this.order.order_number}</li>
                    <li ><span>订单金额:</span>{this.order.order_price}</li>
                    <li ><span>订单状态:</span>{status[this.order.order_status]}</li>
                    <li ><span>收货地址:</span>{this.order.order_address}</li>
                    <li><span>快递公司:</span>{this.order.order_express}</li>
                    <li ><span>快递单号:</span>{this.order.express_number}</li>
                    {
                        this.order.order_status == 5 || this.order.order_status == 6 || this.order.order_status == 7 || this.order.order_status == 8 ?
                            <li ><span>退单原因:</span>{this.order.order_cancel_reason}</li> : ""
                    }
                    {
                        this.order.order_status == 8 ? <li><span>退货快递公司:</span>{this.order.return_express}</li> : ""
                    }
                    {
                        this.order.order_status == 8 ? <li><span>退货快递单号:</span>{this.order.return_express_number}</li> : ""
                    }
                </ul>
            </Card>
            <Card type="inner" title="商品信息" style="margin-top:10px;">
                <Table dataSource={this.booklist} bordered columns={bookcolumns} style="padding:10px;" rowKey={record => record.id} />
            </Card>
            <Card type="inner" title="操作记录" style="margin-top:10px;">
                <Table dataSource={this.record} bordered columns={recordcolumns} style="padding:10px;" rowKey={record => record.id} />
            </Card>
        </Modal>
    }
};
export default Index;


