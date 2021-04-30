// 引入布局组件
import Layout from '@/layout'

// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  name: 'departments',
  path: '/departments',
  component: Layout,
  children: [{
    path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
    component: () => import('@/views/departments'),
    name: 'departments',
    meta: {
      title: '组织架构', // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      icon: 'tree'
    }
  }]

}
