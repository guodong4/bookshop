import './index.scss';
import { Input, Button, message } from 'ant-design-vue';
const Index = {
    data() {
        return {
            oldpass: "",
            newpass: "",
            aginpass: "",
            msg: ""
        };
    },
    mounted() {

    },
    methods: {
        changeInput(key, e) {
            var value = e.target.value;
            this[key] = value;
        },
        changePass() {
            var user = localStorage.getItem("user");
            user = JSON.parse(user);
            var reg = /^[a-zA-Z0-9_]+$/;
            if (this.oldpass == "" || this.newpass == "" || this.aginpass == "") {
                this.msg = "*  密码输入不能为空";
                return;
            }
            if (!reg.test(this.oldpass) || !reg.test(this.newpass) || !reg.test(this.aginpass)) {
                this.msg = "*  不能输入除字母数字下划线以外的字符";
                return;
            }
            if (user.password != this.oldpass) {
                this.msg = "*  原始密码输入错误";
                return;
            }
            if (this.newpass !== this.aginpass) {
                this.msg = "*  新密码与确认密码不一致";
                return;
            }
            $ajax({
                url: "/user/updatePass",
                data: {
                    id: user.id,
                    password: this.newpass
                }
            }).then(data => {
                if (data.code == 1) {
                    message.success(data.msg);
                    localStorage.removeItem("user");
                    this.$router.push("/system/login");
                }
            })
        }
    },
    render() {
        return <div class="update-password">
            <div><span>原始密码&nbsp;:</span><Input.Password style="width:300px;margin-left:30px;" onInput={this.changeInput.bind(this, "oldpass")} /></div>
            <div><span>新密码&nbsp;:</span><Input.Password style="width:300px;margin-left:30px;" onInput={this.changeInput.bind(this, "newpass")} /></div>
            <div><span>确认密码&nbsp;:</span><Input.Password style="width:300px;margin-left:30px;" onInput={this.changeInput.bind(this, "aginpass")} /></div>
            <div style="height:50px;line-height:50px;color:#ec3737">{this.msg}</div>
            <div style="margin-right:150px"><Button type="primary" onClick={this.changePass}>确认修改</Button></div>
        </div>
    }
};
export default Index;