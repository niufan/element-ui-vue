class WhiteList {
    constructor(paths) {
        this._paths = paths;
    }

    in(path) {
        return this._paths.indexOf(path) !== -1;
    }
}

let whiteList = new WhiteList([
    '/login'
]);

export default whiteList;