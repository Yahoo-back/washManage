import { request, config } from 'utils'

const { api } = config
const {  storeAdd,storeAvator} = api

export function add (params) {
  return request({
    url: storeAdd,
    method: 'post',
    data: params,
  })
}
export function avator (params) {
  return request({
    url: storeAvator,
    method: 'post',
    data: params,
  })
}