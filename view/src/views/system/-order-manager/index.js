import { Button, Input, Table, message, Select, Icon, Popover } from 'ant-design-vue';
const { Option } = Select;
import SearchBar from "@/components/SearchBar";
import Detail from "./detail";
import moment from 'moment';
const Index = {
    data() {
        return {
            dataSource: [],
            option: {
                page: 1,
                pageSize: 10
            },
        };
    },
    mounted() {
        this.getData(this.option);
    },
    methods: {
        onSearch(value) {
            this.getData({
                ...this.option,
                ...value
            });
        },
        getData(option) {
            this.option = option;
            $ajax({
                url: "/order/findAll",
                data: option
            }).then(data => {
                this.dataSource = data.rows.map(arr=>{
                    arr.show=false;
                    return arr;
                });
                this.option.page = data.page;
                this.option.pageSize = data.pageSize;
            })
        },
        reset() {
            this.dataSource = [];
            this.getData({
                page: 1,
                pageSize: 10
            });
        },
        detail(id) {
            this.$refs.detail.show(id);
        },
        changePage(page, pageSize) {
            this.option.page = page;
            this.option.pageSize = pageSize;
            this.getData(this.option);
        },
        changeStauts(order, order_status) {
            order.order_status = order_status
            $ajax({
                url: "/order/updateStatus",
                data: {
                    id:order.id,...order
                }
            }).then(data => {
                if(data.code==1){
                    message.success(data.msg);
                    this.getData(this.option);
                }
            })
        },
        changeInput(key,item,e) {
            item[key] =  e.target.value;
        },
        submit(record){

        }
    },
    render() {
        var option = [
            {
                name: "order_number",
                label: "订单号",
                components: <Input />
            },
            {
                name: "order_status",
                label: "订单状态",
                components: <Select>
                    <Option value="">全部</Option>
                    <Option value="0">待付款</Option>
                    <Option value="1">已取消</Option>
                    <Option value="2">已付款</Option>
                    <Option value="3">已发货</Option>
                    <Option value="4">已收货</Option>
                    <Option value="5">申请退款</Option>
                    <Option value="6">申请退货并退款</Option>
                    <Option value="7">申请通过</Option>
                    <Option value="8">退货中</Option>
                    <Option value="9">已完成</Option>
                </Select>
            }
        ];
        const columns = [
            {
                title: '订单号',
                dataIndex: 'order_number'
            },
            {
                title: '下单时间',
                dataIndex: 'order_time',
                customRender: (text, record, index) => {
                    return moment(text).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: '订单总额',
                dataIndex: 'order_price',
            },
            {
                title: '订单状态',
                dataIndex: 'order_status',
                customRender: (text, record, index) => {
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
                    return status[text];
                }
            },
            {
                title: '操作',
                dataIndex: 'op',
                width: "300px",
                customRender: (text, record, index) => {
                    return <span>
                        {record.order_status == "2" ?

                            <Popover
                                placement="left"
                                content={
                                    <div style="width:300px">
                                        <div style="text-align:center;width:100%">快递公司：<Input onInput={this.changeInput.bind(this, "order_express",record)} value={record.order_express} style="width:200px"/></div>
                                        <div style="text-align:center;width:100%;margin-top:20px">快递单号：<Input onInput={this.changeInput.bind(this,"express_number", record)} value={record.express_number} style="width:200px"/></div>
                                        <div style="text-align:center;width:100%;margin-top:20px">
                                            <Button type="primary" onClick={this.getData.bind(this, this.option)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.changeStauts.bind(this, record, 3)}>提交</Button></div>
                                    </div>
                                }
                                title="请输入快递信息"
                                trigger="click"
                                visible={record.show}
                            >
                                <Button type="primary" class="custom-btn-red custom-btn-small" onClick={()=>{record.show=true}}>发货</Button>
                            </Popover>

                            : ""}
                        {record.order_status == "5" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, record, 9)}>确认退款</button> : ""}
                        {record.order_status == "6" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, record, 7)}>确认退货退款</button> : ""}
                        {record.order_status == "8" ? <button class="custom-btn-red custom-btn-small" onClick={this.changeStauts.bind(this, record, 9)}>确认收货</button> : ""}
                        <button class="custom-btn-blue custom-btn-small" onClick={this.detail.bind(this, record.id)}>订单详情</button>
                    </span>
                }
            },
        ];
        return <div>
            <SearchBar option={option} search={this.onSearch} reset={this.reset} />
            <Table dataSource={this.dataSource} bordered columns={columns} style="padding:10px;" rowKey={record => record.id} pagination={{
                ...this.option,
                current: this.option.page,
                onChange: this.changePage
            }} />
            <Detail ref="detail" reload={this.reset} />

        </div>
    }
};
export default Index;


