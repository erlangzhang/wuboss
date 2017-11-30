import queryStr from 'querystring';
import request from './request';
import functionPool from './functionPool';
import axios from 'axios';
class ContentStore {

    constructor() {}

    //获取发布历史列表 get
    list(params) {
        const url = `/wushu/api/columnTree/release`;
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    release(body) {
        const url = `/wushu/api/columnTree/release`;
        return request(url, body).then(functionPool.package201);
    }

    updateRelease(id, body) {
        const url = `/wushu/api/columnTree/release/${id}`;
        return request(url, body).then(functionPool.package200);
    }

    retrieveRelease(id) {
        const url = `/wushu/api/columnTree/release/${id}`;
        return request(url).then(functionPool.package200);
    }

    //栏目列表
    listItem(params) {
        const url = `/wushu/api/column`;
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    //栏目树列表 
    listItemTree(params) {
        const url = `/wushu/api/columnTree`;
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    createColumnTree(body) {
        const url = `/wushu/api/columnTree`;
        return request(`${url}`, body).then(functionPool.package201);
    }
    updateColumnTree(id, body) {
        const url = `/wushu/api/columnTree/${id}`;
        return request(`${url}`, body).then(functionPool.package200);
    }
    retrieveColumnTree(id) {
        const url = `/wushu/api/columnTree/${id}`;
        return request(`${url}?extension=true`).then(functionPool.package200);
    }

    //获取发布详情
    getReleaseDetail(id) {
        const url = `/wushu/api/columnTree/release/${id}`;
        return request(`${url}`).then(functionPool.package200);
    }

    //创建栏目 post
    publishItem(params) {
        const url = `/wushu/api/column`;
        return request(`${url}`, params).then(functionPool.package201);
    }

    //更新栏目 post
    updateItem(id, body) {
        const url = `/wushu/api/column/${id}`;
        return request(`${url}`, body).then(functionPool.package200);
    }

    //获取栏目信息 get
    getItemInfo(id) {
        const url = `/wushu/api/column/${id}`;
        return request(`${url}`).then(functionPool.package200);
    }

    //批量删除栏目
    batchDeleteContent(idArray) {
        const url = '/wushu/api/column/batchDelete';
        return request(`${url}`, {
            columnIds: idArray
        }).then(functionPool.package200);
    }

    //批量删除栏目树
    batchDeleteColumnTree(idArray) {
        const url = '/wushu/api/columnTree/batchDelete';
        return request(`${url}`, {
            columnTreeIds: idArray
        }).then(functionPool.package200);
    }

    //获取所属办事处列表
    getOfficesData() {
        const url = `/wushu/api/agencys`;
        return request(`${url}`).then(functionPool.package200);
    }

    //获取EPG版本
    getEPGEditionsData() {
        const url = `/wushu/api/epgs`;
        return request(`${url}`).then(functionPool.package200);
    }

    //获取星级
    getHotalStarData() {
        const url = `/wushu/api/grades`;
        return request(`${url}`).then(functionPool.package200);
    }

    listEpgs() {
        const url = `/wushu/api/epgs`;
        return request(`${url}`).then(functionPool.package200);
    }

    listLanguage() {
        const url = `/wushu/api/column/language`;
        return request(`${url}`).then(functionPool.package200);
    }

    listColumnType() {
        const url = `/wushu/api/column/type`;
        return request(`${url}`).then(functionPool.package200);
    }

    // 获取栏目或栏目树的发布内容详情
    retrieveContentDetail(id) {
            const url = `/wushu/api/columnTree/release/${id}`;
            return request(url).then(functionPool.package200);
        }
        // 关联动作
    listMethod() {
        const url = `/wushu/api/service/method`;
        return request(`${url}`).then(functionPool.package200);
    }

    // 本地生活圈
    //发布商户信息 post
    releaseMerchant(body) {
        const url = `/wushu/api/lifecircle/release`;
        return request(url, body).then(functionPool.package201);
    }

    // 更新商户发布信息 post
    updateMerchant(id, body) {
        const url = `/wushu/api/lifecircle/release/${id}`;
        return request(`${url}`, body).then(functionPool.package200);
    }

    // 查询商户的最新发布信息get
    listReleaseMerchant(params) {
        const url = `/wushu/api/lifecircle/release/merchant`;
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    //获取某个指定商户的发布信息 get
    getMerchantRealeaseInfo(id) {
        const url = `/wushu/api/lifecircle/release/${id}`;
        return request(`${url}`).then(functionPool.package200);
    }

    // 查询酒店的商户发布信息 get
    listHotelReleaseMerchant(params) {
        const url = `/wushu/api/lifecircle/release/hotel`;
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    // // 查询指定酒店的商户发布信息 get
    // getHotelMerchantInfo(id) {
    //     const url = `/wushu/api/lifecircle/release/hotel/${id}`;
    //     return request(`${url}`).then(functionPool.package200);
    // } 
    // 查询指定酒店的商户发布信息 get
    getHotelMerchantInfo(params) {
        const url = `/wushu/api/lifecircle/release/hotel/${params.id}`;
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    // 获取商户发布的日志信息 get
    getMerchantRealeaseLogs(params) {
        //HHHH
        const url = `/wushu/api/lifecircle/release/log`;
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    // 获取指定发布的日志详情 get
    getMerchantRealeaseLog(id) {
        const url = `/wushu/api/lifecircle/release/log/${id}`;
        return request(`${url}`).then(functionPool.package200);
    }

    // 创建商户信息 post
    createMerchants(body) {
        const url = `/wushu/api/lifecircle/merchants`;
        return request(url, body).then(functionPool.package201);
    }

    // 获取商户信息 get
    getMerchantInfo(id) {
        const url = `/wushu/api/lifecircle/merchants/${id}`;
        return request(`${url}`).then(functionPool.package200);
    }

    // 更新商户信息 post
    updateMerchantInfo(id, body) {
        const url = `app/api/lifecircle/merchants/${id}`;
        return request(`${url}`, body).then(functionPool.package200);
    }

    // 删除商户信息 delete
    deleteMerchantInfo(id) {
            const url = `/wushu/api/lifecircle/merchants/${id}`;
            return axios.delete(url).then(res => res.data);
            // return request(`${url}`, null, 'delete').then(functionPool.package200);
        }
        //待审核列表商品信息 get
    listUncheckMerchantInfo(params) {
            const url = `/wushu/api/lifecircle/merchants?status=0`;
            return request(`${url}&${queryStr.stringify(params)}`).then(functionPool.package200);
        }
        //已通过列表商品信息 get
    listPassedMerchantInfo(params) {
            const url = `/wushu/api/lifecircle/merchants?status=1`;
            return request(`${url}&${queryStr.stringify(params)}`).then(functionPool.package200);
        }
        //驳回列表商品信息 get
    listRejectedMerchantInfo(params) {
            const url = `/wushu/api/lifecircle/merchants?status=2`;
            return request(`${url}&${queryStr.stringify(params)}`).then(functionPool.package200);
        }
        // 列表商户信息 get
    listMerchantInfo(params) {
        const url = `/wushu/api/lifecircle/merchants`;
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    // 修改商户状态 post
    updateMerchantStatus(id, body) {
        const url = `/wushu/api/lifecircle/merchants/${id}/status`;
        return request(`${url}`, body).then(functionPool.package200);
    }

    // 所有分类列表 get
    listAllCategory() {
        const url = `/wushu/api/lifecircle/category`;
        return request(`${url}`).then(functionPool.package200);
    }

}

module.exports = new ContentStore();
