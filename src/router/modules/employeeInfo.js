import Layout from '@/layout'

export default {
    path: '/employeeInfo',
    name: 'employeeInfo',
    component: Layout,
    children: [{
        path: '',
        name: 'employeeInfo',
        component: () =>
            import ('@/views/EmployeeInfo'),
        meta: {
            title: '员工信息',
            icon: 'people'
        }
    }]
}