const qs = require('qs');
const Mock = require('mockjs');
const config = require('../src/utils/config');

const { apiPrefix } = config;

let usersListData = Mock.mock({});

let database = usersListData.data;

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer'
};

const userPermission = {
  DEFAULT: {
    visit: [
      '1',
      '2',
      '21',
      '3',
      '31',
      '4',
      '41',
      '5',
      '51',
      '52',
      '6',
      '61',
      '7',
      '71',
      '8',
      '81',
      '82',
      '9',
      '91',
      '10',
      '101',
      '102',
      '103',
    ],
    role: EnumRoleType.DEFAULT
  },
  ADMIN: {
    role: EnumRoleType.ADMIN
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER
  }
};

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    permissions: userPermission.ADMIN
  },
  {
    id: 1,
    username: 'guest',
    password: 'guest',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    permissions: userPermission.DEFAULT
  },
  {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    permissions: userPermission.DEVELOPER
  }
];

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  let data;

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item;
      break;
    }
  }

  if (data) {
    return data;
  }
  return null;
};

const NOTFOUND = {
  message: 'Not Found'
};

module.exports = {
  [`POST ${apiPrefix}/user/login`](req, res) {
    const { username, password } = req.body;
    const user = adminUsers.filter(item => item.username === username);

    if (user.length > 0 && user[0].password === password) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true
      });
      res.json({ success: true, message: 'Ok' });
    } else {
      res.status(400).end();
    }
  },

  [`GET ${apiPrefix}/user/logout`](req, res) {
    res.clearCookie('token');
    res.status(200).end();
  },

  [`GET ${apiPrefix}/user`](req, res) {
    const cookie = req.headers.cookie || '';
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
    const response = {};
    const user = {};
    if (!cookies.token) {
      res.status(200).send({ message: 'Not Login' });
      return;
    }
    const token = JSON.parse(cookies.token);
    if (token) {
      response.success = token.deadline > new Date().getTime();
    }
    if (response.success) {
      const userItem = adminUsers.filter(_ => _.id === token.id);
      if (userItem.length > 0) {
        user.avatar = userItem[0].avatar;
        user.permissions = userItem[0].permissions;
        user.username = userItem[0].username;
        user.id = userItem[0].id;
      }
    }
    response.user = user;
    res.json(response);
  },

  [`GET ${apiPrefix}/users`](req, res) {
    const { query } = req;
    let { pageSize, page, ...other } = query;
    pageSize = pageSize || 10;
    page = page || 1;

    let newData = database;
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter(item => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1);
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime();
              const end = new Date(other[key][1]).getTime();
              const now = new Date(item[key]).getTime();

              if (start && end) {
                return now >= start && now <= end;
              }
              return true;
            }
            return (
              String(item[key])
                .trim()
                .indexOf(decodeURI(other[key]).trim()) > -1
            );
          }
          return true;
        });
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length
    });
  },

  [`POST ${apiPrefix}/users/delete`](req, res) {
    const { ids } = req.body;
    database = database.filter(item => !ids.some(_ => _ === item.id));
    res.status(204).end();
  },

  //与util/config.js接口连接获取数据
  [`POST ${apiPrefix}/user`](req, res) {
    const newData = req.body;
    newData.createTime = Mock.mock('@now');
    newData.id = Mock.mock('@id');
    database.unshift(newData);
    res.status(200).end();
  },

  [`POST ${apiPrefix}/user`](req, res) {
    const newData = req.body;
    newData.createTime = Mock.mock('@now');
    newData.id = Mock.mock('@id');
    database.unshift(newData);
    res.status(200).end();
  }
};
