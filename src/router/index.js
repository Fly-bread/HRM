import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 引入多个模块的路由规则

import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'
import kpiRouter from './modules/kpi'
import relaxRouter from './modules/relax'
import testRouter from './modules/test'
import SalarysrealRouter from './modules/Salarysreal'

import EmAttendanceRouter from './modules/emAttendance'
import EmRelaxRouter from './modules/emRelax'
import EmActSalarysRouter from './modules/emActSalarys'
import EmApplyRouter from './modules/emApply'
import EmployeeInfoRouter from './modules/employeeInfo'
import EmSocialRouter from './modules/emSocial'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes   这个是element定义好的静态路由
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/test',
        component: () =>
            import ('../views/test'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        //redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () =>
                //自己修改
                import ('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },
    {
        path: '/import',
        component: Layout,
        hidden: true, // 在左边侧边栏中不显示上
        children: [{
            path: '', // 耳机路由path可以什么都不写, 表示二级默认路由
            component: () =>
                import ('@/views/import')
        }]
    }
    // 404 page must be placed at the end !!!
    // { path: '*', redirect: '/404', hidden: true }
]

// 定义一个动态路由
export const asyncRoutes = [
    departmentsRouter,
    settingRouter,
    employeesRouter,
    approvalsRouter,
    permissionRouter,
    attendancesRouter,
    salarysRouter,
    socialRouter,
    kpiRouter,
    relaxRouter,
    testRouter,
    SalarysrealRouter,

    EmAttendanceRouter,
    EmRelaxRouter,
    EmActSalarysRouter,
    EmApplyRouter,
    EmployeeInfoRouter,
    EmSocialRouter
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    // 临时把静态路由和动态路由合并在一起,
    // routes: [...constantRoutes, ...asyncRoutes]
    routes: [...constantRoutes],
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}



export default router