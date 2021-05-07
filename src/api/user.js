// 引入的是 utils下面的request.js 文件 本质上市一个axios
import request from '@/utils/request'

//test的尝试
export function testonline() {
    console.log('666')
    return request({
        url: '/testonline',
        method: 'get'
    })
}

// 把所有的请求封装成一个个函数
// 登录接口
export function login(data) {
    return request({
        url: '/sys/login',
        method: 'post',
        data
    })
}

// 获取用户基本信息
export function getUserInfoById(json) {
    return request({
        url: '/sys/profile',
        method: 'post',
        data: json
    })
}

// 获取用户基本信息(在写一个完全是为了显示头像)
export function getUserDetailById(id) {
    //console.log(id)
    return request({
        url: `/sys/user/${id}`
    })
}