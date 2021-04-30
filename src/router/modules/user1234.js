import Layout from '@/layout'

const user1234 = {
    path: '/user1234',
    component: Layout,
    name: 'salarys',
    children: [{
        path: '',
        component: () =>
            import ('@/views/salarys'),
        name: 'salarys',
        meta: {
            title: '工资',
            icon: 'money'
        }
    }]
}
export default user1234