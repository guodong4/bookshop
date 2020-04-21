import './index.scss';
import BuyStep from "../components/buy-step";
import { InputNumber, Icon, Radio, Checkbox } from "ant-design-vue";
var autoscroll = null;
const Index = {
    data() {
        return {
            //大图
            bigimg: "src/img/10.jpg",
            //1 详情  2 评价
            goodstag: 1,
            cartlist: [
                {
                    name: "高端奢侈礼品 日本Fillico神户矿泉水 施华洛世奇水晶天使翼皇冠",
                    img: "src/img/10.jpg",
                    price: 100,
                    num: 1
                },
                {
                    name: "高端奢侈礼品 日本Fillico神户矿泉水 施华洛世奇水晶天使翼皇冠",
                    img: "src/img/10.jpg",
                    price: 100,
                    num: 1
                }
            ],
            totalMoney: 0,
            checkedArr: []
        };
    },
    mounted() {

    },
    methods: {
        changePrice(num, index) {
            if (this.cartlist[index].num == 1 && num == -1) {
                return;
            }
            this.cartlist[index].num = this.cartlist[index].num + num;
            this.totalMoney = 0;
            this.checkedArr.map(arr => {
                this.totalMoney += this.cartlist[arr].num * this.cartlist[arr].price;
            })
        },
        handChange(index, e) {
            e.target.value == "" ? e.target.value = "1" : e.target.value;
            this.cartlist[index].num = Number(e.target.value);
            this.totalMoney = 0;
            this.checkedArr.map(arr => {
                this.totalMoney += this.cartlist[arr].num * this.cartlist[arr].price;
            })
        },
        changeCheck(index, e) {
            if (e.target.checked) {
                this.checkedArr.push(index);
                this.totalMoney += this.cartlist[index].num * this.cartlist[index].price;
            } else {
                this.checkedArr = this.checkedArr.filter(arr => { arr != index });
                this.totalMoney -= this.cartlist[index].num * this.cartlist[index].price;
            }
        }
    },
    render() {
        return <div class="book-body">
            <div class="content">
                <BuyStep step={2}/>
                <div class="goods-order">
                    <div class="personal-information">
                        <div class="title"><Icon type="environment" />&nbsp;&nbsp;收货地址<a style="float:right;letter-spacing:0px;margin-right:10px;font-weight:500;color:#1890ff"><font size="-2">使用新地址</font></a></div>
                        <Radio.Group value={1} style="width:100%">
                            <div class="infor">
                                <ul>
                                    <li><Radio value={1} /></li>
                                    <li>地址信息：北京市朝阳区</li>
                                    <li>详细地址：太平家园</li>
                                    <li>收货人姓名：张三</li>
                                    <li>手机号码：1234567</li>
                                    <li style="float:right;letter-spacing:0px;margin-right:10px;font-weight:500;color:#1890ff"><a><font size="-3" color="#1890ff">修改本地址</font></a></li>
                                </ul>
                            </div>
                            <div class="infor">
                                <ul>
                                    <li><Radio value={2} /></li>
                                    <li>地址信息：北京市朝阳区</li>
                                    <li>详细地址：太平家园</li>
                                    <li>收货人姓名：张三</li>
                                    <li>手机号码：1234567</li>
                                    <li style="float:right;letter-spacing:0px;margin-right:10px;font-weight:500;color:#1890ff"><a><font size="-3" color="#1890ff">修改本地址</font></a></li>
                                </ul>
                            </div>
                        </Radio.Group>
                    </div>
                    <table class="order-list">
                        <thead>
                            <tr>
                                <th></th>
                                <th>商品信息</th>
                                <th>单价</th>
                                <th>数量</th>
                                <th>小计</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.cartlist.map((arr, index) => {
                                    return <tr>
                                        <td width="15%" align="left">&nbsp;&nbsp;<Checkbox onChange={this.changeCheck.bind(this, index)} value={arr.num} />&nbsp;&nbsp;&nbsp;&nbsp;<img src={arr.img} width="80px" height="80px" /></td>
                                        <td width="30%" align="left">{arr.name}</td>
                                        <td width="10%">
                                            ￥{arr.price}
                                        </td>
                                        <td width="15%">
                                            100
                                        </td>
                                        <td width="15%"><font color="#e03737"><b>￥122</b></font></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    <div class="totalCount">
                        邮费：<font color="#e03737"><strong><b>￥10</b></strong></font>&nbsp;&nbsp;&nbsp;&nbsp;
                        合计：<font color="#e03737"><strong><b>￥{this.totalMoney}</b></strong></font>
                        <button class="custom-btn-red" onClick={() => { window.location.href = "/confirm" }}>提交订单</button>
                    </div>
                </div>
            </div >
        </div >
    }
};
export default Index;


