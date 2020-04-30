import './index.scss';
import BuyStep from "../components/buy-step";
import { Icon, Radio, Modal ,Input} from "ant-design-vue";
const Index = {
    data() {
        return {
            toPayMoney:false,
            password:"",
            order_number:"",
            order_price:0
        };
    },
    mounted() {
        this.order_number = this.$route.query.order_number;
        this.getOrder(this.order_number);
    },
    methods: {
        getOrder(order_number){
            $ajax({
                url: "/order/findBookByOrderId",
                data: {
                    order_number:order_number
                }
            }).then(data=>{
                this.order_price = data.data.order_price
            })
        },
        payNow() {
            this.toPayMoney=true;
        },
        handleOk(){
            if(this.password.length!=6){
                return;
            }else{
                $ajax({
                    url: "/order/payOrder",
                    data: {
                        order_number:this.order_number
                    }
                }).then(data=>{
                    this.toPayMoney=false;
                    this.$router.push("/success")
                })
            }
        },
        handleCancel(){
            this.toPayMoney=false;
        },
        changePass(e){
            this.password = e.target.value;
        }
    },
    render() {
        return <div class="book-body">
            <div class="content">
                <BuyStep step={3} />
                <div class="goods-confirm">
                    <div class="order-true">
                        <div class="title">
                            <Icon type="pay-circle" />&nbsp;&nbsp;
                            订单确定
                        </div>
                        <div class="content">
                            <div class="icon"><Icon type="safety" /></div>
                            <div class="money">
                                <div>支付类型：在线支付</div>
                                <div>支付金额：￥{this.order_price}</div>
                            </div>
                        </div>
                    </div>
                    <div class="order-true">
                        <div class="title">
                            选择支付方式
                        </div>
                        <Radio.Group style="width:100%" defaultValue="1">
                        <div class="content">
                            <div class="pay-type zhi"><Icon type="alipay-circle" /><font color="#666" size="+1">&nbsp;支付宝</font><Radio value="1" style="float:right;line-height:60px" /></div>
                            <div class="pay-type wei"><Icon type="wechat" /><font color="#666" size="+1">&nbsp;微信支付</font><Radio value="2" style="float:right;line-height:60px" /></div>
                        </div>
                        </Radio.Group>
                    </div>
                    <div class="pay-btn"><button class="custom-btn-red" onClick={this.payNow}>立即支付￥{this.order_price}</button></div>
                </div> 
            </div >
            <Modal
                title="请输入密码"
                visible={this.toPayMoney}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <button class={this.password.length!=6?"custom-btn-gray":"custom-btn-red"} onClick={this.handleOk}>确认支付</button>,
                    <button class="custom-btn" onClick={this.handleCancel}>取消支付</button>
                ]}
            >
               <Input.Password placeholder="请输入6位密码" maxLength={6} size="large" onInput={this.changePass}/>
            </Modal>
        </div >
    }
};
export default Index;


