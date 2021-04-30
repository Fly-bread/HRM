import Layout from '@/layout'

export default {
    path: '/emRelax',
    component: Layout,
    name: 'emRelax',
    children: [{
        path: '',
        component: () =>
            import ('@/views/EmRelax'),
        name: 'emRelax',
        meta: {
            title: '员工休假表',
            icon: 'lock'
        }
    }]
}