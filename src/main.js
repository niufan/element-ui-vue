import {Vue} from '~/vendor'
import index from '~/index'
import router from '~/router'
import store from '~/store'

Vue.config.devtools = true;
new Vue({
    router, // router 大小写敏感
    store,
    render: h => h(index)
}).$mount('#app');
