import './index.scss';
import { Button, Input, Table, message, Tabs, Icon, Popover, Card } from 'ant-design-vue';
const { TabPane } = Tabs;
import ToComment from "./to-comment";
import moment from "moment";
const Index = {
    data() {
        return {
            data: [],
            order_status: "",
            member: {},
            comment: []
        };
    },
    mounted() {
        this.member = localStorage.getItem("member");
        this.member = JSON.parse(this.member);
        if (this.member) {
            this.getData(this.order_status);
            this.getComment();
        } else {
            message.error("请先登录！");
        }
    },
    methods: {
        getComment() {
            $ajax({
                url: "/comment/findAllByMemberId",
                data: {
                    member_id: this.member.id
                }
            }).then(data => {
                this.comment = data;
            })
        },
        getData(order_status) {
            $ajax({
                url: "/order/findByStatus",
                data: {
                    order_status,
                    member_id: this.member.id
                }
            }).then(data => {
                this.data = data.map(arr => {
                    arr.show = false;
                    return arr
                });
            })
        },
        changeInput(key, item, e) {
            item[key] = e.target.value;
        },
        changeStauts(order, order_status) {
            if (order_status == 2) {
                this.$router.push({
                    path: "/confirm",
                    query: {
                        order_number: order.order_number
                    }
                })
                return;
            }
            order.order_status = order_status
            $ajax({
                url: "/order/updateStatus",
                data: {
                    id: order.id, ...order,member_id:this.member.id
                }
            }).then(data => {
                if (data.code == 1) {
                    message.success(data.msg);
                    this.getData(this.order_status);
                }
            })
        },
        deleteOrder(arr) {
            $ajax({
                url: "/order/delete",
                data: {
                    id: arr.id
                }
            }).then(data => {
                if (data.code == 1) {
                    message.success(data.msg);
                    this.getData(this.order_status);
                }
            })
        },
        toComment(order_id, book_id, book_name) {
            this.$refs.tocomment.show(order_id, book_id, book_name);
        },
        changeTags(value) {
            /*订单状态 
                0:"待付款",
                1:"已取消",
                2:"已付款",
                3:"已发货",
                4:"已收货",
                5:"申请退款",
                6:"申请退货退款",
                7:"申请通过",
                8:"退货中",
                9:"已完成"
            */
            var order_status = "";
            if (value == "2") {
                order_status = "0";
            }
            if (value == "3") {
                order_status = "2";
            }
            if (value == "4") {
                order_status = "3";
            }
            if (value == "5") {
                order_status = "4";
            }
            this.order_status = order_status;
            this.getData(order_status);
        }
    },
    render() {

        return <div class="comment">
            <Tabs defaultActiveKey="1" onChange={this.changeTags}>
                <TabPane tab="全部订单" key="1">
                    {
                        this.data.map(arr => {
                            const columns = [{
                                title: '宝贝详情',
                                dataIndex: 'detail',
                                customRender: (text, record, index) => {
                                    return <a href={"/detail?id=" + record.book_id} target="_blank">
                                        <img src={host + "/" + record.book_img} width="80px" height="80px" />&nbsp;&nbsp;
                                        {record.book_name}
                                    </a>
                                },
                            }, {
                                title: '单价',
                                dataIndex: 'book_price',
                            }, {
                                title: '数量',
                                dataIndex: 'buy_num',
                            }, {
                                title: '实付款',
                                dataIndex: 'price_total',
                            }, {
                                title: '评价',
                                dataIndex: 'book_id',
                                customRender: (text, record, index) => {
                                    //同一个订单下的同一个商品，只能评价一次。
                                    if (this.comment.filter(com => {
                                        return com.comment_order_id == arr.id && com.comment_book_id == text;
                                    }).length == 0) {
                                        return arr.order_status == "4" ? <button class="custom-btn-red custom-btn-small" onClick={this.toComment.bind(this, arr.id, text, record.book_name)}>评价</button> : ""
                                    } else {
                                        return "";
                                    }
                                },
                            },
                            ]
                            var status = {
                                0: "待付款",
                                1: "已取消",
                                2: "已付款",
                                3: "已发货",
                                4: "已收货",
                                5: "退款中",
                                6: "退货退款中",
                                7: "申请退单通过",
                                8: "退货中",
                                9: "已完成"
                            }
                            return <Card type="inner" title={<span>
                                <span style="font-weight:600;font-size:16px">{moment(arr.order_time).format('YYYY-MM-DD HH:mm:ss')}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">订单号：&nbsp;&nbsp;{arr.order_number}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">交易状态：&nbsp;&nbsp;{status[arr.order_status]}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">物流信息：&nbsp;&nbsp;{arr.order_express}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">{arr.express_number}</span>
                            </span>
                            } extra={<Icon type="delete" onClick={this.deleteOrder.bind(this, arr)} />} style="margin-top:10px;">
                                <Table columns={columns} dataSource={arr.child} bordered rowKey={record => record.book_id} /><br />
                                共￥{arr.order_price}（含邮费）<br /><br />
                                {arr.order_status == "0" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 1)}>取消订单</button> : ""}
                                {arr.order_status == "0" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 2)}>去支付</button> : ""}
                                {arr.order_status == "2" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 5)}>申请退款</button> : ""}
                                {arr.order_status == "3" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 4)}>确认收货</button> : ""}
                                {arr.order_status == "3" ?
                                    // <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 5)}>申请退款</button> 
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">退单原因：<Input onInput={this.changeInput.bind(this, "order_cancel_reason", arr)} value={arr.order_cancel_reason} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 5)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入退单原因"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>申请退款</Button>
                                    </Popover>
                                    : ""}
                                {arr.order_status == "4" ?
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">退单原因：<Input onInput={this.changeInput.bind(this, "order_cancel_reason", arr)} value={arr.order_cancel_reason} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 6)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入退单原因"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>申请退货退款</Button>
                                    </Popover>
                                    : ""}
                                {arr.order_status == "7" ?
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">快递公司：<Input onInput={this.changeInput.bind(this, "return_express", arr)} value={arr.return_express} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">快递单号：<Input onInput={this.changeInput.bind(this, "return_express_number", arr)} value={arr.return_express_number} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 8)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入快递信息"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>填写退货物流信息</Button>
                                    </Popover> : ""}
                            </Card>
                        })
                    }

                </TabPane>
                <TabPane tab="待付款" key="2">
                    {
                        this.data.map(arr => {
                            const columns = [{
                                title: '宝贝详情',
                                dataIndex: 'detail',
                                customRender: (text, record, index) => {
                                    return <a href={"/detail?id=" + record.book_id} target="_blank">
                                        <img src={host + "/" + record.book_img} width="80px" height="80px" />&nbsp;&nbsp;
                                        {record.book_name}
                                    </a>
                                },
                            }, {
                                title: '单价',
                                dataIndex: 'book_price',
                            }, {
                                title: '数量',
                                dataIndex: 'buy_num',
                            }, {
                                title: '实付款',
                                dataIndex: 'price_total',
                            }, {
                                title: '评价',
                                dataIndex: 'book_id',
                                customRender: (text, record, index) => {
                                    //同一个订单下的同一个商品，只能评价一次。
                                    if (this.comment.filter(com => {
                                        return com.comment_order_id == arr.id && com.comment_book_id == text;
                                    }).length == 0) {
                                        return arr.order_status == "4" ? <button class="custom-btn-red custom-btn-small" onClick={this.toComment.bind(this, arr.id, text, record.book_name)}>评价</button> : ""
                                    } else {
                                        return "";
                                    }
                                },
                            },
                            ]
                            var status = {
                                0: "待付款",
                                1: "已取消",
                                2: "已付款",
                                3: "已发货",
                                4: "已收货",
                                5: "退款中",
                                6: "申请退货退款",
                                7: "申请退单通过",
                                8: "退货中",
                                9: "已完成"
                            }
                            return <Card type="inner" title={<span>
                                <span style="font-weight:600;font-size:16px">{moment(arr.order_time).format('YYYY-MM-DD HH:mm:ss')}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">订单号：&nbsp;&nbsp;{arr.order_number}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">交易状态：&nbsp;&nbsp;{status[arr.order_status]}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">物流信息：&nbsp;&nbsp;{arr.order_express}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">{arr.express_number}</span>
                            </span>
                            } extra={<Icon type="delete" onClick={this.deleteOrder.bind(this, arr)} />} style="margin-top:10px;">
                                <Table columns={columns} dataSource={arr.child} bordered rowKey={record => record.book_id} /><br />
                                共￥{arr.order_price}（含邮费）<br /><br />
                                {arr.order_status == "0" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 1)}>取消订单</button> : ""}
                                {arr.order_status == "0" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 2)}>去支付</button> : ""}
                                {arr.order_status == "2" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 5)}>申请退款</button> : ""}
                                {arr.order_status == "3" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 4)}>确认收货</button> : ""}
                                {arr.order_status == "3" ?
                                    // <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 5)}>申请退款</button> 
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">退单原因：<Input onInput={this.changeInput.bind(this, "order_cancel_reason", arr)} value={arr.order_cancel_reason} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 5)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入退单原因"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>申请退款</Button>
                                    </Popover>
                                    : ""}
                                {arr.order_status == "4" ?
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">退单原因：<Input onInput={this.changeInput.bind(this, "order_cancel_reason", arr)} value={arr.order_cancel_reason} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 6)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入退单原因"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>申请退货退款</Button>
                                    </Popover>
                                    : ""}
                                {arr.order_status == "7" ?
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">快递公司：<Input onInput={this.changeInput.bind(this, "return_express", arr)} value={arr.return_express} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">快递单号：<Input onInput={this.changeInput.bind(this, "return_express_number", arr)} value={arr.return_express_number} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 8)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入快递信息"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>填写退货物流信息</Button>
                                    </Popover> : ""}
                            </Card>
                        })
                    }
                </TabPane>
                <TabPane tab="待发货" key="3">
                    {
                        this.data.map(arr => {
                            const columns = [{
                                title: '宝贝详情',
                                dataIndex: 'detail',
                                customRender: (text, record, index) => {
                                    return <a href={"/detail?id=" + record.book_id} target="_blank">
                                        <img src={host + "/" + record.book_img} width="80px" height="80px" />&nbsp;&nbsp;
                                        {record.book_name}
                                    </a>
                                },
                            }, {
                                title: '单价',
                                dataIndex: 'book_price',
                            }, {
                                title: '数量',
                                dataIndex: 'buy_num',
                            }, {
                                title: '实付款',
                                dataIndex: 'price_total',
                            }, {
                                title: '评价',
                                dataIndex: 'book_id',
                                customRender: (text, record, index) => {
                                    //同一个订单下的同一个商品，只能评价一次。
                                    if (this.comment.filter(com => {
                                        return com.comment_order_id == arr.id && com.comment_book_id == text;
                                    }).length == 0) {
                                        return arr.order_status == "4" ? <button class="custom-btn-red custom-btn-small" onClick={this.toComment.bind(this, arr.id, text, record.book_name)}>评价</button> : ""
                                    } else {
                                        return "";
                                    }
                                },
                            },
                            ]
                            var status = {
                                0: "待付款",
                                1: "已取消",
                                2: "已付款",
                                3: "已发货",
                                4: "已收货",
                                5: "退款中",
                                6: "申请退货退款",
                                7: "申请退单通过",
                                8: "退货中",
                                9: "已完成"
                            }
                            return <Card type="inner" title={<span>
                                <span style="font-weight:600;font-size:16px">{moment(arr.order_time).format('YYYY-MM-DD HH:mm:ss')}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">订单号：&nbsp;&nbsp;{arr.order_number}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">交易状态：&nbsp;&nbsp;{status[arr.order_status]}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">物流信息：&nbsp;&nbsp;{arr.order_express}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">{arr.express_number}</span>
                            </span>
                            } extra={<Icon type="delete" onClick={this.deleteOrder.bind(this, arr)} />} style="margin-top:10px;">
                                <Table columns={columns} dataSource={arr.child} bordered rowKey={record => record.book_id} /><br />
                                共￥{arr.order_price}（含邮费）<br /><br />
                                {arr.order_status == "0" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 1)}>取消订单</button> : ""}
                                {arr.order_status == "0" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 2)}>去支付</button> : ""}
                                {arr.order_status == "2" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 5)}>申请退款</button> : ""}
                                {arr.order_status == "3" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 4)}>确认收货</button> : ""}
                                {arr.order_status == "3" ?
                                    // <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 5)}>申请退款</button> 
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">退单原因：<Input onInput={this.changeInput.bind(this, "order_cancel_reason", arr)} value={arr.order_cancel_reason} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 5)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入退单原因"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>申请退款</Button>
                                    </Popover>
                                    : ""}
                                {arr.order_status == "4" ?
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">退单原因：<Input onInput={this.changeInput.bind(this, "order_cancel_reason", arr)} value={arr.order_cancel_reason} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 6)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入退单原因"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>申请退货退款</Button>
                                    </Popover>
                                    : ""}
                                {arr.order_status == "7" ?
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">快递公司：<Input onInput={this.changeInput.bind(this, "return_express", arr)} value={arr.return_express} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">快递单号：<Input onInput={this.changeInput.bind(this, "return_express_number", arr)} value={arr.return_express_number} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 8)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入快递信息"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>填写退货物流信息</Button>
                                    </Popover> : ""}
                            </Card>
                        })
                    }
                </TabPane>
                <TabPane tab="待收货" key="4">
                    {
                        this.data.map(arr => {
                            const columns = [{
                                title: '宝贝详情',
                                dataIndex: 'detail',
                                customRender: (text, record, index) => {
                                    return <a href={"/detail?id=" + record.book_id} target="_blank">
                                        <img src={host + "/" + record.book_img} width="80px" height="80px" />&nbsp;&nbsp;
                                        {record.book_name}
                                    </a>
                                },
                            }, {
                                title: '单价',
                                dataIndex: 'book_price',
                            }, {
                                title: '数量',
                                dataIndex: 'buy_num',
                            }, {
                                title: '实付款',
                                dataIndex: 'price_total',
                            }, {
                                title: '评价',
                                dataIndex: 'book_id',
                                customRender: (text, record, index) => {
                                    //同一个订单下的同一个商品，只能评价一次。
                                    if (this.comment.filter(com => {
                                        return com.comment_order_id == arr.id && com.comment_book_id == text;
                                    }).length == 0) {
                                        return arr.order_status == "4" ? <button class="custom-btn-red custom-btn-small" onClick={this.toComment.bind(this, arr.id, text, record.book_name)}>评价</button> : ""
                                    } else {
                                        return "";
                                    }
                                },
                            },
                            ]
                            var status = {
                                0: "待付款",
                                1: "已取消",
                                2: "已付款",
                                3: "已发货",
                                4: "已收货",
                                5: "退款中",
                                6: "申请退货退款",
                                7: "申请退单通过",
                                8: "退货中",
                                9: "已完成"
                            }
                            return <Card type="inner" title={<span>
                                <span style="font-weight:600;font-size:16px">{moment(arr.order_time).format('YYYY-MM-DD HH:mm:ss')}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">订单号：&nbsp;&nbsp;{arr.order_number}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">交易状态：&nbsp;&nbsp;{status[arr.order_status]}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">物流信息：&nbsp;&nbsp;{arr.order_express}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">{arr.express_number}</span>
                            </span>
                            } extra={<Icon type="delete" onClick={this.deleteOrder.bind(this, arr)} />} style="margin-top:10px;">
                                <Table columns={columns} dataSource={arr.child} bordered rowKey={record => record.book_id} /><br />
                                共￥{arr.order_price}（含邮费）<br /><br />
                                {arr.order_status == "0" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 1)}>取消订单</button> : ""}
                                {arr.order_status == "0" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 2)}>去支付</button> : ""}
                                {arr.order_status == "2" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 5)}>申请退款</button> : ""}
                                {arr.order_status == "3" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 4)}>确认收货</button> : ""}
                                {arr.order_status == "3" ?
                                    // <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 5)}>申请退款</button> 
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">退单原因：<Input onInput={this.changeInput.bind(this, "order_cancel_reason", arr)} value={arr.order_cancel_reason} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 5)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入退单原因"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>申请退款</Button>
                                    </Popover>
                                    : ""}
                                {arr.order_status == "4" ?
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">退单原因：<Input onInput={this.changeInput.bind(this, "order_cancel_reason", arr)} value={arr.order_cancel_reason} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 6)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入退单原因"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>申请退货退款</Button>
                                    </Popover>
                                    : ""}
                                {arr.order_status == "7" ?
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">快递公司：<Input onInput={this.changeInput.bind(this, "return_express", arr)} value={arr.return_express} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">快递单号：<Input onInput={this.changeInput.bind(this, "return_express_number", arr)} value={arr.return_express_number} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 8)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入快递信息"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>填写退货物流信息</Button>
                                    </Popover> : ""}
                            </Card>
                        })
                    }
                </TabPane>
                <TabPane tab="待评价" key="5">
                    {
                        this.data.map(arr => {
                            const columns = [{
                                title: '宝贝详情',
                                dataIndex: 'detail',
                                customRender: (text, record, index) => {
                                    return <a href={"/detail?id=" + record.book_id} target="_blank">
                                        <img src={host + "/" + record.book_img} width="80px" height="80px" />&nbsp;&nbsp;
                                        {record.book_name}
                                    </a>
                                },
                            }, {
                                title: '单价',
                                dataIndex: 'book_price',
                            }, {
                                title: '数量',
                                dataIndex: 'buy_num',
                            }, {
                                title: '实付款',
                                dataIndex: 'price_total',
                            }, {
                                title: '评价',
                                dataIndex: 'book_id',
                                customRender: (text, record, index) => {
                                    //同一个订单下的同一个商品，只能评价一次。
                                    if (this.comment.filter(com => {
                                        return com.comment_order_id == arr.id && com.comment_book_id == text;
                                    }).length == 0) {
                                        return arr.order_status == "4" ? <button class="custom-btn-red custom-btn-small" onClick={this.toComment.bind(this, arr.id, text, record.book_name)}>评价</button> : ""
                                    } else {
                                        return "";
                                    }
                                },
                            },
                            ]
                            var status = {
                                0: "待付款",
                                1: "已取消",
                                2: "已付款",
                                3: "已发货",
                                4: "已收货",
                                5: "退款中",
                                6: "申请退货退款",
                                7: "申请退单通过",
                                8: "退货中",
                                9: "已完成"
                            }
                            return <Card type="inner" title={<span>
                                <span style="font-weight:600;font-size:16px">{moment(arr.order_time).format('YYYY-MM-DD HH:mm:ss')}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">订单号：&nbsp;&nbsp;{arr.order_number}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">交易状态：&nbsp;&nbsp;{status[arr.order_status]}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">物流信息：&nbsp;&nbsp;{arr.order_express}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="font-size:14px">{arr.express_number}</span>
                            </span>
                            } extra={<Icon type="delete" onClick={this.deleteOrder.bind(this, arr)} />} style="margin-top:10px;">
                                <Table columns={columns} dataSource={arr.child} bordered rowKey={record => record.book_id} /><br />
                                共￥{arr.order_price}（含邮费）<br /><br />
                                {arr.order_status == "0" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 1)}>取消订单</button> : ""}
                                {arr.order_status == "0" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 2)}>去支付</button> : ""}
                                {arr.order_status == "2" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 5)}>申请退款</button> : ""}
                                {arr.order_status == "3" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 4)}>确认收货</button> : ""}
                                {arr.order_status == "3" ?
                                    // <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, arr, 5)}>申请退款</button> 
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">退单原因：<Input onInput={this.changeInput.bind(this, "order_cancel_reason", arr)} value={arr.order_cancel_reason} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 5)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入退单原因"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>申请退款</Button>
                                    </Popover>
                                    : ""}
                                {arr.order_status == "4" ?
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">退单原因：<Input onInput={this.changeInput.bind(this, "order_cancel_reason", arr)} value={arr.order_cancel_reason} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 6)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入退单原因"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>申请退货退款</Button>
                                    </Popover>
                                    : ""}
                                {arr.order_status == "7" ?
                                    <Popover
                                        placement="left"
                                        content={
                                            <div style="width:300px">
                                                <div style="text-align:center;width:100%">快递公司：<Input onInput={this.changeInput.bind(this, "return_express", arr)} value={arr.return_express} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">快递单号：<Input onInput={this.changeInput.bind(this, "return_express_number", arr)} value={arr.return_express_number} style="width:200px" /></div>
                                                <div style="text-align:center;width:100%;margin-top:20px">
                                                    <Button type="primary" onClick={this.getData.bind(this, this.order_status)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, arr, 8)}>提交</Button></div>
                                            </div>
                                        }
                                        title="请输入快递信息"
                                        trigger="click"
                                        visible={arr.show}
                                    >
                                        <Button type="primary" class="custom-btn-red custom-btn-small" onClick={() => { arr.show = true }}>填写退货物流信息</Button>
                                    </Popover> : ""}
                            </Card>
                        })
                    }
                </TabPane>
            </Tabs>
            <ToComment ref="tocomment" reload={this.getData.bind(this, this.order_status)} />
        </div >
    }
};
export default Index;


