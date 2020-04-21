import './index.scss';
import { Icon, Card,Modal ,Input } from "ant-design-vue";
const Index = {
    data() {
        return {
            updatePass:false
        };
    },
    mounted() {

    },
    methods: {
        changePass(){
            this.updatePass = true;
        },
        handleCancel(){
            this.updatePass=false
        }
    },
    render() {
        return <div class="myself">
            <Card title="个人信息" type="inner" extra={<button class="custom-btn-red custom-btn-small" style="margin:0px" onClick={this.changePass}>修改密码</button>}>
                <p>会员名：11111</p>
                <p>手机号：123456</p>
                <p>身份证号：</p>
                <p>性别：</p>
                <p>生日：</p>
            </Card>
            <Modal
                title="修改密码"
                visible={this.updatePass}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <button class="custom-btn-red">确认</button>,
                    <button class="custom-btn" onClick={this.handleCancel}>取消</button>
                ]}
            >
               <div style="margin-top:10px">请输入旧密码：<Input.Password placeholder="请输入密码" maxLength={6} size="large" onInput={this.changePass} style="width:70%"/></div>
               <div style="margin-top:10px">请输入新密码：<Input.Password placeholder="请输入密码" maxLength={6} size="large" onInput={this.changePass} style="width:70%"/></div>
               <div style="margin-top:10px">请再输入一次：<Input.Password placeholder="请输入密码" maxLength={6} size="large" onInput={this.changePass} style="width:70%"/></div>
            </Modal>
        </div >
    }
};
export default Index;


