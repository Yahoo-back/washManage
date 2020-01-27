import { request, config } from 'utils';

const { api } = config;
const { userLogin, sendEmail } = api;

export function login(data) {
  return request({
    url: userLogin,
    method: 'post',
    data
  });
}

export function getEmail(data) {
  return request({
    url: sendEmail,
    method: 'post',
    data
  });
}
