import request from '@/utils/request'

export function getSalarysrealList(data) {
    return request({
        url: '/salarysreal',
        data,
        method: 'post'
    })
}

export function addSalaryreal(data) {
    return request({
        url: '/salarysreal/add',
        data,
        method: 'post'
    })
}

export function editSalaryreal(data) {
    return request({
        url: '/salarysreal/edit',
        data,
        method: 'post'
    })
}

export function deleteSalaryreal(data) {
    return request({
        url: '/salarysreal/delete',
        data,
        method: 'post'
    })
}




export function getTips(yearMonth) {
    return request({
        url: `/salarys/tips/${yearMonth}`
    })
}
export function getSettings() {
    return request({
        url: '/salarys/settings'
    })
}

export function getCompanySetting() {
    return request({
        url: '/salarys/company-settings'
    })
}
export function saveSettings(data) {
    return request({
        url: '/salarys/settings',
        method: 'post',
        data
    })
}

export function getSalaryDetail(userid) {
    return request({
        url: `/salarys/modify/${userid}`
    })
}
export function changeSalary(data) {
    return request({
        url: `/salarys/modify/${data.userid}`,
        method: 'post',
        data
    })
}
export function initSalary(data) {
    return request({
        url: `/salarys/init/${data.userid}`,
        method: 'post',
        data
    })
}
export function getArchivingList(params) {
    return request({
        url: `/salarys/reports/${params.year}`,
        params
    })
}
export function getArchivingCont(params) {
    return request({
        url: `/salarys/reports/${params.yearMonth}`,
        params
    })
}
export function newReport(data) {
    return request({
        url: `/salarys/reports/${data.yearMonth}/newReport`,
        method: 'put',
        data
    })
}
export function getArchivingExport(params) {
    return request({
        url: `/salarys/reports/${params.yearMonth}/export`,
        params
    })
}
export function getArchivingFirst(params) {
    return request({
        url: `/salarys/reports/${params.yearMonth}/first`,
        params
    })
}
export function getArchivingArchive(data) {
    return request({
        url: `/salarys/reports/${data.yearMonth}/archive`,
        data,
        method: 'post'
    })
}