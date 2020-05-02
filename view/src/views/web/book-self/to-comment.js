import './index.scss';
import {  Input, Menu, message, Modal,  Select,Rate  } from 'ant-design-vue';
const { TextArea } = Input;
import moment from 'moment';
const { SubMenu } = Menu;

const { Option } = Select;
const Index = {
    props: ["reload"],
    data() {
        return {
            showAdd: false,
            rate:0,
            comment:"",
            member:{},
            order_id:"",
            book_id:"",
            book_name:""
        };
    },
    mounted() {
        this.member = localStorage.getItem("member");
        this.member = JSON.parse(this.member);
    },
    methods: {
        show(order_id,book_id,book_name) {
            this.order_id=order_id;
            this.book_id=book_id;
            this.showAdd = true;
            this.book_name = book_name;
        },
        handleOk() {
            $ajax({
                url: "/comment/save",
                data: {
                    comment_member_id:this.member.id,
                    comment_member_name:this.member.nickname,
                    comment_order_id:this.order_id,
                    comment_book_id:this.book_id,
                    comment_star:this.rate,
                    comment_replay:"",
                    comment_book_name:this.book_name,
                    comment:this.comment
                }
            }).then(data => {
                this.handleCancel()
                message.success(data.msg);
                this.reload();
            })
        },

        handleCancel() {
            this.rate=0,
            this.comment="",
            this.member={},
            this.order_id="",
            this.book_id="",
            this.book_name="";
            this.showAdd= false;
        },
        changeRate(num){
             this.rate = num;
        },
        changeComment(e){
            this.comment = e.target.value;
        }
    },
    render() {
        return <Modal
            title={<Rate onChange={this.changeRate} value={this.rate}/>}
            visible={this.showAdd}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确定"
            width="40%"
        >
          <TextArea rows={4} onInput={this.changeComment} value={this.comment}/>
        </Modal>
    }
};
export default Index;


