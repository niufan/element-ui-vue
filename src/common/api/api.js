class Api {
    constructor({name, uri = '/' + name, server = '/api'} = {name: 'demo'}) {
        this._name = name;
        this._uri = uri;
        this._server = server;
    }

    getName() {
        return this._name;
    }

    getUri() {
        return this._uri;
    }

    getUrl() {
        return this._server + this._uri;
    }

    getServer() {
        return this._server;
    }
}

export default Api;