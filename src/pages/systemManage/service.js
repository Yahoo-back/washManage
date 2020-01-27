import { request, config } from 'utils'

const { api } = config
const {
  accountList,
  accountDetail,
  accountUpdateStatus,
  accountDelete,
  rolePull,
  accountAdd,
  accountUpdate,
  storePull,

  checkInfomation,
  resetPwd,
  changeInfomation,

  roleList,
  roleDetail,
  roleAdd,
  roleDelete,
  roleUpdate,

  permissionList,
  sysPermissionAdd,
  sysPermissionUpdate,
  sysPermissionDelete,

  sysConfigList,
  sysConfigAdd,
  sysConfigUpdate,
  sysConfigDelete,
} = api

// 账号管理模块
// 获取系统账号列表
export function getAccountList(params) {
  return request({
    url: accountList,
    method: 'post',
    data: params,
  })
}
// 获取系统账号详情
export function getAccountDetail(params) {
  return request({
    url: accountDetail,
    method: 'post',
    data: params,
  })
}
// 获取角色下拉列表
export function getRolePull(params) {
  return request({
    url: rolePull,
    method: 'post',
    data: params,
  })
}
// 停用系统账号
export function stopAccount(params) {
  return request({
    url: accountUpdateStatus,
    method: 'post',
    data: params,
  })
}
// 删除系统账号
export function deleteAccount(params) {
  return request({
    url: accountDelete,
    method: 'post',
    data: params,
  })
}
// 添加系统账号
export function addAccount(params) {
  return request({
    url: accountAdd,
    method: 'post',
    data: params,
  })
}
// 更新系统账号
export function updateAccount(params) {
  return request({
    url: accountUpdate,
    method: 'post',
    data: params,
  })
}
// 获取门店
export function getStoreOptions(params) {
  return request({
    url: storePull,
    method: 'post',
    data: params,
  })
}

// 个人中心模块
// 获取个人信息详情
export function checkInfo(params) {
  return request({
    url: checkInfomation,
    method: 'post',
    data: params,
  })
}
// 密码重置
export function resetPassword(params) {
  return request({
    url: resetPwd,
    method: 'post',
    data: params,
  })
}
// 修改个人信息
export function changeInfo(params) {
  return request({
    url: changeInfomation,
    method: 'post',
    data: params,
  })
}

// 角色管理模块
// 获取角色列表
export function getRoleList(params) {
  return request({
    url: roleList,
    method: 'post',
    data: params,
  })
}
// 获取角色详情
export function getRoleDetail(params) {
  return request({
    url: roleDetail,
    method: 'post',
    data: params,
  })
}
// 添加角色
export function addRole(params) {
  return request({
    url: roleAdd,
    method: 'post',
    data: params,
  })
}
// 删除角色
export function deleteRole(params) {
  return request({
    url: roleDelete,
    method: 'post',
    data: params,
  })
}
// 更新角色
export function updateRole(params) {
  return request({
    url: roleUpdate,
    method: 'post',
    data: params,
  })
}

// 权限管理模块
// 获取权限列表
export function getPermissionList(params) {
  return request({
    url: permissionList,
    method: 'post',
    data: params,
  })
}
// 添加权限
export function addPermission(params) {
  return request({
    url: sysPermissionAdd,
    method: 'post',
    data: params,
  })
}
// 删除权限
export function deletePermission(params) {
  return request({
    url: sysPermissionDelete,
    method: 'post',
    data: params,
  })
}
// 更新权限
export function updatePermission(params) {
  return request({
    url: sysPermissionUpdate,
    method: 'post',
    data: params,
  })
}

// 系统配置模块
// 获取配置列表
export function getConfigList(params) {
  return request({
    url: sysConfigList,
    method: 'post',
    data: params,
  })
}
// 添加配置
export function addConfig(params) {
  return request({
    url: sysConfigAdd,
    method: 'post',
    data: params,
  })
}
// 删除配置
export function deleteConfig(params) {
  return request({
    url: sysConfigDelete,
    method: 'post',
    data: params,
  })
}
// 更新配置
export function updateConfig(params) {
  return request({
    url: sysConfigUpdate,
    method: 'post',
    data: params,
  })
}