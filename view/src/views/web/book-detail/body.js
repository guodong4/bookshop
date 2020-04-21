import './index.scss';
import SearchModule from "../components/search";
import { InputNumber, Icon, Rate } from "ant-design-vue";
var autoscroll = null;
const Index = {
    data() {
        return {
            //大图
            bigimg: "src/img/10.jpg",
            //1 详情  2 评价
            goodstag: 1
        };
    },
    mounted() {

    },
    methods: {
       
    },
    render() {
        return <div class="book-body">
            <div class="content">
                <SearchModule />
                <div class="goods-detail">
                    <div class="goods-bigimg">
                        <div class="goods-img">
                            <div class="goods-imgr">
                                <img src={this.bigimg} height="100%" />
                            </div>
                        </div>
                        <div class="goods-imgs">
                            <div class="goods-li" style="margin-left:0px;" onClick={() => { this.bigimg = "src/img/10.jpg" }}><img src="src/img/10.jpg" /></div>
                            <div class="goods-li" onClick={() => { this.bigimg = "src/img/10.jpg" }}><img src="src/img/10.jpg" /></div>
                            <div class="goods-li" onClick={() => { this.bigimg = "src/img/11.jpg" }}><img src="src/img/11.jpg" /></div>
                            <div class="goods-li" style="margin-right:0px;" onClick={() => { this.bigimg = "src/img/10.jpg" }}><img src="src/img/10.jpg" /></div>
                        </div>
                    </div>
                    <div class="goods-desc">
                        <div class="goods-name">金瓶梅凄凄切切群群群群群群群群群群群群群群群群群群群群群群群群群</div>
                        <div class="goods-ins"><font>作者：猪八戒，上海新东方出版社出版。@2019.0101</font></div>
                        <div class="goods-comment"> <font color="#333">好评度</font>&nbsp;&nbsp;&nbsp;&nbsp;<Rate disabled defaultValue={2} /></div>
                        <div class="goods-price"><font color="#333">价格</font>&nbsp;&nbsp;&nbsp;&nbsp;<font color="red" class="price">￥154.9</font></div>
                        <div class="goods-stock"><font color="#333">库存</font>&nbsp;&nbsp;&nbsp;&nbsp;<font class="stock">1212件</font></div>
                        <div class="goods-num"><font color="#333">数量</font>&nbsp;&nbsp;&nbsp;&nbsp;<span><InputNumber min={1} />件</span></div>
                        <div class="goods-other"> 由于这几天天气不好，现在至明天18:00前下单，预计04月03日(周五)送达</div>
                        <div class="goods-cart"><button class="custom-btn-red">加入购物车</button><button class="custom-btn-red" title="收藏该商品"><Icon type="heart" /></button></div>
                        <div class="goods-warn"> <font color="#333">温馨提示</font>&nbsp;&nbsp;&nbsp;&nbsp;<font class="warn">支持7天无理由退货</font></div>
                    </div>
                </div>
                <div class="goods-set">
                    <div class="goods-bar">
                        <div class={this.goodstag == 1 ? "bar active" : "bar"} onClick={() => { this.goodstag = 1 }}>商品详情</div>
                        <div class={this.goodstag == 2 ? "bar active" : "bar"} onClick={() => { this.goodstag = 2 }}>商品评价（20102）</div>
                    </div>
                    {
                        this.goodstag == 1 ?
                            <div class="goods-detail-desc">
                                <div>
                                    <ul class="goods-brief-intr">
                                        <li>作者：猪八戒</li>
                                        <li>出版社：清华出版社</li>
                                        <li>出版时间：20190909</li>
                                        <li>商品编码：1912831</li>
                                    </ul>
                                </div>
                                <div class="goods-imgs">
                                    <div>
                                        <img src="src/img/10.jpg" />
                                    </div>
                                    <div>
                                        <img src="src/img/10.jpg" />
                                    </div>
                                    <div>
                                        <img src="src/img/10.jpg" />
                                    </div>
                                </div>
                            </div> :
                            <div class="goods-comment">
                                {
                                    "12343333".split("").map(arr => <div class="comment-one">
                                        <div class="comment-self">
                                            <div class="comment-content">
                                                <div class="comment-rate"><Rate disabled defaultValue={3} /></div>
                                                <div class="comment-desc">好东西！</div>
                                                <div class="comment-date">2020-09-09 12:22:22</div>
                                            </div>
                                            <div class="comment-author">
                                                <div class="author-photo"><img src="src/img/11.jpg"/></div>
                                                <div class="author-name">张三</div>
                                            </div>
                                            <div style="clear:both"></div>
                                        </div>
                                        <div class="comment-replay">
                                            商家回复：感谢您的评价
                                        </div>
                                    </div>)
                                }
                            </div>
                    }
                </div>
            </div >
        </div >
    }
};
export default Index;


