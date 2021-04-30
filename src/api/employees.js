import request from '@/utils/request'
// import request from '@/utils/MyRequest'



/**
 * @description: 获取员工的简单列表
 * @param {type}
 * @return:
 */
export function getEmployeeSimple() {
    return request({
        url: '/sys/user/simple'
    })
}

/**
 * @description: 获取员工的列表数据
 * @param {Object} params query参数 分页数据对象
 * @return: request 对象
 */
export function getEmployeesList(data) {
    return request({
        url: '/sys/employees',
        method: 'post',
        data
    })
}

/**
 * @description: 删除员工
 * @param {Number} id
 * @return: request 对象
 */
export function removeEmployee(id) {
    return request({
        url: `/sys/user/${id}`,
        method: 'delete'
    })
}

/**
 * @description: 新增员工
 * @param {Object} data 新增员工数据对象
 * @return: request 对象
 */
export function addEmployee(data) {
    return request({
        url: '/sys/user/',
        method: 'post',
        data
    })
}

/**
 * @description: 导入员工接口
 * @param {Array} data 员工信息数组
 * @return: request 对象
 */
export function importEmployee(data) {
    return request({
        url: '/sys/user/batch',
        method: 'post',
        data
    })
}

/**
 * @description: 保存员工的基本信息
 * @param {Object} data 修改的信息对象
 * @return: request 对象
 */
export function saveUserDetaiById(data) {
    return request({
        url: `/sys/user/${data.id}`,
        method: 'put',
        data
    })
}

/**
 * @description: 获取员工个人信息
 * @param {Number} id 用户id
 * @return: request 对象
 */
export function getPersonalInfo(id) {
    return request({
        url: `/employees/${id}/personalInfo`
    })
}

/**
 * @description: 更新员工个人信息
 * @param {Object} data 员工信息对象
 * @return: request 对象
 */
export function updatapersonalInfo(data) {
    return request({
        url: `/employees/${data.userid}/personalInfo`,
        method: 'put',
        data
    })
}

/**
 * @description: 获取员工岗位信息
 * @param {Number} id 用户id
 * @return: request 对象
 */
export function getJobsInfo(id) {
    return request({
        url: `/employees/${id}/jobs`
    })
}

/**
 * @description: 更新员工岗位信息
 * @param {Object} data 岗位信息对象
 * @return: request 对象
 */
export function updataJobs(data) {
    return request({
        url: `/employees/${data.userid}/jobs`,
        method: 'put',
        data
    })
}

/**
 * @description: 分配角色
 * @param {Object} data 角色信息对象
 * @return: request 对象
 */
export function assignRoles(data) {
    return request({
        url: '/sys/user/assignRoles',
        method: 'put',
        data
    })
}