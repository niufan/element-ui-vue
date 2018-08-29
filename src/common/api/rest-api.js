import Api from "./api";
import Ajax from "~/common/ajax";

class RestApi extends Api {
    constructor({name, uri, server}) {
        super({name, uri, server});
    }

    page(data) {
        return Ajax({'method': 'post', 'url': [this.getUrl(), 'page'].join('/'), 'data': data});
    }

    list(data) {
        return Ajax({'method': 'post', 'url': [this.getUrl(), 'list'].join('/'), 'data': data});
    }

    add(data) {
        return Ajax({'method': 'post', 'url': this.getUrl(), 'data': data});
    }

    update(data) {
        return Ajax({'method': 'put', 'url': this.getUrl(), 'data': data});
    }

    merge(data) {
        return Ajax({'method': 'patch', 'url': this.getUrl(), 'data': data});
    }
}
export default RestApi;