import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import './assets/index.scss';
import $ from "jquery";
Vue.use(Antd)
window.$ = $;
import Loading from '@/components/Loading/Loading';
window.Loading = Loading;
import host from "@/utils/getHost";
window.host = host;

import $ajax from "@/utils/ajax";
window.$ajax = $ajax;
Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#root');


