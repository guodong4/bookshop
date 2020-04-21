import './index.scss';
import { Layout, Menu, Icon, Form, Row, Col, Input, Button } from 'ant-design-vue';
import { relativeTimeThreshold } from 'moment';
const Index = {
    props:["option","search","reset","customBtn"],
    data() {
        return {

        };
    },
    mounted() {

    },
    methods: {
        getFields() {
            const { getFieldDecorator } = this.form;
            return this.option.map((arr,index)=>{
                return <Col span={8} key={index} style={{ display:"block"}}>
                        <Form.Item label={arr.label}>
                            {getFieldDecorator(arr.name)(arr.components)}
                        </Form.Item>
                    </Col>
            });
        },
        handleSearch(e){
            e.preventDefault();
            var _this = this;
            this.form.validateFields((err, onSearch) => {
                if(!err){
                    _this.search(onSearch);
                }
            });
        },
        handleReset (){
            this.reset()
        }
    },
    render() {
        return <div style="margin:10px" class="searchbar">
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} class="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={24}>{this.getFields()}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button style="margin-left:8px" onClick={this.handleReset}>
                            清除筛选
                        </Button>
                        {
                            this.customBtn
                        }
                    </Col>
                </Row>
            </Form>
        </div>
    }
};
const form = Form.create()(Index);
export default form;


