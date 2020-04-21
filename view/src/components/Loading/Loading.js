import { Icon } from 'ant-design-vue';
import $ from "jquery";
import './index.scss';
var timeout="";
function Loading(b) {
    var loading = `<div class="_loading">
        <div class="content">加载中<span class="point"> . . . .</span></div>
    </div>`;
    if (b) {
        $("body").append($(loading));
        var num=4;
        a(num)
    }else{
        clearTimeout(timeout);
        $("._loading").remove();
    }
}
function a(num){
    var l=[" "," ."," . ."," . . ."," . . . ."];
    timeout = setTimeout(function(){
        if(num==5)num=0;
        $("._loading").find(".point").html(l[num]);
        num++;
        a(num);
    }, 300);
}
export default Loading;  