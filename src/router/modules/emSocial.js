import Layout from '@/layout'

export default {
    path: '/emSocial',
    name: 'emSocial',
    component: Layout,
    children: [{
        path: '',
        name: 'emSocial',
        component: () =>
            import ('@/views/social/detail'),
        meta: {
            tilte: '用户社保',
            icon: 'table'
        }
    }]
}