import Layout from '@/layout'

export default {
    path: '/salarysreal',
    component: Layout,
    name: 'salarysreal',
    children: [{
            path: '',
            component: () =>
                import ('@/views/MySalarysreal'),
            name: 'salarysreal',
            meta: {
                title: '实发工资',
                icon: 'money'
            }
        },

        //自定义开始
        {
            path: 'reduce/:id',
            component: () =>
                import ('@/views/MySalarysreal/components/reduce'),
            name: 'SalarysrealReduce',
            meta: {
                title: '扣除工资',
            },
            hidden: true,
        },

        {
            path: 'award/:id',
            component: () =>
                import ('@/views/MySalarysreal/components/award'),
            name: 'SalarysrealAward',
            meta: {
                title: '奖励工资',
            },
            hidden: true,
        },
        //自定义结束        
    ]
}