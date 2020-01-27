import { request, config } from 'utils'

const { api } = config
const { deviceFastigium, income, programRate, userEvaluation, storePull } = api

export function getDeviceFastigium(params) {
  return request({
    url: deviceFastigium,
    method: 'post',
    data: params,
  })
}

export function getIncome(params) {
  return request({
    url: income,
    method: 'post',
    data: params,
  })
}

export function getProgramRate(params) {
  return request({
    url: programRate,
    method: 'post',
    data: params,
  })
}

export function getUserEvaluation(params) {
  return request({
    url: userEvaluation,
    method: 'post',
    data: params,
  })
}

export function getStoreOptions(params) {
  return request({
    url: storePull,
    method: 'post',
    data: params,
  })
}
