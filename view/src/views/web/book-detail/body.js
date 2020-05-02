import './index.scss';
import SearchModule from "../components/search";
import { InputNumber, Icon, Rate, Pagination, message } from "ant-design-vue";
import moment from 'moment';
var autoscroll = null;
const Index = {
    data() {
        return {
            //大图
            bigimg: "",
            //1 详情  2 评价
            goodstag: 1,
            book: {},
            bookImg: [],
            comment: [],
            commentPage: {
                pageSize: 10,
                page: 1,
                total: 1
            },
            rate: 0,
            member: {},
            buynum: 1
        };
    },
    mounted() {
        var id = this.$route.query.id;
        this.getBook(id);
        this.getBookImg(id);
        this.getComment(id);
        this.member = localStorage.getItem("member");
        this.member = JSON.parse(this.member);
    },
    methods: {
        getBook(id) {
            $ajax({
                url: "/book/findOne",
                data: { id }
            }).then(data => {
                if (data.code == 1) {
                    this.book = data.data;
                    this.bigimg = this.book.book_img;
                }
            })
        },
        getBookImg(id) {
            $ajax({
                url: "/book/findBookImg",
                data: { book_id: id }
            }).then(data => {
                if (data.code == 1) {
                    this.bookImg = data.data;
                }
            })
        },
        getComment(id) {
            $ajax({
                url: "/comment/findCommentByBookId",
                data: {
                    comment_book_id: id,
                    ...this.commentPage
                }
            }).then(data => {
                this.comment = data.rows;
                this.commentPage.pageSize = data.pageSize,
                    this.commentPage.page = data.page,
                    this.commentPage.total = data.count;
                var rate = 0;
                data.rows.map(arr => {
                    rate += Number(arr.comment_star);
                });
                this.rate = Math.ceil(rate / data.rows.length);
            })
        },
        addCarts(id) {
            if (!this.member) {
                message.error("请先登录！");
                return;
            }
            $ajax({
                url: "/carts/addCarts",
                data: {
                    member_id: this.member.id,
                    number: this.buynum,
                    book_id: this.book.id
                }
            }).then(data => {
                message.success(data.msg);
            })
        },
        likeThis(id) {
            if (!this.member) {
                message.error("请先登录！");
                return;
            }
            $ajax({
                url: "/like/addLike",
                data: {
                    member_id: this.member.id,
                    number: this.buynum,
                    book_id: this.book.id
                }
            }).then(data => {
                message.success(data.msg);
            })
        },
        changeCommentPage(page, pageSize) {
            this.commentPage.pageSize = pageSize;
            this.commentPage.page = page;
            this.getComment(this.book.id);
        },
        changeNum(value) {
            this.buynum = value;
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
                <div class="goods-detail">
                    <div class="goods-bigimg">
                        <div class="goods-img">
                            <div class="goods-imgr">
                                {
                                    this.bigimg ?
                                        <img src={host + "/" + this.bigimg} style="max-height:100%;max-width:90%" /> : ""
                                }
                            </div>
                        </div>
                        <div class="goods-imgs">
                            {
                                this.bigimg ? <div class="goods-li" style="margin-left:0px;" onClick={() => { this.bigimg = this.book.book_img }}>
                                    <img src={host + "/" + this.book.book_img} />
                                </div> : ""
                            }

                            {
                                this.bookImg.map((arr, index) => {
                                    if (this.bookImg.length <= 4 && index == this.bookImg.length - 1) {
                                        return <div class="goods-li" style="margin-right:0px;" onClick={() => { this.bigimg = arr.img_path }}><img src={host + "/" + arr.img_path} /></div>
                                    } else {
                                        return <div class="goods-li" onClick={() => { this.bigimg = arr.img_path }}><img src={host + "/" + arr.img_path} /></div>
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div class="goods-desc">
                        <div class="goods-name">{this.book.book_name}</div>
                        <div class="goods-ins">
                            <font>作者：{this.book.book_author}，{this.book.book_press}。@{moment(this.book.book_press_time).format('YYYY-MM-DD')}</font>
                            <p>{this.book.book_desc}</p>
                        </div>
                        <div class="goods-comment"> <font color="#333">好评度</font>&nbsp;&nbsp;&nbsp;&nbsp;<Rate disabled value={this.rate} /></div>
                        <div class="goods-price"><font color="#333">价格</font>&nbsp;&nbsp;&nbsp;&nbsp;<font color="red" class="price">￥{this.book.book_price}</font></div>
                        <div class="goods-stock"><font color="#333">库存</font>&nbsp;&nbsp;&nbsp;&nbsp;<font class="stock">{this.book.book_stock}件</font></div>
                        <div class="goods-num"><font color="#333">数量</font>&nbsp;&nbsp;&nbsp;&nbsp;<span><InputNumber min={1} value={this.buynum} onChange={this.changeNum} />件</span></div>
                        <div class="goods-other"> {this.book.book_remarks}</div>
                        <div class="goods-cart">
                            <button class="custom-btn-red" onClick={this.addCarts.bind(this, this.book.id)}>加入购物车</button>
                            <button class="custom-btn-red" title="收藏该商品" onClick={this.likeThis.bind(this, this.book.id)}><Icon type="heart" /></button>
                        </div>
                        <div class="goods-warn"> <font color="#333">温馨提示</font>&nbsp;&nbsp;&nbsp;&nbsp;<font class="warn">支持7天无理由退货</font></div>
                    </div>
                </div>
                <div class="goods-set">
                    <div class="goods-bar">
                        <div class={this.goodstag == 1 ? "bar active" : "bar"} onClick={() => { this.goodstag = 1 }}>商品详情</div>
                        <div class={this.goodstag == 2 ? "bar active" : "bar"} onClick={() => { this.goodstag = 2 }}>商品评价（{this.comment.length}）</div>
                    </div>
                    {
                        this.goodstag == 1 ?
                            <div class="goods-detail-desc">
                                <div>
                                    <ul class="goods-brief-intr">
                                        <li>作者：{this.book.book_name}</li>
                                        <li>出版社：{this.book.book_press}</li>
                                        <li>出版时间：{moment(this.book.book_press_time).format('YYYY-MM-DD')}</li>
                                        <li>商品编码：{this.book.book_code}</li>
                                    </ul>
                                </div>
                                <div class="goods-imgs">
                                    {
                                        this.bookImg.map(arr => {
                                            return <div>
                                                <img src={host + "/" + arr.img_path} />
                                            </div>
                                        })
                                    }
                                </div>
                            </div> :
                            <div class="goods-comment">
                                {
                                    this.comment.map(arr => <div class="comment-one">
                                        <div class="comment-self">
                                            <div class="comment-content">
                                                <div class="comment-rate"><Rate disabled defaultValue={arr.comment_star} /></div>
                                                <div class="comment-desc">{arr.comment}</div>
                                                <div class="comment-date">{moment(arr.comment_time).format('YYYY-MM-DD HH:mm:ss')}</div>
                                            </div>
                                            <div class="comment-author">
                                                <div class="author-photo"></div>
                                                <div class="author-name">{arr.comment_member_name}</div>
                                            </div>
                                            <div style="clear:both"></div>
                                        </div>
                                        {
                                            arr.comment_replay ?
                                                <div class="comment-replay">
                                                    商家回复：{arr.comment_replay}
                                                </div> : ""
                                        }

                                    </div>)
                                }
                                <div style="height:50px;text-align:center;line-height:50px;">
                                    <Pagination
                                        defaultCurrent={this.commentPage.current}
                                        current={this.commentPage.page}
                                        onChange={this.changeCommentPage}
                                        pageSize={this.commentPage.pageSize}
                                        total={this.commentPage.total}
                                        style="height:50px;line-height:50px;" />
                                </div>
                            </div>
                    }
                </div>
            </div >
        </div >
    }
};
export default Index;


