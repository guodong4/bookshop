import './index.scss';
import { Input, Icon, Checkbox } from "ant-design-vue";
import "@/components/broadcast/index.css";
const { Search } = Input;
const Index = {
    data() {
        return {
            member: {},
            cartsList: [],
        };
    },
    mounted() {
        this.member = localStorage.getItem("member");
        this.member = JSON.parse(this.member);
        if (this.member) {
            //this.getCarts(this.member.id)
        }
    },
    methods: {
        getCarts(id) {
            $ajax({
                url: "/carts/findCartsByMember",
                data: { member_id: id }
            }).then(data => {
                this.cartsList = data;
            })
        }
    },
    render() {
        return <div class="top-search">
            <div class="logo" onClick={() => { window.location.href = "/" }}>黄金书屋</div>
            <div class="search-form"><Search placeholder="请输入书名或作者关键字" onSearch={value => console.log(value)} enterButton /></div>
            <div class="cart">
                <div class="heart" onClick={() => { window.location.href = "/collection" }}>
                    <Icon type="heart" />
                </div>
                <div class="shopping-cart">
                    <span style="position:relative" onClick={() => { window.location.href = "/cart" }}>
                        <span class="num">{this.cartsList.length}</span>
                        <span class="book-cart"><Icon type="shopping-cart" /></span>
                    </span>
                    {/* {
                        this.member ?
                            <div class="parent-megamenu">
                                <div class="shop-list">
                                    <ul >
                                        {
                                            this.cartsList.map(arr => {
                                                return <li>
                                                    <div class="book-check"><Checkbox onChange={this.onChange.bind(this,arr)} /></div>
                                                    <div class="book-img"><img src={host + "/" + arr.book_img} width="80px" style="height:76px"/></div>
                                                    <div class="book-des">
                                                        <div style="height:45px;line-height:22px;padding-right:10px;overflow:hidden;width:80%;">{arr.book_name}</div>
                                                        <div style="height:30px;color:#e03737;font-weight:600;">￥{arr.book_price*arr.number}</div>
                                                    </div>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                                    <div class="money-totle">总计：￥{this.totalmoney}</div>
                                <div class="btn-list">
                                    <button class="custom-btn">查看购物车</button>
                                    <button class="custom-btn">结账</button>
                                </div>
                            </div> : <div class="parent-megamenu" style="text-align:center;">请先登录！</div>
                    } */}
                </div>
            </div>
        </div>
    }
};
export default Index;


