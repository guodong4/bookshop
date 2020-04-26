import { Button, Input, Table, message, Select, Rate, Popover } from 'ant-design-vue';
const { Option } = Select;
import SearchBar from "@/components/SearchBar";
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
        getData(option) {
            this.option = option;
            $ajax({
                url: "/comment/findAll",
                data: option
            }).then(data => {
                this.dataSource = data.rows.map(arr=>{
                    arr.show=false;
                    return arr;
                });
                this.option.page = data.page;
                this.option.pageSize = data.pageSize;
            })
        },
        changeInput(item,e) {
            item.comment_replay =  e.target.value;
        },
        replay(record){
            record.show=true;
        },
        submit(item) {
            $ajax({
                url: "/comment/replay",
                data: {
                    comment_replay:item.comment_replay,
                    id:item.id
                }
            }).then(data => {
                message.success(data.msg);
                this.getData(this.option);
                item.showChapter = false;
            })
        },
        changePage(page, pageSize){
            this.option.page = page;
            this.option.pageSize = pageSize;
            this.getData(this.option);
        }
    },
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'xh',
                customRender: (text, record, index) => {
                    return index+1
                }
            },
            {
                title: '商品名称',
                dataIndex: 'comment_book_name'
            },
            {
                title: '评论内容',
                dataIndex: 'comment',
                width: "250px",
                customRender: (text, record, index) => {
                    return <Popover content={text}>{text.substring(0, 15)}...</Popover>
                }
            },
            {
                title: '评价',
                dataIndex: 'comment_star',
                customRender: (text, record, index) => {
                    return <Rate disabled defaultValue={text} />
                }
            },
            {
                title: '评论者',
                dataIndex: 'comment_member_name',
            },
            {
                title: '评论时间',
                dataIndex: 'comment_time',
            },
            {
                title: '回复',
                dataIndex: 'comment_replay',
            },
            {
                title: '操作',
                dataIndex: 'op',
                width: "300px",
                customRender: (text, record, index) => {
                    return <span>
                            <Popover
                                placement="left"
                                content={
                                    <div style="width:300px">
                                        <div style="text-align:center;width:100%"><Input onInput={this.changeInput.bind(this, record)} value={record.comment_replay} /></div>
                                        <div style="text-align:center;width:100%;margin-top:20px">
                                            <Button type="primary" onClick={this.getData.bind(this,this.option)}>关闭</Button>&nbsp;&nbsp;
                                            <Button type="primary" onClick={this.submit.bind(this, record)}>提交</Button></div>
                                    </div>
                                }
                                title="回复"
                                trigger="click"
                                visible={record.show}
                            >
                                <Button type="primary" class="custom-btn-blue custom-btn-small" onClick={this.replay.bind(this, record)}>回复</Button>
                            </Popover>
                    </span>
                }
            },
        ];
        return <div>
            <Table dataSource={this.dataSource} bordered columns={columns} style="padding:10px;" rowKey={record => record.id} pagination={{
                    ...this.option,
                    onChange: this.changePage
                }}/>
            {/* <SetBook ref="setbook" reload={this.reset} /> */}
        </div>
    }
};
export default Index;


