import { message } from 'antd';

const errorMsg = {
	//系统提示
	'401': '无权限',
	'505': '未登录',
	//用户提示
	'509': '用户名或者密码有误',
	'518': '您的账号已暂停使用，请联系管理员',
	'519': '账号不存在',
}

export const isSuccess = (data) => {
	const { code } = data;
	if (code == 200) return true
	if (errorMsg[code]) message.error(errorMsg[code]);
	return false;
}
