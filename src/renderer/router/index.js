import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/layout'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/dashboard/mechine',
    hidden: true,
    children: [{
      path: '/dashboard/mechine',
      component: () => import('@/views/dashboard/index.vue')
    }, {
      path: '/dashboard/schedule',
      component: () => import('@/views/schedule/index.vue')
    }, {
      path: '/user/update/password',
      component: () => import('@/views/user/password.vue')
    }, {
      path: '/user/update/profile',
      component: () => import('@/views/user/profile.vue')
    }, {
      path: '/admin/user',
      component: () => import('@/views/admin/user.vue')
    }, {
      path: '/admin/institution',
      component: () => import('@/views/admin/institution.vue')
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
