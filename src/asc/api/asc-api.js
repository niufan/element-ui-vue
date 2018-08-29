import Api from '~/common/api/api';

class AscApi extends Api{
    constructor({name, uri, server = '/api/asc'} = {name: 'demo'}) {
        super({name, uri, server});
    }
}

export default AscApi;