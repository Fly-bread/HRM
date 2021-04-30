import request from '@/utils/request'

// axios 中 body参数放于data中 查询参数 query参数 放于parmas中

/**
* @description: 获取角色列表
* @param {Object} params 分页信息
* @return: request 对象
*/
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
* @description: 获取企业信息
* @param {Number} companyId 企业id
* @return: request 对象
*/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

/**
* @description: 删除角色
* @param {Number} id
* @return: request 对象
*/
export function removeRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

/**
* @description: 更新角色
* @param {Object} data 角色详情对象
* @param {Number} id
* @return:request 对象
*/
export function updataRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

/**
* @description: 获取角色详情
* @param {Number} id
* @return: request 对象
*/
export function getRoleDetails(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
* @description: 新增角色
* @param {Object} data 角色信息对象
* @return: request 对象
*/
export function addRole(data) {
  console.log(data)
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

/**
* @description: 给角色分配权限
* @param {Object} data 权限信息对象
* @return: request 对象
*/
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
