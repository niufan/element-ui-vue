import RestApi from "~/common/api/rest-api";

class AscRestApi extends RestApi {
    constructor({name, uri, server = '/api/asc'} = {name: '/demo'}) {
        super({name, uri, server});
    }
}

export default AscRestApi;