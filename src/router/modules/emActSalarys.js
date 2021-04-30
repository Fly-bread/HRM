import Layout from '@/layout'

export default {
    path: '/emActSalarys',
    name: 'emActSalarys',
    component: Layout,
    children: [{
            path: '',
            name: 'emActSalarys',
            component: () =>
                import ('@/views/EmActSalarys'),
            meta: {
                title: '用户实发工资',
                icon: 'money'
            }
        },
        {
            path: 'reduce/:id',
            name: 'emActSalarysReduce',
            component: () =>
                import ('@/views/EmActSalarys/components/reduce'),
            meta: {
                title: '用户扣除工资'
            },
            hidden: true,
        }, {
            path: 'award/:id',
            name: 'emActSalarysAward',
            component: () =>
                import ('@/views/EmActSalarys/components/award'),
            meta: {
                title: '用户奖励',

            },
            hidden: true
        }
    ]
}