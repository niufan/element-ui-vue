import {NProgress, VueRouter, ElementUI} from '~/vendor'
import staticRoutes from './static-routes'
import whiteList from './white-list';
import TokenStore from '~/asc/store/auth/oauth2/token-store'
import {Utils} from "~/common/util";

const router = new VueRouter({
    routes: staticRoutes
});

router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();

    // 判断用户是否处于登录状态
    // debugger
    console.log(to, from, next);
    if (!Utils.isEmpty(TokenStore.getToken())) {
        // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页
        // 这种情况出现在手动修改地址栏地址时
        if (to.path === '/login') {
            next({path: "/home", replace: true});
            NProgress.done();
        } else if(to.path.indexOf("/error") >= 0){
            // 防止因重定向到error页面造成beforeEach死循环
            next()
        } else {
            /*initRoute(router).then(() => {
                let isPermission = false;
                console.log("进入权限判断");
                permissionList.forEach((v) => {
                    // 判断跳转的页面是否在权限列表中
                    if(v.path === to.fullPath){
                        isPermission = true
                    }
                });
                // 没有权限时跳转到401页面
                if(!isPermission){
                    next({path: "/error/401", replace: true})
                } else {
                    next()
                }
            })*/

            next();
        }
    } else {
        /*// 如果是免登陆的页面则直接进入，否则跳转到登录页面
        if (whiteList.indexOf(to.path) >= 0) {
            console.log('该页面无需登录即可访问');
            next()
        } else {
            console.warn('当前未处于登录状态，请登录');
            next({path: "/login", replace: true});
            // 如果store中有token，同时Cookie中没有登录状态
            if(store.state.user.token){
                ElementUI.Message({
                    message: '登录超时，请重新登录'
                });

                NProgress.done();
            }

        }*/

        if (whiteList.in(to.path)) {
            next();
        } else {
            next({path: "/login", replace: true});
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});

export default router;