
import request from './request';
import functionPool from './functionPool';

const root = '/wushu/api';
//const root = 'http://dev.console.utuapp.cn/wushu/api';

class VodHomeStore {

    constructor() {

    }

    /**
     * 新增发布vod首页
     * @param {*} body 
     */
    createRelease(body) {
        console.log('createRelease', body);
        return request(`${root}/vod/portalconf`, body).then(functionPool.package200);
    }

    /**
     * 获取单条发布
     * @param {*} id 
     */
    getRelease(id) {
        return request(`${root}/vod/portalconf/${id}`).then(functionPool.package200);
    }

    /**
     * 获取发布列表
     * @param {*} params 
     */
    getReleaseList(params) {
        let str = `page=${params.page}&limit=${params.limit}`;
        if (params.search && params.search.length > 0) {
            str += `&search=${params.search}`;
        }
        if (params.sort && params.sort.length > 0) {
            str += `&sort=${params.sort}`;
        }
        return request(`${root}/vod/portalconf?${str}`).then(functionPool.package200);
    }

    /**
     * 删除单条发布
     * @param {*} id 
     */
    deleteRelease(id) {
        return request(`${root}/vod/portalconf/${id}`, null, 'DELETE').then(functionPool.package200);
    }

    /**
     * 获取酒店维度发布列表
     * @param {*} params 
     */
    getHotelReleaseList(params) {
        let str = `page=${params.page}&limit=${params.limit}`;
        if (params.search && params.search.length > 0) {
            str += `&search=${params.search}`;
        }
        if (params.sort && params.sort.length > 0) {
            str += `&sort=${params.sort}`;
        }
        return request(`${root}/vod/hotelportal?${str}`).then(functionPool.package200);
    }

    /**
     * 获取单条酒店发布
     * @param {*} id 
     */
    getHotelRelease(id) {
        return request(`${root}/vod/hotelportal/${id}`).then(functionPool.package200);
    }    

    /**
     * 获取发布记录列表
     * @param {*} params 
     */
    getReleaseLogList(params) {
        let str = `page=${params.page}&limit=${params.limit}`;
        if (params.search && params.search.length > 0) {
            str += `&hotel=${params.search}`;
        }
        if (params.sort && params.sort.length > 0) {
            str += `&sort=${params.sort}`;
        }
        if (params.dateRange && params.dateRange.length > 0) {
            str += `&dateRange=${params.dateRange}`;
        }
        if (params.operatorId && params.operatorId.length > 0) {
            str += `&operatorId=${params.operatorId}`;
        }
        return request(`${root}/vod/portalconflog?${str}`).then(functionPool.package200);
    }

}

module.exports = new VodHomeStore();