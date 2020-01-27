import { request, config } from 'utils';

const { api } = config;
const { forgetPwd } = api;

export function forgetPassword(data) {
  return request({
    url: forgetPwd,
    method: 'post',
    data
  });
}
