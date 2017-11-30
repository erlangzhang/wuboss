/*
 * @Author: Zz
 * @Date: 2017-03-28 10:49:07
 * @Last Modified by: Zz
 * @Last Modified time: 2017-03-29 11:29:24
 */
import queryStr from 'querystring';
import request from './request';
import functionPool from './functionPool';

class LoginStore {
  constructor() {}

  list(params) {
    return request(`/wushu/api/accounts?${queryStr.stringify(params)}`).then(res => {
      if (res.status !== 200) {
        return res.json().then(rst => {
          throw new Error(`[${rst.code}] ${rst.message}`);
        });
      }
      return res.json();
    });
  }

  listPermisson(params) {
    const url = '/wushu/api/permissions';
    return request(`${url}${queryStr.stringify(params)}`).then(functionPool.package200);
  }

  retrieveCode(params) {
    // 获取认证码
    const url = '/wushu/api/login/captcha';
    return request(`${url}${queryStr.stringify(params)}`).then(functionPool.package200);
  }
}

module.exports = new LoginStore();