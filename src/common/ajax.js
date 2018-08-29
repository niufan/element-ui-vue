import {axios, ElementUI} from '~/vendor'
import router from '~/router'
import store from '~/store'
import TokenStore from '~/asc/store/auth/oauth2/token-store';
import {Utils} from '~/common/util/index'

// 超时设置
const ajax = axios.create({
    timeout: 5000 // 请求超时时间
});

class Request {
    constructor(config) {
        this._config = config;
        this._times = 0;
    }

    plus() {
        this._times++;
    }

    minus() {
        this._times--;
    }

    getConfig() {
        return this._config;
    }

    getTimes() {
        return this._times;
    }
}

class RequestHelper {
    constructor() {
        this.map = new Map();
    }

    static getKey(config) {
        return config.method + ' ' + config.url;
    }

    canCancelled(config) {
        let key = RequestHelper.getKey(config), request = this.map.has(key) ? this.map.get(key) : new Request(config);
        request.plus();
        this.map.set(key, request);
        return request.getTimes() > 1;
    }

    canRemoved(config, removed) {
        let key = RequestHelper.getKey(config), request = this.map.has(key) ? this.map.get(key) : new Request(config);
        request.minus();
        this.map.set(key, request);
        return removed || request.getTimes() <= 0;
    }

    /**
     * 一、正常返回，强制移除（removed = true）
     * 二、错误返回，按次移除（）
     * @param config
     * @param removed
     */
    remove(config, removed = false) {
        if (this.canRemoved(config, removed)) {
            this.map.delete(RequestHelper.getKey(config));
        }
    }
}

let requestHelper = new RequestHelper();

// baseURL
// axios.defaults.baseURL = 'https://api.github.com';

// http request 拦截器
// 每次请求都为http头增加authorization字段，其内容为token
ajax.interceptors.request.use(
    config => {
        console.log(Utils.format() + ' 请求：', config);
        // debugger
        let cancelTokenSource = axios.CancelToken.source();
        config.cancelToken = cancelTokenSource.token;
        let token = TokenStore.getToken();
        if (!Utils.isEmpty(token)) {
            config.headers.authorization = token.getAuthorization();
        }
        if (requestHelper.canCancelled(config)) {
            cancelTokenSource.cancel(config);
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
// 针对响应代码确认跳转到对应页面
ajax.interceptors.response.use(
    response => {
        requestHelper.remove(response.config, true);
        return Promise.resolve(response.data)
    },
    error => {
        // debugger
        if (axios.isCancel(error)) {
            requestHelper.remove(error.message);
        } else {
            requestHelper.remove(error.config, true);
        }
        if (error.response) {
            // 如果有返回，即请求已经正常发出
            switch (error.response.status) {
                case 400:
                    ElementUI.Message({
                        message: `${error.response.status}` + `${error.response.data}`,
                        type: 'error'
                    });
                    break;
                case 401:
                    let config = error.config;
                    if (!config.isRetryRequest) {
                        return store.dispatch("oauth2/refreshToken").then((res) => {
                            let token = TokenStore.getToken();
                            if (!Utils.isEmpty(token)) {
                                config.isRetryRequest = true;
                                config.baseURL = '';
                                config.headers.Authorization = token.getAccessToken();
                                return axios(config);
                            }
                        }).catch(function() {
                            store.dispatch('oauth2/logout');
                            router.replace({
                                path: 'login',
                                query: {redirect: router.currentRoute.fullPath}
                            });
                            throw error;
                        });
                    }
                    break;
                case 403:
                    router.push('/error/403');
                    break;
                case 404:
                    router.push('/error/404');
                    break;
                case 500:
                    router.push('/error/500');
                    break;
                default:
                    ElementUI.Message({
                        message: `服务器错误！错误代码：${error.response.status}`,
                        type: 'info'
                    })
            }
        }
        return Promise.reject(error);
    }
);

export default ajax;