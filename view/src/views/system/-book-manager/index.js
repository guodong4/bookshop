import './index.scss';
import { Button, Input, Table, message,Switch  } from 'ant-design-vue';
import SearchBar from "@/components/SearchBar";
import SetBook from "./set-book";
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
                url: "/book/findAll",
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
        addBook() {
            this.$refs.setbook.$children[0].show();
        },
        updateBook(id){
            this.$refs.setbook.$children[0].show(id);
        },
        delete(id){
            $ajax({
                url: "/book/delete",
                data: {
                    id
                }
            }).then(data => {
                message.success(data.msg);
                this.reset();
            })
        },
        upload(id){
            
        }
    },
    render() {
        var option = [
            {
                name: "book_name",
                label: "图书名称",
                components: <Input />
            }, {
                name: "book_author",
                label: "作者",
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
                title: '图书简介',
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
                dataIndex: 'book_status',
                customRender: (text, record, index) => {
                    return <Switch checkedChildren="上架" unCheckedChildren="下架" checked={text==1} onChange={onChange} />
                }
            },
            {
                title: '发布时间',
                dataIndex: 'book_publish_time'
            },
            {
                title: '操作',
                dataIndex: 'id',
                customRender: (text, record, index) => {
                    return <span>
                        <button class="custom-btn-blue custom-btn-small" onClick={this.updateBook.bind(this,record.id)}>编辑</button>
                        <button class="custom-btn-blue custom-btn-small" onClick={this.upload.bind(this,record.id)}>图片上传</button>
                        <button class="custom-btn-red custom-btn-small" onClick={this.delete.bind(this,record.id)}>删除</button>
                    </span>
                }
            },
        ];
        return <div>
            <SearchBar option={option} search={this.onSearch} reset={this.reset} customBtn={[
                <Button type="primary" style="margin-left:8px" onClick={this.addBook}>新增</Button>
            ]} />
            <Table dataSource={this.dataSource} bordered columns={columns} style="padding:10px;" rowKey={record => record.id} scroll={{x:1800}}/>
            <SetBook ref="setbook"/>
        </div>
    }
};
export default Index;


