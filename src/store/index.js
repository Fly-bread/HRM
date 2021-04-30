import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import employees from '@/router/modules/employees'

Vue.use(Vuex)

const relaxListAll = [{
        username: '史莱姆',
        worknumber: '12345',
        id: '987',
        relaxAll: 10,
        relaxed: 3,
        relaxRemain: null,

        date: '2021'

    },
    {
        username: '暴龙哥',
        worknumber: '12355',
        id: '123',
        relaxAll: 15,
        relaxed: 6,
        relaxRemain: null,
        date: '2021'

    },
    {
        username: '阿飞',
        worknumber: '145478755',
        id: '154523',
        relaxAll: 15,
        relaxed: 6,
        relaxRemain: null,
        date: '2020'

    }
]

const relaxSLM = [{
        username: '史莱姆',
        worknumber: '12345',
        id: '987',
        type: '年假',
        appDate: '2021-04-03',
        startDate: '2021-04-12',
        endDate: '2021-04-15',
        relaxNum: '3',
        appDetail: 'dfadfd打发打发打发发达发达发达发达发达fdf',
        verDetail: 'dfdfttrrhhhh4545'
    },
    {
        username: '史莱姆',
        worknumber: '12345',
        id: '987',
        type: '年假',
        appDate: '2022-04-03',
        startDate: '2022-04-12',
        endDate: '2022-04-15',
        relaxNum: '3',
        appDetail: 'dfadfd打发打发打发发达发达发达发达发达fdf',
        verDetail: 'dfdfttrrhhhh4545'
    },
    {
        username: '暴龙哥',
        worknumber: '12355',
        id: '123',
        type: '年假',
        appDate: '2021-04-03',
        startDate: '2021-04-12',
        endDate: '2021-04-15',
        relaxNum: '3',
        appDetail: 'dfadfd打发打发打发发达发达发达发达发达fdf',
        verDetail: 'dfdfttrrhhhh4545'
    },

]

// const rolesAll = {
//     '人事专员': ['employees-look', 'employees-add', 'employees-edit', 'employees-delete', ],
//     '工资管理员': ['salarys-look', 'salarys-add', 'salarys-edit', 'salarys-delete', ]
// }

const rolesAll = [{
        name: '人事专员',
        permissions: ['employees-look', 'employees-add', 'employees-edit', 'employees-delete', ],
        description: '新增删除的',
        id: '457841587484545'
    },
    {
        name: '工资管理员',
        permissions: ['salarys-look', 'salarys-add', 'salarys-edit', 'salarys-delete', ],
        description: '管理工资的',
        id: '521657484154545'
    },
]

const permissionsAll = [
    'employees-look', 'employees-add', 'employees-edit', 'employees-delete',
    'salarys-look', 'salarys-add', 'salarys-edit', 'salarys-delete',
    'socials-look', 'socials-add', 'socials-edit', 'socials-delete',
    'actSalarys-look', 'actSalarys-add', 'actSalarys-edit', 'actSalarys-delete',
    'attendences-look', 'attendences-add', 'attendences-edit', 'attendences-delete',
    'approvals-look', 'approvals-add', 'approvals-edit', 'approvals-delete',
    'settings-look', 'settings-add', 'settings-edit', 'settings-delete',
    'kpis-look', 'kpis-add', 'kpis-edit', 'kpis-delete',
    'relaxs-look', 'relaxs-add', 'relaxs-edit', 'relaxs-delete'
]

const reduceFromOther = [{
        id: '571245457454577',
        username: '史莱姆',
        userid: '987',
        worknumber: '12345',
        date: '2021-03-04',
        reason: 'dffdfdf ',
        reduceNum: '455',
    },
    {
        id: '57112333333354577',
        username: '史莱姆',
        userid: '987',
        worknumber: '12345',
        date: '2021-04-04',
        reason: 'dffdfdf ',
        reduceNum: '46',
    },
    {
        id: '55555552217454577',
        username: '史莱姆',
        userid: '987',
        worknumber: '12345',
        date: '2021-04-09',
        reason: 'dffdfdf ',
        reduceNum: '100',
    },
    {
        id: '55555552217454577',
        username: '暴龙哥',
        userid: '123',
        worknumber: '12345',
        date: '2021-04-09',
        reason: 'dffdfdf ',
        reduceNum: '100',
    },
]

const reduceFromAttendance = [{
    id: '11111111111111111111',
    userid: '987',
    username: '史莱姆',
    worknumber: '12345',
    date: '2021-04-09',
    reason: '旷工',
    reduceNum: '100',
}, {
    id: '222222222222222222222',
    username: '史莱姆',
    userid: '987',
    worknumber: '12345',
    date: '2021-03-09',
    reason: '请假',
    reduceNum: '200',
}, ]

const rCtemp = {
    rFO: 0,
    rFA: 0,
    rA: 0
}

const userInfoTb = [{
        username: '史莱姆',
        userid: '987',
        worknumber: '12345',
        workType: '前端',
        phone: '13024613574',
        entryDate: '2021-01-10'
    }, {
        username: '暴龙哥',
        userid: '123',
        worknumber: '12355',
        workType: '后端',
        phone: '13024600074',
        entryDate: '2020-12-02',
    },

]

const emAttendance = [{
        id: '987',
        date: '2021-04-16',
        type: '旷工'
    },
    {
        id: '987',
        date: '2021-04-02',
        type: '事假'
    },
    {
        id: '987',
        date: '2021-03-06',
        type: '事假'
    },
]

const relaxDetail2021 = [{
        id: '1618311671562',
        userid: '987',
        verUserid: '234124',
        startDate: '2021-04-03',
        endDate: '2021-04-06',
        relaxNum: 3,
        type: '年假',
    },
    {
        id: '1618311671562',
        userid: '987',
        verUserid: '234124',
        startDate: '2021-03-06',
        endDate: '2021-03-09',
        relaxNum: 3,
        type: '年假',
    },
    {
        id: '1618311671562',
        userid: '987',
        verUserid: '234124',
        startDate: '2021-03-26',
        endDate: '2021-03-29',
        relaxNum: 3,
        type: '年假',
    },
    {
        id: '1618311671562',
        userid: '987',
        verUserid: '234124',
        startDate: '2021-03-17',
        endDate: '2021-03-20',
        relaxNum: 3,
        type: '事假',
    },

    {
        id: '1618311853168',
        userid: '123',
        startDate: '2021-04-09',
        endDate: '2021-04-11',
        relaxNum: 2,
        type: '年假',
    },
    {
        id: '1618311916024',
        userid: '987',
        startDate: '2021-03-21',
        endDate: '2021-03-14',
        relaxNum: 3,
        type: '事假',
    },
]
const relax2021 = [{
        userid: '987',
        relaxAll: 10,
        relaxed: -1,
        relaxRemain: -1,
    },
    {
        userid: '123',
        relaxAll: -1,
        relaxed: -1,
        relaxRemain: -1,
    },
]

const AS2021Tb = [{
        userid: '987',
        salaryBase: 2000,
        reduceAll: 1000,
        reduceFA: 10,
        reduceFO: 100,
        awardAll: 5,
        tax: 30,
        social: 20,
        salaryFinal: 0,
        month: '2021-03'
    },
    {
        userid: '987',
        salaryBase: 2000,
        reduceAll: 100,
        reduceFA: 10,
        reduceFO: 100,
        awardAll: 50,
        tax: 30,
        social: 200,
        salaryFinal: 0,
        month: '2021-04'
    },

]


//工资基数
const salaryBases = [{
        userid: '987',
        lastSalaryDate: '2021-03-13',
        lastSalaryBase: 1000,
        lastSalaryWorkdays: 10,
        nowSalaryDate: '2021-03-26',
        nowSalaryBase: 300,
        nowSalaryWorkdays: 10,
        isChange: 0, //调薪时改变
    },
    {
        userid: '123',
        lastSalaryDate: '2020-02-13',
        lastSalaryBase: 1000,
        lastSalaryWorkdays: 10,
        nowSalaryDate: '2020-02-26',
        nowSalaryBase: 200,
        nowSalaryWorkdays: 10,
        isChange: 0 //调薪时改变
    }
]



const awardsTb = [{
        id: '1618402807799',
        userid: '987',
        date: '2021-04-01',
        reason: 'dfdfadf',
        awardNum: 132
    },
    {
        id: '1618402834110',
        userid: '987',
        date: '2021-03-15',
        reason: 'dfdfadf',
        awardNum: 135
    },
    {
        id: '1618402855580',
        userid: '123',
        date: '2021-04-01',
        reason: 'dfdfadf',
        awardNum: 132
    },
]


//假定的当前登录用户
const LoginInfo = {
    username: '史莱姆',
    userid: '987',
    worknumber: '12345',
    phone: '13024613574',
    entryDate: '2021-01-10'
}

const appRelaxTb = [{
        appId: "1618454484880987",
        appType: '请假',
        appRelaxType: '年假',
        appUsername: '史莱姆',
        appUserid: '987',
        appWorknumber: '12345',

        verUsername: '笑川',
        verUserid: '931',
        verWorknumber: '24512',

        appDate: '2021-03-21',
        appRelaxStartDate: '2021-04-10',
        appRelaxEndDate: '2021-04-13',
        appState: '审批中',


        appRelaxNum: 3,
        appDetail: '回家过年',
        verDetail: '',
    },
    {
        appId: "1618550676156987",
        appType: '请假',
        appRelaxType: '年假',
        appUsername: '史莱姆',
        appUserid: '987',
        appWorknumber: '12345',

        verUsername: '笑川',
        verUserid: '931',
        verWorknumber: '24512',

        appDate: '2021-03-21',
        appRelaxStartDate: '2021-04-18',
        appRelaxEndDate: '2021-04-19',
        appState: '通过',


        appRelaxNum: 3,
        appDetail: '回家过年',
        verDetail: '',
    },
    {
        appId: "1618454512358987",
        appType: '请假',
        appRelaxType: '年假',
        appUsername: '史莱姆',
        appUserid: '987',
        appWorknumber: '12345',

        verUsername: '笑川',
        verUserid: '931',
        verWorknumber: '24512',

        appDate: '2021-03-21',
        appRelaxStartDate: '2021-04-09',
        appRelaxEndDate: '2021-04-10',
        appState: '审批中',


        appRelaxNum: 3,
        appDetail: '回家过年',
        verDetail: '',
    },
    {
        appId: '1618454578406123',
        appType: '',
        appRelaxType: '年假',
        appUsername: '暴龙哥',
        appUserid: '123',
        appWorknumber: '12455',

        verUsername: '包桑',
        verUserid: '901',
        verWorknumber: '874512',

        appDate: '2021-04-25',
        appRelaxStartDate: '2021-04-21',
        appRelaxEndDate: '2021-04-23',
        appRelaxNum: 3,
        appState: '审批中',

        appDetail: '回家过年',
        verDetail: '',
    },
    {
        appId: '16184545784061212',
        appType: '',
        appRelaxType: '年假',
        appUsername: '德邦',
        appUserid: '1212',
        appWorknumber: '19955',

        verUsername: '包桑',
        verUserid: '901',
        verWorknumber: '874512',

        appDate: '2021-02-25',
        appRelaxStartDate: '2021-04-21',
        appRelaxEndDate: '2021-04-23',
        appRelaxNum: 3,
        appState: '审批中',

        appDetail: '回家过年',
        verDetail: '',
    },
    {
        appId: '16184546368761213',
        appType: '请假',
        appRelaxType: '年假',
        appUsername: '阿道夫',
        appUserid: '1213',
        appWorknumber: '954245',

        verUsername: '包桑',
        verUserid: '901',
        verWorknumber: '874512',

        appDate: '2021-04-25',
        appRelaxStartDate: '2021-04-21',
        appRelaxEndDate: '2021-04-23',
        appRelaxNum: 3,
        appState: '同意',


        appDetail: '回家过年',
        verDetail: '',
    },
    {
        appId: '16184546701721212',
        appType: '请假',
        appRelaxType: '年假',
        appUsername: '德邦',
        appUserid: '1212',
        appWorknumber: '9542',

        verUsername: '包桑',
        verUserid: '901',
        verWorknumber: '874512',

        appDate: '2021-04-25',
        appRelaxStartDate: '2021-04-21',
        appRelaxEndDate: '2021-04-23',
        appRelaxNum: 3,
        appState: '拒绝',


        appDetail: '回家过年',
        verDetail: '',
    }
]
const appLeaveTb = [{
    appId: "1618536564980987",
    appType: '离职',
    appUsername: '史莱姆',
    appUserid: '987',
    appWorknumber: '12345',

    verUsername: '笑川',
    verUserid: '931',
    verWorknumber: '24512',

    appDate: '2021-03-21',
    appLeaveDate: '2021-04-10',
    appState: '审批中',

    appDetail: '回家过年',
    verDetail: '123',
}, ]



const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user,
        permission,
        tagsView
    },
    getters,
    state: {
        LoginInfo: LoginInfo,
        userInfoTb: userInfoTb,

        relaxListAll: relaxListAll,
        relaxSLM: relaxSLM,

        rolesAll: rolesAll,
        permissionsAll: permissionsAll,

        reduceFromOther: reduceFromOther,
        reduceFromAttendance: reduceFromAttendance,
        rCtemp: rCtemp,

        emAttendance: emAttendance,

        relaxDetail2021: relaxDetail2021,
        relax2021: relax2021,

        salaryBases: salaryBases,
        awardsTb: awardsTb,
        AS2021Tb: AS2021Tb,

        appRelaxTb: appRelaxTb, //请假申请列表
        appLeaveTb: appLeaveTb //离职申请列表
    }
})

export default store

/*
   
    {
        id: "1063705989926227968",
        mobile: "13800000002",
        username: "哈了少",
        password: "c8b7722b1139bb9b346409e503302e82",
        enableState: 1,
        createTime: "2018-11-17T16:10:45.000+0000",
        companyId: "1",
        companyName: "传智播客",
        departmentId: "1175310929766055936",
        timeOfEntry: "2018-11-02T08:00:00.000+0000",
        formOfEmployment: 2,
        workNumber: "952788",
        formOfManagement: null,
        workingCity: null,
        correctionTime: "2018-11-30T00:00:00.000+0000",
        inServiceStatus: 1,
        departmentName: "总裁办",
        level: "coAdmin",
        staffPhoto: "http://cc-vue-1305402859.cos.ap-nanjing.myqcloud.com/ykk.jpg"
    },
*/