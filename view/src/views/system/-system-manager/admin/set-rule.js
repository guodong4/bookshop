import { Input, Table, message, Modal, Checkbox } from 'ant-design-vue';

const Index = {
    props:["reload"],
    data() {
        return {
            showSet: false,
            user: {},
            dataSource:[],
            checkRule:[]
        };
    },
    mounted() {
    },
    methods: {
        show(id) {
            if(id){
                this.getUser(id);
                this.getModule();
            }
            this.showSet = true;
        },
        getUser(id) {
            $ajax({
                url: "/user/findOne",
                data: {id}
            }).then(data => {
                if (data.code == 1) {
                    this.user = data.data;
                    this.checkRule=this.user.systemrule?this.user.systemrule.split(","):[];
                }
            })
        },
        getModule() {
            $ajax({
                url: "/module/findAll"
            }).then(data => {
                if (data.code == 1) {
                    var parentArr = data.data.filter(arr=>arr.parent==null);
                    parentArr.map(arr=>{
                        this.dataSource.push({
                            id:arr.id,
                            one:arr.modulename,
                            two:""
                        })
                        data.data.map(item=>{
                            if(item.parent == arr.id){
                                this.dataSource.push({
                                    id:item.id,
                                    one:"",
                                    two:item.modulename
                                })
                            }
                        })
                    })
                }
            })
        },
        handleOk() {
            $ajax({
                url: "/user/saveRule",
                data: {
                    id:this.user.id,
                    systemrule:this.checkRule.join(",")
                }
            }).then(data => {
                if (data.code == 1) {
                    message.success(data.msg);
                }else{
                    message.error("系统错误");
                }
            })
        },
        handleCancel() {
            this.showSet = false;
            this.user={};
            this.checkRule=[];
            this.dataSource=[];
        },
        changeRule(id,e){
            if(e.target.checked){
                this.checkRule.push(id);
                if(id==1){
                    this.checkRule.push("1-1");
                    this.checkRule.push("1-2");
                    this.checkRule.push("1-3");
                }else if(id==6){
                    this.checkRule.push("6-1");
                    this.checkRule.push("6-2");
                }
            }else{
                if(id==1){
                    this.checkRule = this.checkRule.filter(arr=>arr!=1&&arr!="1-1"&&arr!="1-2"&&arr!="1-3");
                }else if(id==6){
                    this.checkRule = this.checkRule.filter(arr=>arr!=6&&arr!="6-1"&&arr!="6-2");
                }else{
                    this.checkRule = this.checkRule.filter(arr=>arr!=id);
                }
            }
        }
    },
    render() {
        const columns = [
            {
                title: '一级模块',
                dataIndex: 'one',
            },
            {
                title: '二级模块',
                dataIndex: 'two'
            },
            {
                title: '权限',
                dataIndex: 'id',
                customRender: (text, record, index) => {
                    return <Checkbox onChange={this.changeRule.bind(this,record.id)} checked={this.checkRule.indexOf(text)>-1}/>
                }
            },
        ];
        return <Modal
            title="分配权限"
            visible={this.showSet}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确定"
            width="60%"
        >
            <Table dataSource={this.dataSource} bordered columns={columns} style="padding:10px;" rowKey={record => record.id} pagination={false }/>
        </Modal>
    }
};
export default Index;


