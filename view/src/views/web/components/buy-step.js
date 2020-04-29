import './index.scss';
import { Input, Steps, Icon } from "ant-design-vue";
import "@/components/broadcast/index.css";
const Index = {
    props:["step"],
    data() {
        return {

        };
    },
    mounted() {
    },
    methods: {
        onChange() { 

        },
    },
    render() {
        return <div class="top-search">
            <div class="logo" onClick={() => { window.location.href = "/" }}>黄金书屋</div>
            <div class="steps">
                <ul>
                    <li class={this.step>3?"done normal":"normal"}>付款成功</li>
                    <li class="icon"><Icon type="minus" /></li>
                    <li class={this.step>2?"done normal":"normal"}>支付方式</li>
                    <li class="icon"><Icon type="minus" /></li>
                    <li class={this.step>1?"done normal":"normal"}>确认订单</li>
                    <li class="icon"><Icon type="minus" /></li>
                    <li class="done normal">查看购物车</li>
                </ul>
            </div>
        </div>
    }
};
export default Index;


