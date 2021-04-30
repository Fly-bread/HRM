// 在这个文件中需要导出一个axios的实例，而且这个实例需要有请求拦截器和响应拦截器
import axios from 'axios'
// 单独引入element的提示框
import { Message } from 'element-ui'
// 引入 Vuex 的 store实例
import store from '@/store'
// 引入路由 router 实例
import router from '@/router'
import { getTimeStamp } from './auth'
// 定义token失效的主动时间
const timestampOut = 7200 // 两个小时



const service = axios.create({
        // 设置baseURL
        baseURL: '',
        // 设置请求超过时间
        timeout: 5000
    }) // 创建一个axios的实例

// 请求拦截器
service.interceptors.request.use(config => {
    // 先判断有没有token
    if (store.getters.token) {
        // 在这里已经存在了 token 就有必要检查时间是否超市额了
        if (checkTimeOut()) {
            store.dispatch('user/logout')
            router.push('login') // 返回登录页
            return Promise.reject(new Error('登录超时，请重新登录'))
        } else {
            //console.log('111111111')
        }
        config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config // 返回配置
}, error => Promise.reject(error))

// 响应拦截器 有两个参数 都是函数第一个是成功的时候执行,后一个是失败的执行
service.interceptors.response.use(response => {
        // 接收响应回来的数据
        const { success, data, message } = response.data
        if (success) { // 如果响应回来的success为true 就可以将data return
            return data
        } else {
            // 错误就提示错误的信息
            Message.error(message)
                // 最后在 reject
            return Promise.reject(new Error(message))
        }
    }, error => {
        if (error.response.data.code === 10002) {
            store.dispatch('user/logout')
            router.push('login') // 返回登录页
            return Promise.reject(new Error('登录超时，请重新登录'))
        } else {
            // 弹出提示失败
            Message.error(error.message)
                // 返回reject
            return Promise.reject(error)
        }
    })
    // 导出axios实例

// 检查token超时的函数
const checkTimeOut = function() {
    // 先获取现在的时间
    const currentTime = new Date().getTime()
        // 获取存入缓存中的时间戳
    const timeStamp = getTimeStamp() ? getTimeStamp() : 0

    // 返回
    return (currentTime - timeStamp) / 1000 > timestampOut
}

export default service