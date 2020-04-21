import './index.scss';
import SearchModule from "../components/search";
import { InputNumber, Icon, Rate,Checkbox } from "ant-design-vue";
var autoscroll = null;
const Index = {
    data() {
        return {
            //大图
            bigimg: "src/img/10.jpg",
            //1 详情  2 评价
            goodstag: 1,
            cartlist:[
                {
                    name:"高端奢侈礼品 日本Fillico神户矿泉水 施华洛世奇水晶天使翼皇冠",
                    img:"src/img/10.jpg",
                    price:100,
                    num:1
                },
                {
                    name:"高端奢侈礼品 日本Fillico神户矿泉水 施华洛世奇水晶天使翼皇冠",
                    img:"src/img/10.jpg",
                    price:100,
                    num:1
                }
            ],
            totalMoney:0,
            checkedArr:[]
        };
    },
    mounted() { 

    },
    methods: {
        changePrice(num,index){
            if(this.cartlist[index].num==1&&num==-1){
                return;
            }
            this.cartlist[index].num = this.cartlist[index].num+num;
            this.totalMoney=0;
            this.checkedArr.map(arr=>{
                this.totalMoney+=this.cartlist[arr].num*this.cartlist[arr].price;
            })
        },
        handChange(index,e){
            e.target.value==""?e.target.value="1":e.target.value;
            this.cartlist[index].num = Number(e.target.value);
            this.totalMoney=0;
            this.checkedArr.map(arr=>{
                this.totalMoney+=this.cartlist[arr].num*this.cartlist[arr].price;
            })
        },
        changeCheck(index,e){
            if(e.target.checked){
                this.checkedArr.push(index);
                this.totalMoney += this.cartlist[index].num*this.cartlist[index].price;
            }else{
                this.checkedArr = this.checkedArr.filter(arr=>{arr!=index});
                this.totalMoney -= this.cartlist[index].num*this.cartlist[index].price;
            }
        }
    },
    render() {
        return <div class="book-body">
            <div class="content">
                <SearchModule />
                <div class="goods-cart">
                    <table class="cart-list">
                        <thead>
                            <tr>
                                <th></th>
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
                                        <td width="15%" align="left">&nbsp;&nbsp;<Checkbox onChange={this.changeCheck.bind(this,index)} value={arr.num}/>&nbsp;&nbsp;&nbsp;&nbsp;<img src={arr.img} width="80px" height="80px" /></td>
                                <td width="30%" align="left">{arr.name}</td>
                                        <td width="10%">
                                            ￥{arr.price}
                                        </td>
                                        <td width="15%">
                                            <div class="count-num">
                                                <div onClick={this.changePrice.bind(this,-1,index)}>-</div>
                                                    <input type="text" oninput="value=value.replace(/[^\d]/g,'')" value={arr.num} onInput={this.handChange.bind(this,index)} />
                                                <div onClick={this.changePrice.bind(this,1,index)}>+</div>
                                            </div>
                                        </td>
                                        <td width="10%"><font color="#e03737"><b>￥{arr.num*arr.price}</b></font></td>
                                        <td width="20%"><button class="custom-btn custom-btn-small" >移入购物车</button><button class="custom-btn-red custom-btn-small" >删除</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        </div >
    }
};
export default Index;


