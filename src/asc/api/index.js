import auth from './auth'
import {OAuth2Api} from './auth'
import UserApi from './user'

const AscApi = {
    auth: auth,
    user: UserApi
};

export default AscApi;