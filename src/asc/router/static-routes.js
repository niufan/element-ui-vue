/**
 * 静态路由
 * 使用懒加载机制
 * @author Fan Niu
 * @since 2018/08/25
 */
const staticRoutes =
    [{
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: 'login' */ '~/page/login')
    }];
export default staticRoutes;