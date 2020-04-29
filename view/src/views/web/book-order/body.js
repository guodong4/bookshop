import './index.scss';
import BuyStep from "../components/buy-step";
import { InputNumber, Icon, Radio, Checkbox } from "ant-design-vue";
import AddAddress from "./add-address";
var autoscroll = null;
const Index = {
    data() {
        return {
            booklist: [],
            totalMoney: 10,
            addresslist: [],
            member: {},
            address: {}
        };
    },
    mounted() {
        this.member = localStorage.getItem("member");
        this.member = JSON.parse(this.member);
        this.booklist = this.$route.params.goodslist;
        if (!this.booklist) {
            let data = sessionStorage.getItem('orderlist');
            this.booklist = JSON.parse(data);
        } else {
            sessionStorage.setItem('orderlist', JSON.stringify(this.booklist));
        }
        this.booklist.map(arr => {
            this.totalMoney += arr.book_price * arr.number;
        })
        this.getAddress();
    },
    methods: {
        addNewAddress(id) {
            this.$refs.addaddress.$children[0].show(id);
        },
        reset() {
            window.location.reload();
        },
        getAddress() {
            $ajax({
                url: "/order/getAddress",
                data: {
                    member_id: this.member.id
                }
            }).then(data => {
                this.addresslist = data;
                this.address = data.filter(arr => arr.is_default == 1);
            })
        },
        changeAddress(arr) {
            this.address = arr;
        },
        submitOrder() {
            $ajax({
                url: "/order/save",
                data: {
                    order_price:this.totalMoney,
                    member_id: this.member.id,
                    member_name:this.member.nickname,
                    order_address:this.address.address+","+this.address.phone_number+","+this.address.receiver+"收",
                    order_status:"0",
                    order_book:JSON.stringify(this.booklist)
                }
            }).then(data=>{
                if(data.code==1){
                    this.$router.push({
                        path:"/confirm",
                        query:{
                            order_number:data.data.order_number
                        }
                    })
                }
            })
        }
    },
    render() {
        return <div class="book-body">
            <div class="content">
                <BuyStep step={2} />
                <div class="goods-order">
                    <div class="personal-information">
                        <div class="title"><Icon type="environment" />&nbsp;&nbsp;收货地址<a style="float:right;letter-spacing:0px;margin-right:10px;font-weight:500;color:#1890ff" onClick={this.addNewAddress.bind(this, false)}><font size="-2">添加新地址</font></a></div>
                        <Radio.Group style="width:100%" defaultValue="1">
                            {
                                this.addresslist.map(arr => {
                                    return <div class="infor">
                                        <ul>
                                            <li><Radio value={arr.is_default} onClick={this.changeAddress.bind(this, arr)} />{arr.is_default == 1}</li>
                                            <li>地址信息：{arr.address}</li>
                                            <li>收货人姓名：{arr.receiver}</li>
                                            <li>手机号码：{arr.phone_number}</li>
                                            <li style="float:right;letter-spacing:0px;margin-right:10px;font-weight:500;color:#1890ff"><a><font size="-3" color="#1890ff" onClick={this.addNewAddress.bind(this, arr.id)}>修改本地址</font></a></li>
                                        </ul>
                                    </div>
                                })
                            }
                        </Radio.Group>
                    </div>
                    <table class="order-list">
                        <thead>
                            <tr>
                                <th></th>
                                <th>商品名称</th>
                                <th>商品信息</th>
                                <th>单价</th>
                                <th>数量</th>
                                <th>小计</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.booklist.map((arr, index) => {
                                    return <tr>
                                        <td> <img src={host + "/" + arr.book_img} width="80px" height="80px" /></td>
                                        <td width="15%" align="left">{arr.book_name}</td>
                                        <td width="15%" align="left">{arr.book_desc}</td>
                                        <td width="10%">
                                            ￥{arr.book_price}
                                        </td>
                                        <td width="15%">
                                            {arr.number}
                                        </td>
                                        <td width="15%"><font color="#e03737"><b>￥{arr.number * arr.book_price}</b></font></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    <div class="totalCount">
                        邮费：<font color="#e03737"><strong><b>￥10</b></strong></font>&nbsp;&nbsp;&nbsp;&nbsp;
                        合计：<font color="#e03737"><strong><b>￥{this.totalMoney}</b></strong></font>&nbsp;&nbsp;&nbsp;&nbsp;
                        <button class="custom-btn-red" onClick={this.submitOrder}>提交订单</button>
                    </div>
                </div>
            </div >
            <AddAddress ref="addaddress" reload={this.reset} />
        </div >
    }
};
export default Index;


