import { request, config } from 'utils'
const { api } = config
const { addAppointment, deleteAppointment, editAppointment, listAppointment } = api
export function list(params) {
  return request({
    url: listAppointment,
    method: 'post',
    data: params,
  })
}
export function add(params) {
  return request({
    url: addAppointment,
    method: 'post',
    data: params,
  })
}
export function del(params) {
  return request({
    url: deleteAppointment,
    method: 'post',
    data: params,
  })
}
export function edit(params) {
  return request({
    url: editAppointment,
    method: 'post',
    data: params,
  })
}