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
            itemindex: 0,
            itemlist: [{
                name: "首页",
                path: "",
                child: []
            }, {
                name: "科学类",
                path: "",
                child: [{
                    name: "化学少时诵诗书所三生三世是是是"
                }, {
                    name: "物理"
                },]
            }, {
                name: "医学类",
                path: "",
                child: [{
                    name: "妇科",
                }, {
                    name: "男科"
                },]
            }],
            special_index: 0,
        };
    },
    mounted() {
        //顶部轮播图
        new BroadCast({
            el: $(".book-body .sowing"),
            data: [
                {
                    src: "/src/img/1.png",
                    mainTitle: "国家主权基金中国国新C轮领投",
                    secontTitle: "智能科技平台百融金服旗下",
                    url: ""
                },
                {
                    src: "/src/img/2.jpg",
                    mainTitle: "好风景",
                    secontTitle: "好个毛线",
                    url: ""
                },
                {
                    src: "/src/img/1.jpeg",
                    mainTitle: "鹅鹅鹅饿饿",
                    secontTitle: "你好",
                    url: ""
                }
            ],
            isAuto: true, //是否自动播放
            speed: 5000 //播放速度。ms
        });
        this.autoroll(1);
    },
    methods: {
        onChange() { },
        itemClick(itemindex) {
            this.itemindex = itemindex;
        },
        specialClick(num) {
            clearTimeout(autoscroll);
            //向右滚动
            if (num == 1 && this.special_index == 3) return;
            //向左滚动
            if (num == -1 && this.special_index == 0) return;
            this.special_index = this.special_index + num;
            this.autoroll(1);
        },
        autoroll(num) {
            var _this = this;
            autoscroll = setTimeout(function () {
                //向右滚动
                if (num == 1 && _this.special_index == 3){
                    num=-1;
                };
                //向左滚动
                if (num == -1 && _this.special_index == 0) {
                    num=1;
                };
                _this.special_index = _this.special_index + num;
                _this.autoroll(num);
            }, 5000)
        }
    },
    render() {
        return <div class="book-body">
            <div class="content">
                <SearchModule/>
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
                        <li class="item-li" onClick={()=>{window.location.href="/read"}}>
                            阅读
                        </li>
                    </ul>
                </div>
                {/* 轮播图 */}
                <div class="sowing"></div>
                {/* 今日特价 */}
                <div class="today-special">
                    <div class="title-item">
                        <div class="title">今日特价
                            <span style="float:right;font-size:30px">
                                <Icon type="left-circle" theme="filled" class="icon" style={{ color: this.special_index == 0 ? "gray" : "" }} onClick={this.specialClick.bind(this, -1)} />&nbsp;
                                <Icon type="right-circle" theme="filled" style={{ color: this.special_index == 3 ? "gray" : "" }} onClick={this.specialClick.bind(this, 1)} class="icon" />
                            </span>
                        </div>
                        <div class="special-list">
                            <ul style={{left:-this.special_index*100+"%"}}>
                                {
                                    "1234".split("").map(arr => {
                                        return <li onMouseenter={()=>{clearTimeout(autoscroll)}} onMouseleave={this.autoroll.bind(this,1)}>
                                            <div class="goods-special" style="float:left">
                                                <div class="left">
                                                    <img src="src/img/1.jpeg" />
                                                </div>
                                                <div class="right">
                                                    <h3><b>好书</b></h3>
                                                    <div style="height:128px;overflow:hidden">详细内容呜呜呜呜我问问我详细内容呜呜呜呜我问问我问问问问我问问问问我我我我  我我 我我</div>
                                                    <p><b style="color:#e03737;">￥123</b>&nbsp;&nbsp;&nbsp;&nbsp;<del>￥222</del></p>
                                                    <button class="custom-btn">加入购物车</button>
                                                </div>
                                            </div>
                                            <div class="goods-special" style="float:right">
                                                <div class="left">
                                                    <img src="src/img/1.jpeg" />
                                                </div>
                                                <div class="right">
                                                    <h3><b>好书</b></h3>
                                                    <div style="height:128px;overflow:hidden">详细内容呜呜呜呜我问问我详细内容呜呜呜呜我问问我问问问问我问问问问我我我我  我我 我我</div>
                                                    <p><b style="color:#e03737;">￥123</b>&nbsp;&nbsp;&nbsp;&nbsp;<del>￥222</del></p>
                                                    <button class="custom-btn">加入购物车</button>
                                                </div>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                </div>
                <div class="book-ad">
                    <div class="bood-gg"><img src="src/img/gg.jpg" /></div>
                    <div class="bood-gg"><img src="src/img/g1.jpg" /></div>
                    <div class="bood-gg"><img src="src/img/g2.jpg" /></div>
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
                                            <div class="left" onClick={()=>{window.open("/detail?id="+111,"blank")}}>
                                                <img src="src/img/10.jpg" />
                                            </div>
                                            <div class="right">
                                                <h3><b>好书</b></h3>
                                                <p><b style="color:#e03737;">￥123</b></p>
                                                <div style="margin:0 auto;text-align:center">
                                                    <button class="custom-btn">加入购物车</button>
                                                    <button class="custom-btn-red"><Icon type="heart" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
                {/* 广告投放区 */}
                <div class="book-ad">
                    <ul>
                        <li>
                            <img src="src/img/gg1.jpg" />
                        </li>
                        <li>
                            <img src="src/img/gg2.jpg" />
                        </li>
                        <li>
                            <img src="src/img/gg3.jpg" />
                        </li>
                        <li>
                            <img src="src/img/gg4.jpg" />
                        </li>
                    </ul>
                </div>
                {/* 销量排行 */}
                <div class="book-hot">
                    <div class="left">
                        <div class="title-item">
                            <div class="title">热销榜</div>
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
                    <div class="right">
                        <div class="title-item">
                            <div class="title">新书上架</div>
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
                </div>
            </div >
        </div >
    }
};
export default Index;


