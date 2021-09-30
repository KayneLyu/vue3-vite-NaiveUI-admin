import { Router } from 'vue-router';
import { useLoadingBar } from 'naive-ui';
// 生成路由
export function routerGuards(router: Router): void {
    console.log('创建路由')
    // 根据后端返回的菜单生成动态路由
    const stateRoute = <T>(oldMenu: T, fatherPath?: string): void => {
        if (!Array.isArray(oldMenu) || oldMenu.length < 1) {
            return
        }
        oldMenu.filter((item: IMenu) => {
            let option: any = {
                label: item.nodeName,
                key: item.nodeId,
                path: item.otherData.resourceUrl,
            };
            if (fatherPath) {
                option['fatherPath'] = fatherPath
            }
            if (item.children.length) {
                option["children"] = stateRoute(item.children, item.url)
            }
            else {
                const routerName = option.path.replace(/\//g, '').trim();
                console.log(`@/views${option.fatherPath}${option.path}${option.path}.vue`);
                router.addRoute('Layout', {
                    path: option.fatherPath + option.path,
                    name: routerName,
                    component: () => import(`../views/${option.fatherPath}${option.path}${option.path}.vue`),
                    meta: {
                        id: option.key,
                        name: option.label,
                    }
                })
            }
        });
    };
    
    let flag = true;
    router.beforeEach((to, from, next) => {
        const loading = window.$loading || null;
        loading && loading.start();
        const menuInfo = sessionStorage.menu;
        const token = sessionStorage.token;
        // 这里可以配置白名单
        if (to.name === 'Login') {
            next()
            return
        }
        // 初次加载渲染动态路由
        if (flag && menuInfo) {
            const menu = JSON.parse(menuInfo);
            stateRoute(menu.children);
            flag = false
            next(to.path)
            return
        }
        // 没有匹配的路由路径 404
        if (!to.matched.length) {
            next('/404')
            return
        }
        // 没有token 转到登录页
        if (!token) {
            next('/login')
            return
        }
        next();
    });
    
    router.afterEach((to, from, failure) => {
        const loading = window.$loading || null;
        loading && loading.finish();
    });

    router.onError((error) => {
        console.log(error, '路由错误');
    });
}