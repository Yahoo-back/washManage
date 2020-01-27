import { request, config } from 'utils'

const { api } = config
const { userInfo, userOrder, appointmentOrder, userCoupon, allotUserCoupon, listOnUseCoupon, orderEvaluation } = api

export function info(params) {
  return request({
    url: userInfo,
    method: 'post',
    data: params,
  })
}
export function orderList(params) {
  return request({
    url: userOrder,
    method: 'post',
    data: params,
  })
}
export function appointmentList(params) {
  return request({
    url: appointmentOrder,
    method: 'post',
    data: params,
  })
}
export function useredCoupon(params) {
  return request({
    url: userCoupon,
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
export function allot(params) {
  return request({
    url: allotUserCoupon,
    method: 'post',
    data: params,
  })
}
export function evaluation(params) {
  return request({
    url: orderEvaluation,
    method: 'post',
    data: params,
  })
}