import Ajax from '~/common/ajax';
import AscApi from '../../asc-api';
import {qs} from '~/vendor'

const OAuth2Api = new AscApi({name: 'oauth2', uri: '/oauth'});
OAuth2Api.login = function({username, password, scope = 'web', grant_type = 'password'}) {
    return Ajax({
        url: [this.getUrl(), 'token'].join('/'),
        method: 'post',
        headers: {'Authorization': 'Basic dGVzdDoxMjM0NTY='},
        data: qs.stringify({
            username: username,
            password: password,
            scope: scope,
            grant_type: grant_type,
        })
    });
};
OAuth2Api.refreshToken = function({refresh_token, grant_type = 'refresh_token'}) {
    return Ajax({
        url: [this.getUrl(), 'token'].join('/'),
        method: 'post',
        data: qs.stringify({
            refresh_token: refresh_token,
            grant_type: grant_type,
        })
    });
};
export default OAuth2Api;