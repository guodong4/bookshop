import './index.scss';
const Index = {
    props: ["tags", "closeTag", "closeFn", "clickFn", "value", "label", "addBtn"],
    data() {
        return {
            thisTags: this.tags,
            clickIndex:0
        };
    },
    methods: {
        changeTags(tags) {
            this.thisTags = tags;
        },
        close(index) {
            if (this.closeFn && typeof this.closeFn == "function") {
                if(!this.thisTags[index][this.value]){
                    this.thisTags.splice(index, 1);
                }else{
                    this.closeFn(this.thisTags[index]);
                }
                
            }
        },
        clickTag(arr,index){
            this.clickIndex = index;
            this.clickFn ? 
            this.clickFn(arr) :
            () => { }
        }
    },
    watch: {
        tags(newVal, oldVal) {
            this.thisTags = newVal;
            if(this.closeTag){
                this.clickIndex=this.thisTags.length-1;
            }
            this.$forceUpdate();
        }
    },
    render() {
        return <ul class="taglab">
            {
                this.thisTags ? this.thisTags.map((arr, index) => {
                    return <li class={this.clickFn?this.clickIndex==index?"clickBtn active":"clickBtn":""} key={index}>
                        <div class="tag" title={
                            this.label ? arr[this.label] : arr
                        } onClick={this.clickTag.bind(this,arr,index)}>{
                            this.label ? arr[this.label] : index+1
                        }</div>
                        {
                            this.closeTag ? <div class="close" onClick={this.close.bind(this, index)}>×</div> : ""
                        }
                    </li>
                }) : null
            }
            {
                this.addBtn ? 
                <li style="border:0px">
                    {
                        <div style="float:left;height:30px;line-height:34px;">
                            {
                               this.addBtn 
                            }
                        </div>
                    }
                </li> : ""
            }
        </ul>
    }
};
export default Index;


