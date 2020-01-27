import { request, config } from 'utils'

const { api } = config
const { storeDetail, storeUpdate, storeInfoOrderList, orderEvaluation } = api

export function detail(params) {
  return request({
    url: storeDetail,
    method: 'post',
    data: params,
  })
}
export function list(params) {
  return request({
    url: storeInfoOrderList,
    method: 'post',
    data: params,
  })
}
export function update(params) {
  return request({
    url: storeUpdate,
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