import { request, config } from 'utils'
const { api } = config;
const { chinaArea} = api;

export async function queryArea(params) {
  return request({
    url: chinaArea,
    method: 'post',
    data: params,
  });
}