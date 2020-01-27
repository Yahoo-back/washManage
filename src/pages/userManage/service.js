import { request, config } from 'utils'

const { api } = config
const { userList, evaluationList, evaluationExport, listOnUseCoupon, pushUserCoupon, userExport, storepull } = api

export function Ulist(params) {
  return request({
    url: userList,
    method: 'post',
    data: params,
  })
}
export function stPull(params) {
  return request({
    url: storepull,
    method: 'post',
    data: params,
  })
}
export function Elist(params) {
  return request({
    url: evaluationList,
    method: 'post',
    data: params,
  })
}
export function evaExport(params) {
  return request({
    url: evaluationExport,
    method: 'post',
    data: params,
  })
}
export function usExport(params) {
  return request({
    url: userExport,
    method: 'post',
    data: params,
  })
}
export function listCoupon(params) {
  return request({
    url: listOnUseCoupon,
    method: 'post',
    data: params,
  })
}
export function pushCoupon(params) {
  return request({
    url: pushUserCoupon,
    method: 'post',
    data: params,
  })
}