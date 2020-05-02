import './index.scss';
import SearchModule from "../components/search";
import { InputNumber, Icon, Rate, Checkbox, message, Empty } from "ant-design-vue";
var autoscroll = null;
const Index = {
    data() {
        return {
            goodstag: 1,
            likelist: [],
            totalMoney: 0,
            checkedArr: []
        };
    },
    mounted() {
        this.member = localStorage.getItem("member");
        this.member = JSON.parse(this.member);
        if (this.member) {
            this.getLike(this.member.id)
        } else {
            message.error("请先登录！");
        }
    },
    methods: {
        getLike(id) {
            $ajax({
                url: "/like/findLikeByMember",
                data: { member_id: id }
            }).then(data => {
                this.likelist = data;
            })
        },
        delete(arr){
            $ajax({
                url: "/like/delete",
                data: { id: arr.like_id }
            }).then(data => {
                message.success(data.msg);
                window.location.reload();
            })
        },
        search(value){
            this.$router.push({
                path:'/',
                query:{
                    content:value
                }
            })
        }
    },
    render() {
        return <div class="book-body">
            <div class="content">
                <SearchModule search={this.search}/>
                <div class="goods-cart">
                    <table class="cart-list">
                        <thead>
                            <tr>
                                <th></th>
                                <th>商品名称</th>
                                <th>商品信息</th>
                                <th>单价</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.likelist.length == 0 ? <tr><td colspan="7"><Empty /></td></tr> : this.likelist.map((arr, index) => {
                                    return <tr>
                                        <td width="15%" align="center">
                                            <img src={host + "/" + arr.book_img} width="80px" height="80px" />
                                        </td>
                                        <td width="15%" align="center"><a href={"/detail?id=" + arr.id} target="_blank">{arr.book_name}</a></td>
                                        <td width="15%" align="center">{arr.book_desc}</td>
                                        <td width="10%">
                                            ￥{arr.book_price}
                                        </td>
                                        <td width="20%">
                                            <button class="custom-btn-red custom-btn-small" onClick={this.delete.bind(this, arr)}>删除</button>
                                        </td>
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


