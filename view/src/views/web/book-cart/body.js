import './index.scss';
import BuyStep from "../components/buy-step";
import { InputNumber, Icon, Rate, Checkbox, message } from "ant-design-vue";
var autoscroll = null;
const Index = {
    data() {
        return {
            //大图
            bigimg: "src/img/10.jpg",
            //1 详情  2 评价
            goodstag: 1,
            cartlist: [],
            totalMoney: 0,
            checkedArr: []
        };
    },
    mounted() {
        this.member = localStorage.getItem("member");
        this.member = JSON.parse(this.member);
        if (this.member) {
            this.getCarts(this.member.id)
        } else {
            message.error("请先登录！");
        }
    },
    methods: {
        getCarts(id) {
            $ajax({
                url: "/carts/findCartsByMember",
                data: { member_id: id }
            }).then(data => {
                this.cartlist = data;
            })
        },
        changePrice(num, index) {
            if (this.cartlist[index].number == 1 && num == -1) {
                return;
            }
            this.cartlist[index].number = this.cartlist[index].number + num;
            $ajax({
                url: "/carts/update",
                data: { id: this.cartlist[index].carts_id ,number:this.cartlist[index].number}
            })
            this.totalMoney = 0;
            this.checkedArr.map(arr => {
                this.totalMoney += this.cartlist[arr].number * this.cartlist[arr].book_price;
            })
        },
        handChange(index, e) {
            e.target.value == "" ? e.target.value = "1" : e.target.value;
            this.cartlist[index].number = Number(e.target.value);
            this.totalMoney = 0;
            this.checkedArr.map(arr => {
                this.totalMoney += this.cartlist[arr].number * this.cartlist[arr].book_price;
            })
        },
        changeCheck(index, e) {
            if (e.target.checked) {
                this.checkedArr.push(index);
                this.totalMoney += this.cartlist[index].number * this.cartlist[index].book_price;
            } else {
                this.checkedArr = this.checkedArr.filter(arr => { arr != index });
                this.totalMoney -= this.cartlist[index].number * this.cartlist[index].book_price;
            }
        },
        toLike(arr){
            $ajax({
                url: "/like/addLike",
                data: { member_id: this.member.id,book_id:arr.id }
            }).then(data => {
                message.success(data.msg);
            })
        },
        deleteCarts(arr){
            $ajax({
                url: "/carts/delete",
                data: { id: arr.carts_id }
            }).then(data => {
                message.success(data.msg);
                window.location.reload();
            })
        },
        submitOrder(){
            if(this.checkedArr.length==0){
                message.error("请选择要结算的商品");
            }else{
                var goodslist = this.cartlist.filter((arr,index)=>{
                    return this.checkedArr.indexOf(index)>-1
                })
                this.$router.push({
                    name:"order",
                    params:{goodslist}
                })
            }
        }   
    },
    render() {
        return <div class="book-body">
            <div class="content">
                <BuyStep step={1} />
                <div class="goods-cart">
                    <table class="cart-list">
                        <thead>
                            <tr>
                                <th></th>
                                <th>商品名称</th>
                                <th>商品信息</th>
                                <th>单价</th>
                                <th>数量</th>
                                <th>金额</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.cartlist.map((arr, index) => {
                                    return <tr>
                                        <td width="15%" align="left">&nbsp;&nbsp;
                                        <Checkbox onChange={this.changeCheck.bind(this, index)} />&nbsp;&nbsp;&nbsp;&nbsp;
                                        <img src={host + "/" + arr.book_img} width="80px" height="80px" /></td>
                                        <td width="15%" align="center"><a href={"/detail?id=" + arr.id} target="_blank">{arr.book_name}</a></td>
                                        <td width="15%" align="center">{arr.book_desc}</td>
                                        <td width="10%">
                                            ￥{arr.book_price}
                                        </td>
                                        <td width="15%">
                                            <div class="count-num">
                                                <div onClick={this.changePrice.bind(this, -1, index)}>-</div>
                                                <input type="text" oninput="value=value.replace(/[^\d]/g,'')" value={arr.number} onInput={this.handChange.bind(this, index)} />
                                                <div onClick={this.changePrice.bind(this, 1, index)}>+</div>
                                            </div>
                                        </td>
                                        <td width="10%"><font color="#e03737"><b>￥{arr.number * arr.book_price}</b></font></td>
                                        <td width="20%">
                                            <button class="custom-btn custom-btn-small" onClick={this.toLike.bind(this, arr)}>移入收藏夹</button>
                                            <button class="custom-btn-red custom-btn-small" onClick={this.deleteCarts.bind(this,arr)}>删除</button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    <div class="totalCount">
                        合计：<font color="#e03737"><strong><b>￥{this.totalMoney}</b></strong></font>&nbsp;&nbsp;
                        <button class="custom-btn-red" onClick={this.submitOrder}>结算</button>
                    </div>
                </div>
            </div >
        </div >
    }
};
export default Index;


