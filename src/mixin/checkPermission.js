import store from '@/store'

// 检查权限的方法  返回一个true或者false
// 检查 用户的权限点中有没有 对应的标识 有这个标识 就返回true  没有标识就返回false
// 可以将方法混入到所有的组件中
// 导出混入对象
export default {
    methods: {
        checkPermission(key) {
            const { userInfo } = store.state.user
            if (userInfo.permissions && userInfo.permissions.length) {
                console.log(userInfo.permissions.some(item => item === key))
                return userInfo.permissions.some(item => item === key)
            }
            return false
        },
        //以下为自定义
        showPermission(key) {
            const { userInfo } = store.state.user
            if (userInfo.permissions && userInfo.permissions.length) {
                if (userInfo.permissions.some(item => item === key)) {
                    return null
                }
            }
            return '没有权限，控件不可用'
        },
        showUserInfo() {
            const { userInfo } = store.state.user
                //userInfo.username = '周地方' 因为是指针，所以会更改成功
            if (this.$store.state.user == store.state.user) {
                console.log(userInfo)
            }
        }
    }
}