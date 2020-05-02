import { Button, Input, Table, message } from 'ant-design-vue';
import SearchBar from "@/components/SearchBar";
import moment from "moment";
const Index = {
    data() {
        return {
            dataSource: [],
            option: {
                page: 1,
                pageSize: 10,
                total:0
            },
        };
    },
    mounted() {
        this.getData(this.option);
    },
    methods: {
        onSearch(value) {
            this.getData({
                ...this.option,
                ...value
            });
        },
        getData(option) {
            this.option = option;
            $ajax({
                url: "/member/findAll",
                data: option
            }).then(data => {
                this.dataSource = data.rows;
                this.option.page = data.page;
                this.option.pageSize = data.pageSize;
                this.option.total = data.count;
            })
        },
        reset() {
            this.dataSource=[];
            this.getData({
                page: 1,
                pageSize: 10
            });
        },
        updateState(record){
            $ajax({
                url: "/member/update",
                data: {
                    status:record.status==0?1:0,
                    id:record.id
                }
            }).then(data => {
               this.getData(this.option)
            })
        }
    },
    render() {
        var option = [
           {
                name: "telphone",
                label: "手机号",
                components: <Input />
            }
        ];
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                customRender: (text, record, index) => {
                    return index + 1
                }
            },
            {
                title: '昵称',
                dataIndex: 'nickname'
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                customRender: (text, record, index) => {
                    return text?moment(text).format('YYYY-MM-DD'):"";
                }
            },
            {
                title: '电话',
                dataIndex: 'telphone'
            },
            {
                title: '身份证',
                dataIndex: 'idcard'
            },
            {
                title: '操作',
                dataIndex: 'op',
                width: "300px",
                customRender: (text, record, index) => {
                    return <span>
                        {
                            record.status==0?<button class="custom-btn-green custom-btn-small" onClick={this.updateState.bind(this,record)}>封号</button>:
                            <button class="custom-btn-red custom-btn-small" onClick={this.updateState.bind(this,record)}>解封</button>
                        }
                        
                    </span>
                }
            },
        ];
        return <div>
            <SearchBar option={option} search={this.onSearch} reset={this.reset} />
            <Table dataSource={this.dataSource} bordered columns={columns} style="padding:10px;" rowKey={record => record.id} />
        </div>
    }
};
export default Index;


