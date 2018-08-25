import {Vuex} from '~/vendor'

import states from './states'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

export default new Vuex.Store({
    states,
    mutations,
    actions,
    modules: modules
})