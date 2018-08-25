import {Cookies} from '~/vendor'

const authToken = {
    // 当Token超时后采取何种策略
    // jumpAuthPage  每次请求时判断Token是否超时，若超时则跳转到授权页面
    // getNewToken  每次请求时判断Token是否超时，若超时则获取新Token (推荐)
    tokenTimeoutMethod: 'getNewToken',

    // 在Cookie中记录登录状态的key
    loginKey: 'isLogin',
    tokenKey: 'token',

    /**
     * TOKEN 是否有效
     * @returns {boolean}
     */
    hasToken: function(){
        return Cookies.get(this.tokenKey) !== undefined;
    },

    // 当前是否是登录状态
    isLogin: function(){
        return Cookies.get(this.loginKey);
    },

    /**
     * 设置TOKEN
     * @param token 令牌
     * @param expires 过期日期
     */
    setToken: function(token, expires){
        expires = expires || new Date(new Date().getTime() + 30 * 1000);
        Cookies.set(this.tokenKey, token, {expires: expires});
    },

    // 设置登录状态
    setLoginStatus: function(){
        // TODO: 设置超时登录时间，在该时间范围内没有任何请求操作则自动删除
        console.log("登录状态最长时间更新");
        let maxAge = new Date(new Date().getTime() + 30 * 60 * 1000);
        Cookies.set(this.loginKey, 'true', {
            expires: maxAge
        });
    },

    // 移除Token
    removeToken: function(){
        Cookies.remove(this.tokenKey);
    },

    // 移除登录状态
    removeLoginStatus: function(){
        Cookies.remove(this.loginKey);
    }
};
const DEFAULT_TOKEN_KEY = 'Authorization';
class AuthToken {

    constructor(refresh = true) {
        this.refresh = refresh;
    }

    /**
     * 获取 TOKEN
     * @returns {*}
     */
    static get() {
        return Cookies.get(DEFAULT_TOKEN_KEY);
    }

    /**
     * 设置 TOKEN
     * @param token 令牌
     * @param expires 过期日期
     */
    static set(token, expires) {
        Cookies.set(DEFAULT_TOKEN_KEY, token, {expires: expires});
    }

    /**
     * 是否已经有令牌了
     * @returns {boolean}
     */
    static has() {
        return Cookies.get(DEFAULT_TOKEN_KEY) !== null;
    }

    /**
     * TOKEN 是否有效
     * @returns {boolean}
     */
    isValid() {
        return this.get() !== undefined;
    }

    isLogin() {
        if (this.has()) {
            if (!this.isValid()) {

            }
        }
    }
}

export default authToken;