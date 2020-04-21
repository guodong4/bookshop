import './index.scss';
import { Icon } from "ant-design-vue";
import $ from "jquery";
import BroadCast from "@/components/broadcast/";
import "@/components/broadcast/index.css";
import SearchModule from "../components/search"

var autoscroll = null;
const Index = {
    data() {
        return {
            itemindex: 1,
            itemlist: [{
                name: "首页",
                path: "",
                child: []
            }, {
                name: "免费阅读",
                path: "",
            }, {
                name: "会员阅读",
                path: "",
            }],
            special_index: 0,
        };
    },
    mounted() {

    },
    methods: {
        onChange() { },
        itemClick(itemindex) {
            this.itemindex = itemindex;
        },
        toRead(){
            this.$router.push({
                path:"/read/detail"
            })
        }
    },
    render() {
        return <div class="book-body">
            <div class="content">
                <SearchModule />
                <div class="item">
                    <ul class="item-ul">
                        {
                            this.itemlist.map((arr, index) => {
                                return <li onClick={this.itemClick.bind(this, index)} key={index} class={this.itemindex == index ? "item-li activity" : "item-li"}>
                                    {arr.name}
                                    {
                                        arr.child ? arr.child.length > 0 ? <Icon type="caret-down" /> : "" : ""
                                    }
                                    {
                                        arr.child ? arr.child.length > 0 ?
                                            <div class="child-item">
                                                <ul class="child-item-ul">
                                                    {
                                                        arr.child.map(child_arr => <li class="child-item-li">{child_arr.name}</li>)
                                                    }
                                                </ul>
                                            </div> : "" : ""
                                    }

                                </li>
                            })
                        }
                    </ul>
                </div>
                {/* 书本列表 */}
                <div class="book-list">
                    <div class="title-item">
                        <div class="title">书籍列表</div>
                    </div>
                    <div class="goods-list">
                        <ul>
                            {
                                "1234122222222222".split("").map(arr => {
                                    return <li>
                                        <div class="goods-special">
                                            <div class="left" onClick={() => { window.open("/detail?id=" + 111, "blank") }}>
                                                <img src="src/img/10.jpg" />
                                            </div>
                                            <div class="right">
                                                <h3><b>好书</b></h3>
                                                <div style="margin:0 auto;text-align:center">
                                                    <button class="custom-btn-red" onClick={this.toRead}>在线阅读</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                {/* 阅读排行 */}
                <div class="book-hot">
                    <div class="title-item">
                        <div class="title">阅读排行</div>
                    </div>
                    <div class="hot-filed">
                        {
                            "1234567811".split("").map((arr, index) => {
                                return <div>
                                    <font color={index == 0 || index == 1 || index == 2 ? "red" : ""}>{index + 1}</font>&nbsp;&nbsp;&nbsp;&nbsp;
                                    《金瓶梅与猪八戒》       作者：罗贯中            销量：10000</div>
                            })
                        }
                    </div>
                </div>
            </div >
        </div >
    }
};
export default Index;


