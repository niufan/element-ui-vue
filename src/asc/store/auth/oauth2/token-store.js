import {Cookies} from '~/vendor';
import {Utils} from "~/common/util";

const TOKEN_STORE_KEY = 'token';
const TokenStore = {

    setToken(token) {
        Cookies.set(TOKEN_STORE_KEY, JSON.stringify(token), {expires: token['expires_in'], secure: false}); // secure : true 表示只有https才起作用
    },

    getToken() {
        let token = Cookies.get(TOKEN_STORE_KEY);
        if (!Utils.isEmpty(token)) {
            token = JSON.parse(token);
        }
        return token;
    }
};

export default TokenStore;