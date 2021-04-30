// vue的权限模块

import { constantRoutes, asyncRoutes } from '@/router' // 静态路由和动态路由

const state = {
    routes: constantRoutes // 默认的静态路由,所有人都有权限
}

const mutations = {
    setRoutes(state, newRoutes) {
        // newRoutes可以认为是 用户登录时 通过权限所得到的动态路由的部分
        // state.routes = [...state.routes, ...newRoutes] // newRoutes不应该追加到state上面, 应该追加到初始的静态路由constantRoutes上
        state.routes = [...constantRoutes, ...newRoutes]
    }
}

// 通过actions筛选路由
const actions = {
    // 访问权限的数据在用户属性 menus 中
    filterRoutes(context, menus) {
        const routes = []
        menus.forEach(item => {
            //some是看一个数组中是否存在满足条件的对象
            if (asyncRoutes.some(route => route.name === item)) {
                //把asyncRoutes中的元素(socialRouter,employeesRouter等路由)放入routes中
                routes.push(...asyncRoutes.filter(route => route.name === item))
            }
        })
        context.commit('setRoutes', routes)
        return routes
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}