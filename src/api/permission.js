import request from '@/utils/request'

/**
* @description: 获取所有权限点
* @param {Object} params query参数对象
* @return: request 对象
*/
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params
  })
}

/**
* @description: 添加权限点
* @param {Object} data 权限数据对象
* @return: request 对象
*/
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

/**
* @description: 根据ID更新权限点详情
* @param {Object}  data 更新的数据对象
* @return: request 对象
*/
export function updataPermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

/**
* @description: 根据id删除权限点
* @param {Number} id
* @return: request 对象
*/
export function removePermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}

/**
* @description: 根据ID获取权限点详情
* @param {Number} id
* @return: request 对象
*/
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}
