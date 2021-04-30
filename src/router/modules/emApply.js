import Layout from '@/layout'

export default {
    path: '/emApply',
    name: 'emApply',
    component: Layout,
    children: [{
        path: '',
        name: 'emApply',
        component: () =>
            import ('@/views/EmApply'),
        meta: {
            title: '用户申请表',
            icon: 'money'
        }
    }]
}