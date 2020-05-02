import './index.scss';
const Index = {
    props:["content"],
    mounted() {
        $("#readcontent").html(this.content)   
    },
    methods:{
        changeContent(content){
            $("#readcontent").html(content);
        }
    },
    render() {
        return <div class="book-body">
            <div class="content">
                <div class="read-filed">
                    <div class="atical" id="readcontent"></div>
                </div>
            </div >
        </div >
    }
};
export default Index;


