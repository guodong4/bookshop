import './index.scss';
import { Input, Icon, Checkbox } from "ant-design-vue";
import "@/components/broadcast/index.css";
const { Search } = Input;
const Index = {
    props:['search'],
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
            this.getCarts(this.member.id)
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
            <div class="search-form"><Search placeholder="请输入书名或作者关键字" onSearch={this.search} enterButton /></div>
            <div class="cart">
                <div class="heart" onClick={() => { window.location.href = "/collection" }}>
                    <Icon type="heart" />
                </div>
                <div class="shopping-cart">
                    <span style="position:relative" onClick={() => { window.location.href = "/cart" }}>
                        <span class="num">{this.cartsList.length}</span>
                        <span class="book-cart"><Icon type="shopping-cart" /></span>
                    </span>
                </div>
            </div>
        </div>
    }
};
export default Index;


