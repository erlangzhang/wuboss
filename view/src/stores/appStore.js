import queryStr from 'querystring';
import functionPool from './functionPool';
import request from './request';

class AppStore {
    constructor() {}

    get token() {
        return sessionStorage.getItem('jwt:token');
    }

    set token(val) {
        sessionStorage.setItem('jwt:token', val);
    }

    get payload() {
        const data = sessionStorage.getItem('jwt:payload');
        return data ? JSON.parse(data) : null;
    }

    set payload(val) {
        sessionStorage.setItem('jwt:payload', val ? JSON.stringify(val) : val);
    }

    get username() {
        const data = localStorage.getItem('userSave');
        return data;
    }
    get pwd() {
        const data = localStorage.getItem('pwdSave');
        return data;
    }

    saveLocalUser(val) {
        localStorage.setItem('userSave', val);
    }
    saveLocalPwd(val) {
        localStorage.setItem('pwdSave', val);
    }

    isLogin() {
        if (this.token === 'undefined' || this.token === 'null') {
            return false;
        }
        return !!this.token;
    }

    login(params) {
        return request('/wushu/api/login', params).then(functionPool.package200);
    }

    logout(id) {
        return request('/wushu/api/logout/', { id }).then(functionPool.package200);
    }
}

module.exports = new AppStore()
