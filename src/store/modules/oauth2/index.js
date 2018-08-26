import Api from "~/common/api"
import Oauth2Token from './oauth2-token'


const state = {
    token: null
};

const MUTATION_SET_TOKEN = 'setToken';

const mutations = {
    [MUTATION_SET_TOKEN]: (state, data) => {
        state.token = new Oauth2Token(data);
    }
};


const actions = {
    /**
     * 登陆
     * @param commit
     * @param username 用户名
     * @param password 密码
     * @returns {Promise }
     */
    login({commit}, {username, password}) {
        return new Promise((resolve) => {
            Api.oauth2.login({username: username, password: password}).then(res => {
                if (res) {
                    commit(MUTATION_SET_TOKEN, res);
                }
                resolve(res)
            })
        });
    },

    // 登出
    logout({commit}) {
        return new Promise((resolve) => {
            commit(MUTATION_SET_TOKEN, null);
            resolve()
        })
    },

    // 获取新Token
    refreshToken({commit, state}){
        return new Promise((resolve) => {
            Api.oauth2.refreshToken({refresh_token: state.token.getRefreshToken()}).then((res) =>{
                commit(MUTATION_SET_TOKEN, res);
                resolve()
            })
        })
    }

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}