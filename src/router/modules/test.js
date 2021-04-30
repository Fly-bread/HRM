import Layout from '@/layout'

export default {
    name: 'Mytest',
    path: '/Mytest',
    component: Layout,
    children: [{
        path: '',
        component: () =>
            import ('@/views/Mytest'),
        name: 'Mytest',
        meta: {
            title: '测试',
            icon: 'money'
        }
    }]
}