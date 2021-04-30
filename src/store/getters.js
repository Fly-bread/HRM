const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    // 导出 token
    token: state => state.user.token,
    // 导出用户名
    name: state => state.user.userInfo.username,
    // 导出用户信息id
    userid: state => state.user.userInfo.userid,
    // 建立用户头像的映射
    staffPhoto: state => state.user.userInfo.staffPhoto,
    // 建立用于 user 模块中companyId的快捷访问
    companyId: state => state.user.userInfo.companyId,
    // 将permission中的路由模块开放出来
    routes: state => state.permission.routes
}
export default getters