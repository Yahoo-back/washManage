const Mock = require('mockjs')
const config = require('../src/utils/config')

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (const item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  // documentation_url: 'http://localhost:8000/request',
  documentation_url: 'http://localhost:8000/request',
}

let postId = 0
const posts = Mock.mock({
  'data|100': [
    {
      id () {
        postId += 1
        return postId + 25324558
      },
      "id|+1": 1,
      admin: '@cname',
      ACname:'A11B',
      "line|1-2": 1,
      'yue|1-2': 1,
      'statuscode|1-4':1,
      phone: '13570985858',
      time: '09:00',
      date: '@date',
    },
  ],
}).data

module.exports = {
  queryArray,
  NOTFOUND,
  Mock,
  posts,
  config,
}
