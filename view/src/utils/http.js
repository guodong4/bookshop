import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import { message, notification, Modal } from 'ant-design-vue';
import cookieManager from "@/utils/cookie-manager.js";
import { mapActions, mapGetters } from "vuex";



Vue.use(VueAxios, Axios);
const Message = { ...message };


// const testUrl = 'http://127.0.0.1:1034';
// const devUrl = 'http://222.178.152.79:4309';
const devUrl = "http://stitch.vipgz4.idcfengye.com/"
const mockUrL = 'http://rap2api.taobao.org/app/mock/234371';
const baseURL = process.env.NODE_ENV === 'production' ?
    'http://10.255.57.113:10000'  : devUrl;

let token = cookieManager.get("vue_credit") ? cookieManager.get("vue_credit").token : '';
let accessrange = cookieManager.get("vue_credit") ? cookieManager.get("vue_credit").accessrange : '';
//axios全局通用配置,
const baseConfig = {
    baseURL: baseURL,
    timeout: 50 * 1000,
    // 是否跨站点访问控制请求
    withCredentials: false,
    /*transformRequest: (data, header) => {
      console.log(`data:${JSON.stringify(data)}`);
      data = JSON.stringify(data);
      return data;
    },*/
    headers: {
        token: token,
        accessrange: accessrange,
    },
    /*transformResponse: [(data) => {
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data)
      }
      return data
    }],*/
    /*paramsSerializer: (params) => {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    },*/
    validateStatus: (status) => {
        return status >= 200 && status < 300; // default
    },
    /*proxy: {
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: '',
        password: ''
      },
    }*/
};

//全局Axios通用实例
const instance = Axios.create(baseConfig);

const debug = false;
let adapter = (config) => {
    // console.log(`adapter:config=${JSON.stringify(config)}`);
    // 判断是否存在mock数据
    // let has = config.url.includes('mock');
    // 调用默认请求接口, 发送正常请求及返回
    if (!debug) {
        // 删除配置中的 adapter, 使用默认值
        delete config.adapter;
        // 通过配置发起请求
        return Axios(config)
    }

    // 模拟服务，返回mock数据
    return new Promise((resolve, reject) => {
        const response = {
            status: 200,
            statusText: 'OK',
            data: { retCode: 3008, message: "relogin", contents: null },
        };

        // 调用响应函数
        resolve(response);
        // reject({error:"mock error"});

    })
};

//debug模式方便调试
if (debug) {
    instance.defaults.adapter = adapter;
}

//全局请求拦截
instance.interceptors.request.use((config) => {
    Message.destroy();
    // console.log(`request:${JSON.stringify(config)}`);
    return config;
},
    (error) => {
        Message.error("请求错误，请检查网络");
        return Promise.reject(error);
    },
);

//全局响应拦截
instance.interceptors.response.use((response) => {
    //http状态码为[200,300)，才会回调响应。
    const { status, data, statusText } = response;
    // console.log(`http response:${JSON.stringify(response)}`);
    if (status === 200) {
        let responseData = data;
        if (responseData.hasOwnProperty("success")) {
            if (responseData.success) {
                return responseData;
            } else {
                return Promise.reject({ msg: responseData.message });
            }
        }
        const { retCode } = responseData;

        if (retCode === 200) {
            return responseData;
        } else if (retCode === 3008) {
            //登录超时
            //清除用户缓存
            Modal.info({
                title: "登录超时",
                content: "登录超时，请重新登录！",
                okText: "知道了",
                onOk: () => {
                    apActions.Logout()
                }
            });
            return Promise.reject({ ...responseData });
        } else {
            //抛出服务端返回的错误信息,业务端按需catch。
            return Promise.reject({ ...responseData });
        }
    } else {
        //http code !=200
        return Promise.reject({ msg: `${statusText}`, code: status })
    }
},
    (error) => {
        // console.error(error);
        return Promise.reject(error);
    },
);

class Http {
    /**
     * axios get 请求封装
     *
     * @param {*} path 接口地址
     * @param {*} params 接口参数？可选 { type:object }
     * @param {*} showMessage showMessage 是否需要显示默认的全局提示，包括成功和失败
     * @param msg
     */
    static get(path, params, { showMessage = true, msg = {} } = {}) {
        return instance.get(path, { params })
            .then(responseData => {
                if (showMessage) {
                    if ("successMsg" in msg) {
                        Message.success(`${msg.successMsg}`)
                    }
                }
                return responseData.contents;
            }).catch(error => {
                this.handleDefaultError(showMessage, msg, error);
                return Promise.reject(error);
            });
    }

    /**
     * axios post 请求封装
     * headers,params,responseType等均在config参数中按需配置。
     *
     * @param {*} path 接口地址
     * @param data
     * @param config 配置内容请查看AxiosRequestConfig
     * @param {*} showMessage 是否需要显示默认的全局提示，包括成功和失败
     * @param msg
     */
    static post(path, data, config = {}, { showMessage = true, msg = {} } = {}) {
        // return instance.post(path, Qs.stringify(data), {})
        return instance.post(path, data, config)
            .then(responseData => {
                if (showMessage) {
                    if ("successMsg" in msg) {
                        Message.success(`${msg.successMsg}`)
                    }
                }
                return responseData.contents;
            }).catch(error => {
                this.handleDefaultError(showMessage, msg, error);
                return Promise.reject(error);
            });
    }

    /**
     * 默认支持get请求，headers,params,responseType等均可以按需配置。
     *
     * @param config 配置内容请查看AxiosRequestConfig
     * @param showMessage
     * @param msg
     * @returns {Promise<AxiosResponse<T> | never>}
     */
    static request(config = {}, { showMessage = true, msg = {} } = {}) {
        const defConfig = { method: 'POST', };
        config = Object.assign(baseConfig, defConfig, config);
        if(config.method.toLowerCase()=="get"){
            if(config.data){
                config.params = config.data;
            }
        }
        return instance.request(config)
            .then(responseData => {
                if (showMessage) {
                    if ("successMsg" in msg) {
                        Message.success(`${msg.successMsg}`)
                    }
                }
                return responseData.contents;
            }).catch(error => {
                this.handleDefaultError(showMessage, msg, error);
                return Promise.reject(error);
            });
    }

    static handleDefaultError(showMessage, msg, error) {
        console.error(error);
        if (error.hasOwnProperty('retCode')) {
            const { retCode } = error;
            if (retCode === 3008) {
                //登录超时不做异常处理
                return;
            }
        }
        if (showMessage) {
            if (msg.hasOwnProperty("errorMsg")) {
                //使用业务调用端自定义的错误提示信息
                Message.error(`${msg.errorMsg}`)
            } else {
                if (error.hasOwnProperty('contents')) {
                    //http通信已经ok，服务端有已知或未知的错误
                    const { contents } = error;
                    if (contents === null || contents === "") {
                        Message.error('服务器错误');
                    } else {
                        Message.error(`${contents}`);
                    }
                } else if (error.hasOwnProperty('msg')) {
                    Message.error('服务器错误');
                } else {
                    Message.error('未知错误');
                }
            }
        }
    }
}


export default Http;
export { Axios, instance };

