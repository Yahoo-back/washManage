import { request, config } from 'utils'
const { api } = config
const {
  deviceDetail,
  deviceOrder,
  deviceReservation,
  selectEvaluation,
  selectUseAppointment,
  deviceAddAppointment
} = api

export function detail(params) {
  return request({
    url: deviceDetail,
    method: 'post',
    data: params,
  })
}
export function order(params) {
  return request({
    url: deviceOrder,
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
export function evaluation(params) {
  return request({
    url: selectEvaluation,
    method: 'post',
    data: params,
  })
}
export function selectAppointment(params) {
  return request({
    url: selectUseAppointment,
    method: 'post',
    data: params,
  })
}
export function deviceAppointment(params) {
  return request({
    url: deviceAddAppointment,
    method: 'post',
    data: params,
  })
}