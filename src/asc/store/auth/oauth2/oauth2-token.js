class Oauth2Token {
    constructor({token_type = 'bearer', access_token, refresh_token}) {
        this._tokenType = token_type;
        this._accessToken = access_token;
        this._refreshToken = refresh_token;
    }
    getTokenType() {
        return this._tokenType;
    }
    getAccessToken() {
        return this._accessToken;
    }
    getRefreshToken() {
        return this._refreshToken;
    }
    getAuthorization() {
        return this._tokenType.substring(0, 1).toUpperCase() + this.getTokenType().substring(1).toLowerCase()
            + ' ' + this._accessToken;
    }
}

export default Oauth2Token;