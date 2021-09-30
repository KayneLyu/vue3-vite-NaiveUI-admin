import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import {routerGuards} from '../router/router-guards'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/login.vue')
  },
  {
    path: '/',
    name: 'Layout',
    redirect:'/user/userList',
    component: () => import('@/views/layout/layout.vue'), // 懒加载组件
    // children: [
    //   {
    //     path: 'user/userList',
    //     name: 'userList',
    //     component: () => import('@/views/User/userList/userList.vue'),
    //     meta: { id: '8' }
    //   }
    // ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/404.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

routerGuards(router);

export default router