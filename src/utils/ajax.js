import {axios, NProgress, ElementUI} from '~/vendor'
import authToken from '~/utils/auth-token'
import router from '~/router'
import store from '~/store'

// 超时设置
const ajax = axios.create({
    timeout: 5000 // 请求超时时间
});

let getTokenLock = false,
    CancelToken = axios.CancelToken,
    requestMap = new Map();

function addRequest(config) {
    let added;
    if (requestMap.has(config.url)) {
        added = false;
    } else {
        added = true;
        requestMap.set(config.url, config);
    }
    return added;
}

function removeRequest(config, milliseconds = 500) {
    if (requestMap.has(config.url)) {
        setTimeout(function(){
            requestMap.delete(config.url);
        }, milliseconds);
    }
}

/**
 * Token校验
 * @param {function} cancel - 中断函数
 * @param {function} callback -  回调
 * @description 校验Token是否过期，如果Token过期则根据配置采用不同方法获取新Token
 *              自动获取Token：过期时自动调用获取Token接口。注意：当有任一请求在获取Token时，其余请求将顺延，直至新Token获取完毕
 *              跳转授权Token：过期时中断当前所有请求并跳转到对应页面获取Token。注意：跳转页面授权最佳实现应在授权页面点击触发
 */
function checkToken(cancel, callback){
    if(!authToken.hasToken()){
        // 自动获取Token
        if(authToken.tokenTimeoutMethod === 'getNewToken'){
            // 如果当前有请求正在获取Token
            if(getTokenLock){
                setTimeout(function(){
                    checkToken(cancel, callback)
                }, 500)
            } else {
                getTokenLock = true;
                store.dispatch("auth/getNewToken").then(() => {
                    console.log("已获取新token");
                    callback();
                    getTokenLock = false
                })
            }
        }
        // 跳转授权Token
        if(authToken.tokenTimeoutMethod === 'jumpauthPage' && authToken.isLogin()){
            if(router.currentRoute.path !== '/auth'){
                // BUG: 无法保证一定会中断所有请求
                cancel();
                router.push('/auth')
            }
        }
    } else {
        callback()
    }
}

// baseURL
// axios.defaults.baseURL = 'https://api.github.com';

// http request 拦截器
// 每次请求都为http头增加authorization字段，其内容为token
ajax.interceptors.request.use(
    config => {
        let _cancel = function(){};
        config.cancelToken = new CancelToken(function executor(cancel) {
            _cancel = cancel;
        });
        checkToken(_cancel, function(){
            authToken.setLoginStatus();
            config.headers.authorization = `${store.state.user.token}`
        });
        if (!addRequest(config)) {
            _cancel(); // 如果没有添加成功，说明该请求已经有了，就取消本次请求
        }
        return config
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
// 针对响应代码确认跳转到对应页面
ajax.interceptors.response.use(
    response => {
        removeRequest(response.config);
        return Promise.resolve(response.data)
    },
    error => {
        if(axios.isCancel(error)){
            return Promise.reject("Ajax Abort: 该请求在axios拦截器中被中断")
        } else if (error.response) {
            removeRequest(error.response.config);
            switch (error.response.status) {
                case 400:
                    ElementUI.Message({
                        message: `${error.response.status}` + `${error.response.data}`,
                        type: 'error'
                    });
                    break;
                case 401:
                    router.push('/error/401');
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
            return Promise.resolve(error.response)
        }
    }
);

export default ajax;