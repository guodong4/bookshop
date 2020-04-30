import './index.scss';
import BuyStep from "../components/buy-step";
import { Icon, Radio } from "ant-design-vue";
const Index = {
    render() {
        return <div class="book-body">
            <div class="content">
                <BuyStep step={4} />
                <div class="order-success">
                    <div class="order-true">
                        <div class="content">
                            <div class="icon"><Icon type="property-safety" /></div>
                            <div class="money">
                                <div>支付成功</div>
                            </div>
                        </div>
                        <div class="togo"><a href="/"><button class="custom-btn-red">继续买书</button></a></div>
                    </div>
                </div>
            </div >
        </div >
    }
};
export default Index;


