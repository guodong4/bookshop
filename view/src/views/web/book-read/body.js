import './index.scss';
import { Icon } from "ant-design-vue";
import $ from "jquery";
import BroadCast from "@/components/broadcast/";
import "@/components/broadcast/index.css";
import SearchModule from "../components/search"
import Chatper from "./chapter";
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
            }],
            special_index: 0,
            option: {
                page: 1,
                pageSize: 12
            },
            readlist: [],
            count: 0,
            bookListTop10: [],
            type: 0
        };
    },
    mounted() {
        var member = localStorage.getItem("member");
        this.member = JSON.parse(member) || {};
        if (this.member.id) {
            this.itemlist.push({
                name: "会员阅读",
                path: "",
            });
        }
        this.getBookList(this.option);
        this.getBookTop10();
    },
    methods: {
        getBookList(option, type = 0) {
            this.option = option;
            $ajax({
                url: "/read/findAllByType",
                data: {
                    ...this.option,
                    type
                }
            }).then(data => {
                this.readlist = this.readlist.concat(data.rows);
                this.count = data.count;
            })
        },
        getBookTop10(type = 0) {
            $ajax({
                url: "/read/getBookTop10",
                data: {
                    ...this.option,
                    type
                }
            }).then(data => {
                this.bookListTop10 = data.rows;
            })
        },
        onChange() { },
        changePage(page) {
            this.option.page = page + 1;
            this.getBookList(this.option, this.type);
        },
        itemClick(itemindex) {
            this.readlist=[];
            this.itemindex = itemindex;
            if (itemindex == 0) {
                this.$router.push("/");
                return;
            }
            if (itemindex == 1) {
                this.type = 0;
                this.getBookList(this.option, this.type);
                this.getBookTop10(this.type);
            }
            if (itemindex == 2) {
                this.type = 1;
                this.getBookList(this.option, this.type);
                this.getBookTop10(this.type);
            }
        },
        toRead(read_id) {
            $ajax({
                url: "/read/changeReadNum",
                data: {
                    read_id
                }
            });
            this.$refs.chapter.show(read_id);
            // this.$router.push({
            //     path: "/read/detail",
            //     query: { read_id, type: this.type }
            // })
        },
        search(content) {
            $ajax({
                url: "/read/findAllByContent",
                data:{
                    content,
                    type:this.type
                }
            }).then(arr => {
                this.readlist = arr;
            })
        }
    },
    render() {
        return <div class="book-body">
            <div class="content">
                <SearchModule search={this.search} />
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
                                this.readlist.map(arr => {
                                    return <li>
                                        <div class="goods-special">
                                            <div class="left">
                                                <img src={host + "/" + arr.book_img} />
                                            </div>
                                            <div class="right">
                                                <h3><b>{arr.title.substring(0,12)}</b><font color="#303030" style="float:right" size="1">阅读量：{arr.read_num}</font></h3>
                                                <div style="margin:0 auto;text-align:center">
                                                    <button class="custom-btn-red" onClick={this.toRead.bind(this, arr.id)}>在线阅读</button>
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
                {/* 阅读排行 */}
                <div class="book-hot">
                    <div class="title-item">
                        <div class="title">阅读排行</div>
                    </div>
                    <div class="hot-filed">
                        {
                            this.bookListTop10.map((arr, index) => {
                                return <div>
                                    <font color={index == 0 || index == 1 || index == 2 ? "red" : ""}>{index + 1}</font>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <a onClick={this.toRead.bind(this, arr.id)} target="_blank">《{arr.title}》</a>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span title={arr.desc}>|&nbsp;&nbsp;简介：{arr.desc.substring(0, 30)}...</span>
                                    <span style="float:right">|&nbsp;&nbsp;作者：{arr.author}&nbsp;&nbsp;|&nbsp;&nbsp;阅读量：{arr.read_num}</span>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div >
            <Chatper ref="chapter" />
        </div >
    }
};
export default Index;


