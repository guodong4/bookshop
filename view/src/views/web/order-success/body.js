import './index.scss';
import BuyStep from "../components/buy-step";
import { Icon, Radio } from "ant-design-vue";
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
                <BuyStep step={4} />
                <div class="order-success">
                    <div class="order-true">
                        <div class="content">
                            <div class="icon"><Icon type="property-safety" /></div>
                            <div class="money">
                                <div>支付成功</div>
                            </div>
                        </div>
                        <div class="togo"><a href="/"><button class="custom-btn-red">继续买书</button></a></div>
                    </div>
                </div>
            </div >
        </div >
    }
};
export default Index;


