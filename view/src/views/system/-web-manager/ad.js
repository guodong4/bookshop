import './index.scss';
import { Button, Input, Table, message, Switch,Icon,Popover } from 'ant-design-vue';
import SetAds from "./set-ads";
const Index = {
    data() {
        return {
            dataSource: [],
            option: {
                page: 1,
                pageSize: 10
            },
        };
    },
    mounted() {
        this.getData(this.option);
    },
    methods: {
        getData(option) {
            this.option = option;
            $ajax({
                url: "/ads/findAll",
                data: option
            }).then(data => {
                this.dataSource = data.rows;
                this.option.page = data.page;
                this.option.pageSize = data.pageSize;
            })
        },
        reset() {
            this.dataSource = [];
            this.getData({
                page: 1,
                pageSize: 10
            });
        },
        add() {
            this.$refs.setads.$children[0].show();
        },
        delete(id) {
            $ajax({
                url: "/ads/delete",
                data: {
                    id
                }
            }).then(data => {
                message.success(data.msg);
                this.reset();
            })
        },
        update(id){
            this.$refs.setads.$children[0].show(id);
        },
        changeStatus(id,status){
            $ajax({
                url:"/ads/update",
                data:{
                    status:status==1?0:1,
                    id
                }
            }).then(data=>{
                if(data.code==1){
                    this.getData(this.option);
                }
            })
        }
    },
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'xh',
                width:"70px",
                customRender: (text, record, index) => {
                    return index + 1
                }
            },
            {
                title: '广告描述',
                dataIndex: 'desc'
            },
            {
                title: '广告链接',
                dataIndex: 'url'
            },
            {
                title: '广告图',
                dataIndex: 'img_path',
                customRender: (text, record, index) => {
                    return <Popover content={
                        <img src={host+"/"+text}  style="max-height:300px;max-width:300px"/>
                    }><img src={host+"/"+text} width="40px" style="max-height:40px"/></Popover>
                }
            },
            {
                title: '上下架',
                dataIndex: 'status',
                customRender: (text, record, index) => {
                    return <Switch checkedChildren="上架" unCheckedChildren="下架" checked={text == 1} onChange={this.changeStatus.bind(this,record.id,text )} />
                }
            },
            {
                title: '广告位',
                dataIndex: 'status',
                customRender: (text, record, index) => {
                    return text==1?"长条图位":"小图广告位"
                }
            },
            {
                title: '操作',
                dataIndex: 'id',
                width:"300px",
                customRender: (text, record, index) => {
                    return <span>
                        <button class="custom-btn-blue custom-btn-small" onClick={this.update.bind(this, record.id)}>编辑</button>
                        <button class="custom-btn-red custom-btn-small" onClick={this.delete.bind(this, record.id)}>删除</button>
                    </span>
                }
            },
        ];
        return <div>
            <Button type="primary" style="margin-left:8px;margin-top:10px;" onClick={this.add}>新增</Button>
            <Table dataSource={this.dataSource} bordered columns={columns} style="padding:10px;" rowKey={record => record.id} />
            <SetAds ref="setads" reload={this.reset}/>
        </div>
    }
};
export default Index;


