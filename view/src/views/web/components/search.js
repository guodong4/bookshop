import './index.scss';
import { Input, Icon, Checkbox } from "ant-design-vue";
import "@/components/broadcast/index.css";
const { Search } = Input;
const Index = {
    data() {
        return {
            
        };
    },
    mounted() {
    },
    methods: {
        onChange() { },
    },
    render() {
        return <div class="top-search">
        <div class="logo">黄金书屋</div>
        <div class="search-form"><Search placeholder="请输入书名或作者关键字" onSearch={value => console.log(value)} enterButton /></div>
        <div class="cart">
            <div class="heart" onClick={()=>{window.location.href="/collection"}}>
                <Icon type="heart" />
            </div>
            <div class="shopping-cart">
                <span style="position:relative" onClick={()=>{window.location.href="/cart"}}>
                    <span class="num">2</span>
                    <span class="book-cart"><Icon type="shopping-cart" /></span>
                </span>
                <div class="parent-megamenu">
                    <div class="shop-list">
                        <ul >
                            <li>
                                <div class="book-check"><Checkbox onChange={this.onChange} /></div>
                                <div class="book-img"><img src={require("@/img/cart2.jpg")} width="80px" /></div>
                                <div class="book-des">
                                    <div style="height:45px;line-height:22px;padding-right:10px;overflow:hidden;width:80%;">好看的书好看的书好看的书好看的书好看的书好看的书</div>
                                    <div style="height:30px;color:#e03737;font-weight:600;">￥1000</div>
                                </div>
                            </li>
                            <li>
                                <div class="book-check"><Checkbox onChange={this.onChange} /></div>
                                <div class="book-img"><img src={require("@/img/cart2.jpg")} width="80px" /></div>
                                <div class="book-des">
                                    <div style="height:45px;line-height:22px;padding-right:10px;overflow:hidden;width:80%;">好看的书好看的书好看的书好看的书好看的书好看的书</div>
                                    <div style="height:30px;color:#e03737;font-weight:600;">￥1000</div>
                                </div>
                            </li>
                            <li>
                                <div class="book-check"><Checkbox onChange={this.onChange} /></div>
                                <div class="book-img"><img src={require("@/img/cart2.jpg")} width="80px" /></div>
                                <div class="book-des">
                                    <div style="height:45px;line-height:22px;padding-right:10px;overflow:hidden;width:80%;">好看的书好看的书好看的书好看的书好看的书好看的书</div>
                                    <div style="height:30px;color:#e03737;font-weight:600;">￥1000</div>
                                </div>
                            </li>
                            <li>
                                <div class="book-check"><Checkbox onChange={this.onChange} /></div>
                                <div class="book-img"><img src={require("@/img/cart2.jpg")} width="80px" /></div>
                                <div class="book-des">
                                    <div style="height:45px;line-height:22px;padding-right:10px;overflow:hidden;width:80%;">好看的书好看的书好看的书好看的书好看的书好看的书</div>
                                    <div style="height:30px;color:#e03737;font-weight:600;">￥1000</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="money-totle">总计：￥1000.22</div>
                    <div class="btn-list">
                        <button class="custom-btn">查看购物车</button>
                        <button class="custom-btn">结账</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
};
export default Index;


