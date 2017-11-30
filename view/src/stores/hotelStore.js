/*
 * @Author: Zz
 * @Date: 2017-03-17 12:55:16
 * @Last Modified by: Hedgehog
 * @Last Modified time: 2017-04-17 14:48:14
 */
import queryStr from 'querystring';
import request from './request';
import functionPool from './functionPool';
const root = '/wushu/api';
class HotelStore {

    constructor() {}

    //获取省市区数据
    getAreaList(params = {}) {
        const url = `${root}/areas`;
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    //获取酒店等级数据
    getGradList(params = {}) {
        const url = `${root}/grades`;
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    // 获取酒店列表
    getHotelList(params = {}) {
        const url = `${root}/hotels`;
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    // 修改酒店状态
    changeHotelStatus(params = {}) {
        const url = `${root}/hotelStatus`;
        return request(url, params).then(functionPool.package200);
    }

    // 获取酒店详情
    getHotelDetail(id) {
        const url = `${root}/hotels/${id}`;
        return request(url).then(functionPool.package200);
    }

    // 获取酒店星级
    getGrades() {
        const url = `${root}/grades`;
        return request(url).then(functionPool.package200);
    }

    // 获取EPG版本 
    getEPGVersions() {
        const url = `${root}/epgs`;
        return request(url).then(functionPool.package200);
    }

    // 获取办事处列表
    getAgencys() {
        const url = `${root}/agencys`;
        return request(url).then(functionPool.package200);
    }

    // 获取EPG版本、酒店星级、酒店等级、办事处、携程星级的集合
    getHotelDataSource() {
        const url = `${root}/hotel/dataSource`;
        return request(url).then(functionPool.package200);
    }

    // 新建酒店
    newHotel(data) {
        const url = `${root}/hotels`;
        return request(url, data).then(functionPool.package200);
    }

    // 保存编辑酒店
    saveHotel({ data, id } = { id: '', data: {} }) {
        const url = `${root}/hotels/${id}`;
        return request(url, data).then(functionPool.package200);
    }

    // 获取酒店分组列表
    getCategoryList(params = {}) {
        const url = `${root}/hotel/groups`;
        return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
    }

    // 修改酒店分组状态
    changeCategoryStatus(params = {}) {
        const url = `${root}/hotel/groupStatus`;
        return request(url, params).then(functionPool.package200);
    }

    // 获取酒店分组详情
    getCategoryDetail(id) {
        const url = `${root}/hotel/groups/${id}`;
        return request(url).then(functionPool.package200);
    }

    // 新建酒店分组
    newCategory(data) {
        const url = `${root}/hotel/groups`;
        return request(url, data).then(functionPool.package200);
    }

    // 保存编辑酒店分组
    saveCategory({ data, id } = { id: '', data: {} }) {
        const url = `${root}/hotel/groups/${id}`;
        return request(url, data).then(functionPool.package200);
    }

}

module.exports = new HotelStore();
