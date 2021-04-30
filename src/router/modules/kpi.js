import Layout from '@/layout'

export default {
    path: '/kpi',
    component: Layout,
    name: 'kpi', //供permission访问后台
    children: [{
            path: '',
            component: () =>
                import ('@/views/kpi'),
            name: 'kpi', //在页面中显示的图标
            meta: {
                title: 'kpi考核',
                icon: 'money'
            }
        },
        {
            path: 'details/:id',
            component: () =>
                import ('@/views/kpi/details'),
            name: 'kpiDetails',
            hidden: true,
            meta: {
                title: '详情'
            }
        }
    ]
}