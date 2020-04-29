import './index.scss';
import { Icon } from "ant-design-vue";
import $ from "jquery";
import BroadCast from "@/components/broadcast/";
import "@/components/broadcast/index.css";
import SearchModule from "../components/search"
import moment from 'moment';
var autoscroll = null;
const Index = {
    data() {
        return {
            itemindex: 0,
            itemlist: [{
                name: "首页",
                path: "",
            }],
            special_index: 0,
            option: {
                page: 1,
                pageSize: 12
            },
            bookList: [],
            count: 0,
            specialList: [],
            adsList: [],
            hotList: [],
            newBookList: []
        };
    },
    mounted() {
        //顶部轮播图
        this.getSwoing();
        //获取分类
       this.getClassify();
        //获取图书列表
        this.getBookList(this.option);
        //今日特价
        this.getSpecial();
        //广告
        //this.getAds();
        //热销榜
       // this.getHot();
        //新书
       // this.getNewBookList()
    },
    methods: {
        getNewBookList() {
            $ajax({
                url: "/book/findNewBook"
            }).then(data => {
                this.newBookList = data.rows;
            })
        },
        getHot() {
            $ajax({
                url: "/book/findBookHot"
            }).then(data => {
                this.hotList = data.rows;
            })
        },
        //今日特价
        getAds() {
            $ajax({
                url: "/ads/findAllAds"
            }).then(data => {
                this.adsList = data;
            })
        },
        //今日特价
        getSpecial() {
            $ajax({
                url: "/special/findAllWeb"
            }).then(data => {
                this.specialList = data;
                this.autoroll(1);
            })
        },
        //分类
        getClassify() {
            $ajax({
                url: "/bookType/findAll"
            }).then(data => {
                var parentArr = data.filter(arr => arr.parent == null);
                var itemlist = parentArr.map(arr => {
                    var bookType = {
                        id: arr.id,
                        name: arr.type
                    };
                    data.map(item => {
                        if (item.parent == arr.id) {
                            bookType.child = bookType.child || [];
                            bookType.child.push({
                                id: item.id,
                                name: item.type,
                            })
                        }
                    })
                    return bookType;
                })
                this.itemlist = this.itemlist.concat(itemlist);
            })
        },
        //l轮播图
        getSwoing() {
            $ajax({
                url: "/swoing/findAllSwoing"
            }).then(data => {
                new BroadCast({
                    el: $(".book-body .sowing"),
                    data: data.map(arr => {
                        return {
                            url:"/detail?id="+arr.book_id,
                            src: host + "/" + arr.banner_img,
                            mainTitle: arr.book_name,
                            secontTitle: arr.book_desc
                        }
                    }),
                    isAuto: true, //是否自动播放
                    speed: 5000 //播放速度。ms
                });
            })
        },
        onChange() { },
        itemClick(itemindex, arr) {
            this.itemindex = itemindex;
            if (itemindex != 0) {
                $(".book-body .sowing").empty();
            } else {
                this.getSwoing();
            }
            this.changeClassify(arr)
        },
        changeClassify(arr) {
            if ((!arr.child) || (arr.child && arr.child.length == 0)) {
                if (this.itemindex != 0) {
                    this.bookList = [];
                    this.getBookList(this.option, arr);
                }
            }
        },
        getBookList(option, arr) {
            this.option = option;
            var data = this.option;
            if (arr) {
                data.book_type = arr.id
            }
            $ajax({
                url: "/book/findAllByType",
                data
            }).then(data => {
                this.bookList = this.bookList.concat(data.rows);
                this.count = data.count;
            })
        },
        changePage(page) {
            this.option.page = page + 1;
            this.getBookList(this.option);
        },
        specialClick(num) {
            clearTimeout(autoscroll);
            //向右滚动
            if (num == 1 && this.special_index == (this.specialList.length >= 6 ? 3 : Math.ceil(this.specialList.length / 2) - 1)) return;
            //向左滚动
            if (num == -1 && this.special_index == 0) return;
            this.special_index = this.special_index + num;
            this.autoroll(1);
        },
        autoroll(num) {
            var _this = this;
            autoscroll = setTimeout(function () {
                if (_this.specialList.length <= 2) {
                    clearTimeout(autoscroll);
                } else {
                    //向右滚动
                    if (num == 1 && _this.special_index == (_this.specialList.length >= 6 ? 3 : Math.ceil(_this.specialList.length / 2) - 1)) {
                        num = -1;
                    };
                    //向左滚动
                    if (num == -1 && _this.special_index == 0) {
                        num = 1;
                    };
                    _this.special_index = _this.special_index + num;
                    _this.autoroll(num);
                }
            }, 3000)
        }
    },
    render() {
        var sArr = [];
        for (var i = 0; i < Math.ceil(this.specialList.length / 2); i++) {
            sArr.push("1")
        }
        return <div class="book-body">
            <div class="content">
                <SearchModule />
                <div class="item">
                    <ul class="item-ul">
                        {
                            this.itemlist.map((arr, index) => {
                                return <li onClick={this.itemClick.bind(this, index, arr)} key={index} class={this.itemindex == index ? "item-li activity" : "item-li"}>
                                    {arr.name}
                                    {
                                        arr.child ? arr.child.length > 0 ? <Icon type="caret-down" /> : "" : ""
                                    }
                                    {
                                        arr.child ? arr.child.length > 0 ?
                                            <div class="child-item">
                                                <ul class="child-item-ul">
                                                    {
                                                        arr.child.map(child_arr => <li class="child-item-li" onClick={this.changeClassify.bind(this, child_arr)}>{child_arr.name}</li>)
                                                    }
                                                </ul>
                                            </div> : "" : ""
                                    }

                                </li>
                            })
                        }
                        <li class="item-li" onClick={() => { window.location.href = "/read" }}>
                            阅读
                        </li>
                    </ul>
                </div>

                {/* 轮播图 */}
                {
                    this.itemindex == 0 ? <div class="sowing"></div> : ""
                }
                {/* 今日特价 */}
                {
                    this.itemindex == 0 ? <div class="today-special">
                        <div class="title-item">
                            <div class="title">今日特价
                            <span style="float:right;font-size:30px">
                                    <Icon type="left-circle" theme="filled" class="icon" style={{ color: this.special_index == 0 ? "gray" : "" }} onClick={this.specialClick.bind(this, -1)} />&nbsp;
                                <Icon type="right-circle" theme="filled" style={{ color: this.special_index == Math.ceil(this.specialList.length / 2) - 1 ? "gray" : "" }} onClick={this.specialClick.bind(this, 1)} class="icon" />
                                </span>
                            </div>
                            <div class="special-list">
                                <ul style={{ left: -this.special_index * 100 + "%" }}>
                                    {
                                        sArr.map((arr, index) => {
                                            return <li onMouseenter={() => { clearTimeout(autoscroll) }} onMouseleave={this.autoroll.bind(this, 1)}>
                                                <div class="goods-special" style="float:left">
                                                    <div class="left">
                                                        <img src={host + "/" + this.specialList[index * 2].book_img} />
                                                    </div>
                                                    <div class="right">
                                                        <h3><b>{this.specialList[index * 2].book_name}</b></h3>
                                                        <div style="height:128px;overflow:hidden">{this.specialList[index * 2].book_desc}</div>
                                                        <p><b style="color:#e03737;">￥{this.specialList[index * 2].book_price}</b>&nbsp;&nbsp;&nbsp;&nbsp;<del>￥{this.specialList[index * 2].book_old_price}</del></p>
                                                        <a href={"/detail?id="+this.specialList[index * 2].book_id} target="_blank"><button class="custom-btn">加入购物车</button></a>
                                                    </div>
                                                </div>
                                                {
                                                    this.specialList[index * 2 + 1] ?
                                                        <div class="goods-special" style="float:right">
                                                            <div class="left">
                                                                <img src={host + "/" + this.specialList[index * 2 + 1].book_img} />
                                                            </div>
                                                            <div class="right">
                                                                <h3><b>{this.specialList[index * 2 + 1].book_name}</b></h3>
                                                                <div style="height:128px;overflow:hidden">{this.specialList[index * 2 + 1].book_desc}</div>
                                                                <p><b style="color:#e03737;">￥{this.specialList[index * 2 + 1].book_price}</b>&nbsp;&nbsp;&nbsp;&nbsp;<del>￥{this.specialList[index * 2 + 1].book_old_price}</del></p>
                                                                <a href={"/detail?id="+this.specialList[index * 2].book_id} target="_blank"><button class="custom-btn">加入购物车</button></a>
                                                            </div>
                                                        </div> : ""
                                                }

                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div> : ""
                }
                {
                    this.itemindex == 0 ? <div class="book-ad">
                        {
                            this.adsList.filter(arr => arr.type == 1).map(arr => {
                                return <div class="bood-gg"><a href={arr.url} target="_blank"><img src={host + "/" + arr.img_path} /></a></div>
                            })
                        }
                    </div> : ""
                }
                {/* 书本列表 */}
                <div class="book-list">
                    <div class="title-item">
                        <div class="title">书籍列表</div>
                    </div>
                    <div class="goods-list">
                        <ul>
                            {
                                this.bookList.map(arr => {
                                    return <li>
                                        <div class="goods-special">
                                            <div class="left" onClick={() => { window.open("/detail?id=" + arr.id, "blank") }}>
                                                <img src={host + "/" + arr.book_img} />
                                            </div>
                                            <div class="right">
                                                <h3><b>{arr.book_name}</b></h3>
                                                <p><b style="color:#e03737;">￥{arr.book_price}</b></p>
                                                <div style="margin:0 auto;text-align:center">
                                                    <button class="custom-btn" onClick={() => { window.open("/detail?id=" + arr.id, "blank") }}>加入购物车</button>
                                                    <button class="custom-btn-red"><Icon type="heart" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div class="more">
                        {
                            this.option.page * this.option.pageSize < this.count ?
                                <a onClick={this.changePage.bind(this, this.option.page)}>--  加载更多 --</a>
                                : <span>--  没有更多 --</span>
                        }
                    </div>
                </div>
                {/* 广告投放区 */}
                {
                    this.itemindex == 0 ? <div class="book-ad">
                        <ul>
                            {
                                this.adsList.filter(arr => arr.type == 2).map(arr => {
                                    return <li>
                                        <a href={arr.url}>
                                            <img src={host + "/" + arr.img_path} />
                                        </a>
                                    </li>
                                })
                            }
                        </ul>
                    </div> : ""
                }

                {/* 销量排行 */}
                {
                    this.itemindex == 0 ?
                        <div class="book-hot">
                            <div class="left">
                                <div class="title-item">
                                    <div class="title">热销榜</div>
                                </div>
                                <div class="hot-filed">
                                    {
                                        this.hotList.map((arr, index) => {
                                            return <div>
                                                <font color={index == 0 || index == 1 || index == 2 ? "red" : ""}>{index + 1}</font>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <a href={"/detail?id="+arr.id} target="_blank">《{arr.book_name}》</a>&nbsp;&nbsp;&nbsp;&nbsp;<span style="float:right">|&nbsp;&nbsp;&nbsp;&nbsp;
                                                作者：{arr.book_author}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;销量：{arr.seller_num||0}</span>
                                                </div>
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
                                        this.newBookList.map((arr, index) => {
                                            return <div>
                                                <font color={index == 0 || index == 1 || index == 2 ? "red" : ""}>{index + 1}</font>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <a href={"/detail?id="+arr.id} target="_blank">《{arr.book_name}》</a>&nbsp;&nbsp;&nbsp;&nbsp;<span style="float:right">|&nbsp;&nbsp;&nbsp;&nbsp;
                                                作者：{arr.book_author}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;上架时间：{moment(arr.book_publish_time).format('YYYY-MM-DD')}</span></div>
                                        })
                                    }
                                </div>
                            </div>
                        </div> : ""
                }
            </div >
        </div >
    }
};
export default Index;


