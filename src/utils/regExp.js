/**
 * 正则表达式
 */
export const userExp = {
    exp: /^[^\u4e00-\u9fa5]{5,18}$/,
    des: '5-18个字符（只能包含英文字母、数字、特殊符号）'
};
export const pwdExp = {
    exp: /^[^\u4e00-\u9fa5]{6,18}$/,
    des: '密码长度为6-18个字符，只能输入数字、英文字母或英文标点符号、不能包含空格'
};
export const mobileExp = {
    exp: /^1[34578]\d{9}$/,
    des: '请输入正确的手机号'
};
export const emailExp = {
    exp: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
    des: '请输入正确的邮箱'
};
export const adrExp = {
    exp: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/,
    des: '链接格式填写不正确'
};
export const hcAccountExp = {
    exp: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$|^\+861[34578]\d{9}$/,
    des: '请输入正确的+86手机号或邮箱'
};
export const nickName = {
    exp: /^[a-zA-Z0-9\u4e00-\u9fa5]{5,18}$/,
    des: '5-18个字符（只能包含中、英文、字母、数字）'
};
export const inputNum = {
    exp: /^[1-9]\d*$/
};
