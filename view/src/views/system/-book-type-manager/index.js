import './index.scss';
import { Button, Input, Table, message } from 'ant-design-vue';
import SetType from "./set-type";
const Index = {
    data() {
        return {
            dataSource: [],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            $ajax({
                url: "/bookType/findAll",
            }).then(data => {
                var parentArr = data.filter(arr => arr.parent == null);
                parentArr.map(arr => {
                    this.dataSource.push({
                        id: arr.id,
                        type1: arr.type,
                        type2: ""
                    })
                    data.map(item => {
                        if (item.parent == arr.id) {
                            this.dataSource.push({
                                id: item.id,
                                type1: "",
                                type2: item.type
                            })
                        }
                    })
                })
            })
        },
        reset() {
            this.dataSource=[];
            this.getData();
        },
        addType() {
            this.$refs.settype.$children[0].show();
        },
        update(id) {
            this.$refs.settype.$children[0].show(id);
        },
        addChild(id) {
            this.$refs.settype.$children[0].show(id, "addChild");
        }
    },
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                customRender: (text, record, index) => {
                    return index + 1
                }
            },
            {
                title: '一级类别',
                dataIndex: 'type1'
            },
            {
                title: '二级类别',
                dataIndex: 'type2'
            },
            {
                title: '操作',
                dataIndex: 'op',
                width: "300px",
                customRender: (text, record, index) => {
                    return <span>
                        {
                            record.type2 == "" ? <button class="custom-btn-green custom-btn-small" onClick={this.addChild.bind(this, record.id)}>添加二级分类</button> : ""
                        }
                        <button class="custom-btn-blue custom-btn-small" onClick={this.update.bind(this, record.id)}>编辑</button>
                    </span>
                }
            },
        ];
        return <div>
            <Button type="primary" style="margin-left:8px;margin-top:10px;" onClick={this.addType}>新增</Button>
            <Table dataSource={this.dataSource} bordered columns={columns} style="padding:8px;" rowKey={record => record.id} pagination={false} />
            <SetType ref="settype" reload={this.reset} />
        </div>
    }
};
export default Index;


