import Layout from '@/layout'

const attendRouter = {
    path: '/attendances',
    component: Layout,
    name: 'attendances',
    children: [{
            path: '',
            component: () =>
                import ('@/views/MyAttendances'),
            name: 'attendances',
            meta: {
                title: '考勤',
                icon: 'excel'
            }
        },

        //自定义开始
        {
            path: 'details/:id',
            component: () =>
                import ('@/views/MyAttendances/details'),
            name: 'attendanceInfo',
            hidden: true,
            meta: {
                title: '考勤',
            }
        },
        //自定义结束        


        {
            path: 'archiving',
            component: () =>
                import ('@/views/attendances/historical'),
            name: 'archiving',
            hidden: true,
            meta: {
                title: '归档'
            }
        },
        {
            path: 'report/:month',
            component: () =>
                import ('@/views/attendances/report'),
            name: 'reports',
            hidden: true,
            meta: {
                title: '报表'
            }
        }
    ]
}
export default attendRouter