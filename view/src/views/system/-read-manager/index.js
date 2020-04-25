import { Button, Input, Table, message, Switch, Icon, Popover } from 'ant-design-vue';
import SearchBar from "@/components/SearchBar";
import SetBook from "./set-read";
import SetChatper from "./set-chapter";
import moment from 'moment';
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
                url: "/read/findAll",
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
        addBook() {
            this.$refs.setbook.$children[0].show();
        },
        updateBook(id) {
            this.$refs.setbook.$children[0].show(id);
        },
        delete(id) {
            if(confirm("删除后不可恢复，确定删除？")){
                $ajax({
                    url: "/read/delete",
                    data: {
                        id
                    }
                }).then(data => {
                    message.success(data.msg);
                    this.reset();
                })
            }
        },
        changeStatus(id, status) {
            $ajax({
                url: "/read/update",
                data: {
                    status: status == 1 ? 0 : 1,
                    id
                }
            }).then(data => {
                if (data.code == 1) {
                    this.getData(this.option);
                }
            })
        },
        upload(id) {
            this.$refs.uploadimg.show(id);
        },
        chapter(id){
            this.$refs.setchapter.show(id);
        },
        changePage(page, pageSize){
            this.option.page = page;
            this.option.pageSize = pageSize;
            this.getData(this.option);
        }
    },
    render() {
        var option = [
            {
                name: "title",
                label: "电子书名称",
                components: <Input />
            }, {
                name: "author",
                label: "作者",
                components: <Input />
            }
        ];
        const columns = [
            {
                title: '序号',
                dataIndex: 'xh',
                customRender: (text, record, index) => {
                    return index+1
                }
            },
            {
                title: '电子书名称',
                dataIndex: 'title'
            },
            {
                title: '电子书简介',
                dataIndex: 'desc',
                width:300,
                customRender: (text, record, index) => {
                    return <Popover content={text}>{text.substring(0, 15)}...</Popover>
                }
            },
            {
                title: '作者',
                dataIndex: 'author',
            },
            {
                title: '封皮图',
                dataIndex: 'book_img',
                customRender: (text, record, index) => {
                    return <Popover content={
                        <img src={host + "/" + text} style="max-height:300px;max-width:300px" />
                    }><img src={host + "/" + text} width="40px" style="max-height:40px" /></Popover>
                }
            },
            {
                title: '出版时间',
                dataIndex: 'publish_time',
                customRender: (text, record, index) => {
                    return moment(text).format('YYYY-MM-DD');
                }
            },
            {
                title: '点击量',
                dataIndex: 'read_num'
            },
            {
                title: '类型',
                dataIndex: 'type',
                customRender: (text, record, index) => {
                    return text==0?"游客":"会员"
                }
            },
            {
                title: '上下架',
                dataIndex: 'status',
                customRender: (text, record, index) => {
                    return <Switch checkedChildren="上架" unCheckedChildren="下架" checked={text == 1} onChange={this.changeStatus.bind(this, record.id, text)} />
                }
            },
            {
                title: '操作',
                dataIndex: 'op',
                width: "300px",
                customRender: (text, record, index) => {
                    return <span>
                        <button class="custom-btn-green custom-btn-small" onClick={this.updateBook.bind(this, record.id)}>编辑</button>
                        <button class="custom-btn-blue custom-btn-small" onClick={this.chapter.bind(this, record.id)}>章节</button>
                        <button class="custom-btn-red custom-btn-small" onClick={this.delete.bind(this, record.id)}>删除</button>
                    </span>
                }
            },
        ];
        return <div>
            <SearchBar option={option} search={this.onSearch} reset={this.reset} customBtn={[
                <Button type="primary" style="margin-left:8px" onClick={this.addBook}>新增</Button>
            ]} />
            <Table dataSource={this.dataSource} bordered columns={columns} style="padding:10px;" rowKey={record => record.id} scroll={{ x: 1500 }} pagination={{
                    ...this.option,
                    onChange: this.changePage
                }}/>
            <SetBook ref="setbook" reload={this.reset} />
            <SetChatper ref="setchapter" reload={this.reset} />
        </div>
    }
};
export default Index;


