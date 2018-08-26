/**
 * 静态路由
 * 使用懒加载机制
 * @author Fan Niu
 * @since 2018/08/25
 */
const staticRoutes =
    [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/error',
        component: () => import(/* webpackChunkName: 'error' */ '../page/error'),
        children: [
            {
                path: '401',
                component: () => import(/* webpackChunkName: 'error' */ '../page/error/401')
            },
            {
                path: '403',
                component: () => import(/* webpackChunkName: 'error' */ '../page/error/403')
            },
            {
                path: '404',
                component: () => import(/* webpackChunkName: 'error' */ '../page/error/404')
            },
            {
                path: '500',
                component: () => import(/* webpackChunkName: 'error' */ '../page/error/500')
            }
        ]
    }, {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: 'login' */ '~/page/login')
    }, {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '~/page/home')
    }];
export default staticRoutes;