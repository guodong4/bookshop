import './index.scss';
import { Button, Input, Table, message } from 'ant-design-vue';
import SearchBar from "@/components/SearchBar";
import SetUser from "./set-user";
import SetRule from "./set-rule";
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
        onSearch(value) {
            this.getData({
                ...this.option,
                ...value
            });
        },
        getData(option) {
            this.option = option;
            $ajax({
                url: "/user/findAll",
                data: option
            }).then(data => {
                this.dataSource = data.rows;
                this.option.page = data.page;
                this.option.pageSize = data.pageSize;
            })
        },
        reset() {
            this.getData({
                page: 1,
                pageSize: 10
            });
        },
        addUser() {
            this.$refs.setuser.$children[0].show();
        },
        updateUser(id){
            this.$refs.setuser.$children[0].show(id);
        },
        setRule(id){
            this.$refs.setrule.show(id);
        },
        delete(id){
            $ajax({
                url: "/user/delete",
                data: {
                    id
                }
            }).then(data => {
                message.success(data.msg);
                this.reset();
            })
        }
    },
    render() {
        var option = [
            {
                name: "username",
                label: "账号",
                components: <Input />
            }, {
                name: "telphone",
                label: "手机号",
                components: <Input />
            }
        ];
        const columns = [
            {
                title: '序号',
                dataIndex: 'xh',
                customRender: (text, record, index) => {
                    return index + 1
                }
            },
            {
                title: '图书名称',
                dataIndex: 'book_name'
            },
            {
                title: '图书描述',
                dataIndex: 'book_desc'
            },
            {
                title: '现价',
                dataIndex: 'book_price'
            },
            {
                title: '原价',
                dataIndex: 'book_old_price'
            },
            {
                title: '封皮图',
                dataIndex: 'book_img'
            },
            {
                title: '作者',
                dataIndex: 'book_author'
            },
            {
                title: '出版社',
                dataIndex: 'book_press'
            },
            {
                title: '库存',
                dataIndex: 'book_stock'
            },
            {
                title: '出版时间',
                dataIndex: 'book_press_time'
            },
            {
                title: '商品编号',
                dataIndex: 'book_code'
            },
            {
                title: '图书类别',
                dataIndex: 'book_type'
            },
            {
                title: '备注',
                dataIndex: 'book_remarks'
            },
            {
                title: '上下架',
                dataIndex: 'book_status'
            },
            {
                title: '发布时间',
                dataIndex: 'book_publish_time'
            },
            {
                title: '操作',
                dataIndex: 'id',
                width: "300px",
                customRender: (text, record, index) => {
                    return <span>
                        <button class="custom-btn-blue custom-btn-small" onClick={this.updateUser.bind(this,record.id)}>编辑</button>
                        <button class="custom-btn-green custom-btn-small" onClick={this.setRule.bind(this,record.id)}>分配权限</button>
                        <button class="custom-btn-red custom-btn-small" onClick={this.delete.bind(this,record.id)}>注销</button>
                    </span>
                }
            },
        ];
        return <div>
            <SearchBar option={option} search={this.onSearch} reset={this.reset} customBtn={[
                <Button type="primary" style="margin-left:8px" onClick={this.addUser}>新增</Button>
            ]} />
            <Table dataSource={this.dataSource} bordered columns={columns} style="padding:10px;" rowKey={record => record.id} />
            <SetUser ref="setuser" reload={this.reset}/>
            <SetRule ref="setrule"/>
        </div>
    }
};
export default Index;


