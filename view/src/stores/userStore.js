/*
 * @Author: Zz
 * @Date: 2017-03-28 10:49:07
 * @Last Modified by: Zz
 * @Last Modified time: 2017-04-06 18:52:10
 */
import queryStr from 'querystring';
import request from './request';
import functionPool from './functionPool';

class UserStore {
    constructor() {}

    list(params) {
        const url = '/wushu/api/accounts';
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    createAccount(body) {
        const url = `/wushu/api/accounts`;
        return request(url, body).then(functionPool.package200);
    }

    updateAccount(id, body) {
        const url = `/wushu/api/accounts/${id}`;
        return request(url, body).then(functionPool.package200);
    }
    
    updateAccountPwd(id, body) {
      const url = `/wushu/api/accounts/${id}/password`;
      return request(url, body).then(functionPool.package200);
    }

    retrieveAccount(id) {
        const url = `/wushu/api/accounts/${id}`;
        return request(url).then(functionPool.package200);
    }

    batchDeleteAccount(idArray) {
        const url = '/wushu/api/accounts/batchDelete';
        return request(`${url}`, {
            id: idArray
        }).then(functionPool.package200);
    }

    updateAccountStatus(idArray, status) {
        const url = '/wushu/api/accountStatus';
        return request(`${url}`, {
            id: idArray,
            status
        }).then(functionPool.package200);
    }

    listPermisson(params) {
        const url = `/wushu/api/permissions`;
        return request(`${url}${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    listRoles(params) {
        const url = '/wushu/api/roles';
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    createRole(body) {
        const url = `/wushu/api/roles`;
        return request(url, body).then(functionPool.package200);
    }

    retrieveRole(id) {
        const url = `/wushu/api/roles/${id}`;
        return request(url).then(functionPool.package200);
    }

    updateRole(id, body) {
        const url = `/wushu/api/roles/${id}`;
        return request(url, body).then(functionPool.package200);
    }

    updateRoleStatus(idArray, status) {
        const url = '/wushu/api/roleStatus';
        return request(`${url}`, {
            id: idArray,
            status
        }).then(functionPool.package200);
    }

    batchDeleteRole(idArray) {
        const url = '/wushu/api/roles/batchDelete';
        return request(`${url}`, {
            id: idArray
        }).then(functionPool.package200);
    }



    listLogs(params) {
        const url = '/wushu/api/logs';
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }
}

module.exports = new UserStore();
