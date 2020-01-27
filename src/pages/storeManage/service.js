import { request, config } from 'utils'

const { api } = config
const { storeList, storeDelete, chinaArea, storeExport } = api

export async function list(params) {
  return request({
    url: storeList,
    method: 'post',
    data: params,
  })
}

export function del(params) {
  return request({
    url: storeDelete,
    method: 'post',
    data: params,
  })
}
export function area(params) {
  return request({
    url: chinaArea,
    method: 'post',
    data: params,
  })
}
export function stExport(params) {
  return request({
    url: storeExport,
    method: 'post',
    data: params,
  })
}
