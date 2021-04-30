import Layout from '@/layout'

export default {
    path: '/relax',
    component: Layout,
    name: 'relax',
    children: [{
            path: '',
            component: () =>
                import ('@/views/MyRelax'),
            name: 'relax',
            meta: {
                title: 'relax休假表',
                icon: 'money'
            }
        }, {

            path: 'details/:id',
            component: () =>
                import ('@/views/MyRelax/details'),
            name: 'relaxDetails',
            hidden: true,
            meta: {
                title: '详情'
            }
        }

    ]
}