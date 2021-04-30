// 引入路由实例
import router, { asyncRoutes } from '@/router'
// 引入Vuex实例
import store from '@/store'
import { RouterLinkStub } from '@vue/test-utils'
// 引入进度条模块
import Nprogress from 'nprogress'
// 进度条样式
import 'nprogress/nprogress.css'
// 白名单 , 不需要强制token存在的页面
const whiteList = ['/login', '/404']

// 路由前置守卫
//自己修改
router.beforeEach(async(to, from, next) => {

        Nprogress.start() // 一进来先开启进度条

        // 再判断有没token值
        //有token就代表已经登录
        if (store.getters.token) { // 有 token值 next
            // 如果已经在登录页面了 跳往主页

            if (to.path === '/login') {
                next('/')
            } else {
                //console.log(store.getters.userid)
                //执行这里
                // 调用获取用户信息action (拿到token的时候同时也拿到了信息)
                // console.log(!store.getters.userid)
                // console.log(await store.dispatch('user/getUserInfo'))
                //第一次进入为undefined，因为没有获取自己的信息
                //第二次时为具体id，所以判断失效
                //所以这个if else的实质是判断是否为第一次进入，即为了拿到用户信息
                //$router.push()每次进入都要守卫
                //未定义userId，证明是刚进入，所以需要获取信息
                if (!store.getters.userid) {
                    //执行了这里
                    //获取当前用户的角色，执行了之后store.getters.userId不再是undefined
                    //if判断语句就会失效
                    let userid = store.getters.token
                    const user = await store.dispatch('user/getUserInfoById', userid)
                        // , "Mytest", 'actSalarys',
                        // "emAttendance", 'emRelax',   "kpi", 'emActSalarys',                
                        // roles.menus = ['employees', 'approvals', 'salarys', "social_securitys",
                        //         "permissions", "attendances", 'emApply', "relax", 'employeeInfo',
                        //         'emSocial'

                    //     ]
                    //获得当前用户可以显示的导航栏
                    const routes = await store.dispatch('permission/filterRoutes', user.menus)
                    router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
                    next(to.path) //执行了此句之后，会再次执行守卫
                } else {
                    // 其他直接放行，
                    next()
                }
            }
            Nprogress.done() // if 结束之后关闭 (强制关闭)
                //登录前来这里
        } else { // 没有 token值 应该调回login

            if (whiteList.indexOf(to.path) > -1) {
                // 如果在白名单中没有token值 则直接放过

                next()
            } else {
                // 如果在白名单之外则需要跳转到登录页 登录
                next('/login')
            }
            Nprogress.done() // if 结束之后关闭 (强制关闭)
        }
    })
    // 后指守卫
router.afterEach(() => {
    // 前置守卫已经加载完毕了 关闭进度条
    Nprogress.done()
})