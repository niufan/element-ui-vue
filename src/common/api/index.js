import Ajax from '~/common/ajax'

class Resource {
    constructor(name, uri = '/' + name) {
        this._name = name;
        this._uri = uri;
    }

    getName() {
        return this._name;
    }

    getUri() {
        return this._uri;
    }
}

class OAuthResource extends Resource {
    constructor(name = 'oauth', uri = '/' + name) {
        super(name, uri);
    }
}

class OAuth2Resource extends OAuthResource {
    constructor(name = 'oauth2', uri = '/oauth') {
        super(name, uri);
    }

    login({username, password, scope = 'web', grant_type = 'password'}) {
        return Ajax({
            url: [this.getUri(), 'token'].join('/'),
            method: 'post',
            data: JSON.stringify({
                username: username,
                password: password,
                scope: scope,
                grant_type: grant_type,
            })
        });
    }

    refreshToken({refresh_token, grant_type = 'refresh_token'}) {
        return Ajax({
            url: [this.getUri(), 'token'].join('/'),
            method: 'post',
            data: JSON.stringify({
                refresh_token: refresh_token,
                grant_type: grant_type,
            })
        });
    }
}

class RestResource extends Resource {
    constructor(name, uri = '/' + name) {
        super(name, uri);
    }

    page(data) {
        return Ajax({'method': 'post', 'url': [this.getUri(), 'page'].join('/'), 'data': data});
    }

    list(data) {
        return Ajax({'method': 'post', 'url': [this.getUri(), 'list'].join('/'), 'data': data});
    }

    add(data) {
        return Ajax({'method': 'post', 'url': this.getUri(), 'data': data});
    }

    update(data) {
        return Ajax({'method': 'put', 'url': this.getUri(), 'data': data});
    }

    merge(data) {
        return Ajax({'method': 'patch', 'url': this.getUri(), 'data': data});
    }
}

let Api = {}, oAuthResource = new OAuth2Resource();
Api[oAuthResource.getName()] = oAuthResource;

['user', 'resource', 'sss']
    .forEach(function(name) {
        let restResource = new RestResource(name);
        Api[restResource.getName()] = restResource;
    });
for (let key in Api) {
    if (Api.hasOwnProperty(key)) {
        console.log(Api[key]);
    }
}

export default Api;