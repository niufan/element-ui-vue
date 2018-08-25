import {VueRouter} from '~/vendor'
import staticRoutes from './static-routes'

const Router = new VueRouter({
    routes: staticRoutes
});

export default Router;