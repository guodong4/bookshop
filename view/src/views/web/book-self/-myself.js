import './index.scss';
import { Icon, Card, Modal, Input, message } from "ant-design-vue";
import moment from 'moment';
const Index = {
    data() {
        return {
            updatePass: false,
            member: {},
            oldP: "",
            newP: "",
            agin: ""
        };
    },
    mounted() {
        var member = localStorage.getItem("member");
        this.member = JSON.parse(member)||{};
    },
    methods: {
        changePass() {
            this.updatePass = true;
        },
        changePsw(key, e) {
            this[key] = e.target.value;
        },
        handleCancel() {
            this.updatePass = false
        },
        submit() {
            if (this.oldP == "" || this.newP == "" || this.agin == "") {
                message.error("输入框不能为空");
                return;
            }
            if (this.oldP != this.member.password) {
                message.error("原始密码输入错误");
                return;
            }
            if (this.newP != this.agin) {
                message.error("两次密码输入不一致");
                return;
            }
            $ajax({
                url: "/member/updatePass",
                data: {
                    password: this.newP,
                    id: this.member.id
                }
            }).then(data => {
                message.success("修改成功");
                $ajax({
                    url: "/member/findOne",
                    data: {id:this.member.id}
                }).then(data => {
                    if (data.code == 1) {
                        localStorage.setItem("member", JSON.stringify(data.data));
                    }
                })
            })
        }
    },
    render() {
        return <div class="myself">
            <Card title="个人信息" type="inner" extra={<button class="custom-btn-red custom-btn-small" style="margin:0px" onClick={this.changePass}>修改密码</button>}>
                <p>会员名：{this.member.nickname}</p>
                <p>手机号：{this.member.telphone}</p>
                <p>身份证号：{this.member.idcard}</p>
                <p>性别：{this.member.sex == 0 ? "男" : "女"}</p>
                <p>生日：{this.member.birthday?moment(this.member.birthday).format('YYYY-MM-DD HH:mm:ss'):""}</p>
            </Card>
            <Modal
                title="修改密码"
                visible={this.updatePass}
                onOk={this.submit}
                onCancel={this.handleCancel}
                footer={[
                    <button class="custom-btn-red" onClick={this.submit}>确认</button>,
                    <button class="custom-btn" onClick={this.handleCancel}>取消</button>
                ]}
            >
                <div style="margin-top:10px">请输入旧密码：<Input.Password placeholder="请输入旧密码" maxLength={6} size="large" onInput={this.changePsw.bind(this, "oldP")} value={this.oldP} style="width:70%" /></div>
                <div style="margin-top:10px">请输入新密码：<Input.Password placeholder="请输入新密码" maxLength={6} size="large" onInput={this.changePsw.bind(this, "newP")} value={this.newP} style="width:70%" /></div>
                <div style="margin-top:10px">请再输入一次：<Input.Password placeholder="请再输入一次" maxLength={6} size="large" onInput={this.changePsw.bind(this, "agin")} value={this.agin} style="width:70%" /></div>
            </Modal>
        </div >
    }
};
export default Index;


