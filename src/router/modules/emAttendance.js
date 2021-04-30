import Layout from '@/layout'

export default {
    path: '/emAttendance',
    component: Layout,
    name: 'emAttendance',
    children: [{
            path: '',
            component: () =>
                import ('@/views/EmAttendance'),
            name: 'emAttendance',
            meta: {
                title: '员工考勤表',
                icon: 'excel'
            }
        }, {
            path: './detail',
            component: () =>
                import ('@/views/EmAttendance/details'),
            name: 'emAttendanceDetails',
            meta: {
                title: '员工考勤表',
            },
            hidden: true
        },

    ]
}