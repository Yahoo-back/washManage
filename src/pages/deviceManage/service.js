import { request, config } from 'utils'

const { api } = config
const { posts, deviceList, deviceDetail, deviceOrder, deviceReservation, storepull } = api
export function stPull(params) {
  return request({
    url: storepull,
    method: 'post',
    data: params,
  })
}
export function query(params) {
  return request({
    url: posts,
    method: 'get',
    data: params,
  })
}
export function list(params) {
  return request({
    url: deviceList,
    method: 'post',
    data: params,
  })
}
export function reservation(params) {
  return request({
    url: deviceReservation,
    method: 'post',
    data: params,
  })
}
