import request from './request';
import functionPool from './functionPool';
import axios from 'axios';
import moment from 'moment';

const root = '/wushu/api';
//const root = 'http://dev.console.utuapp.cn/wushu/api';

class MediaStore {

    constructor() {

    }

    /************************** 媒资管理-待入库/影片库 **************************/

    /**
     * 获取影片列表
     * @param params
     * @returns {Promise.<TResult>|*}
     */
    getFilmlList(params) {
        let str = `page=${params.page}&limit=${params.limit}`;
        if (params.search && params.search.length > 0) {
            str += `&search=${params.search}`;
        }
        if (params.sort && params.sort.length > 0) {
            str += `&sort=${params.sort}`;
        }
        if (params.status && params.status.length > 0) {
            str += `&status=${params.status}`;
        }
        if (params.category) {
            str += `&category=${params.category}`;
        }
        return request(`${root}/media/films?${str}`).then(functionPool.package200);
    }

    /**
     * 获取单个影片详情
     * @param {*} id 
     * @returns {Promise.<TResult>|*}
     */
    getFilm(id) {
        return request(`${root}/media/films/${id}`).then(functionPool.package200);
    }

    /**
     * 编辑影片详情
     * @param {*} id 
     * @param {*} body 
     */
    updateFilm(id, body) {
        return request(`${root}/media/films/${id}`, body).then(functionPool.package200);
    }

    /**
     * 编辑影片详情信息
     * @param {*} id 
     * @param {*} body 
     */
    updateFilmLanguageInfo(id, body) {
        return request(`${root}/media/films/${id}/description`, body).then(functionPool.package200);
    }

    /**
     * 编辑影片运营信息
     * @param {*} id 
     * @param {*} body 
     */
    updateFilmOperationInfo(id, body) {
        return request(`${root}/media/films/${id}/operation`, body).then(functionPool.package200);
    }

    /**
     * 获取视频分类列表
     */
    getCategoryList() {
        return request(`${root}/media/films/category`).then(functionPool.package200);
    }

    /**
     * 删除影片
     * @param id
     * @returns {*|Promise.<TResult>}
     */
    deleteFilm(body) {
        return request(`${root}/media/films/batchDelete`, body).then(functionPool.package200);
    }

    /**
     * 更新影片类型排序
     * @param {*} id 
     * @param {*} categoryId 
     * @param {*} sequence 
     */
    updateFilmCategorySequence(id, categoryId, sequence) {
        return request(`${root}/media/films/${id}/sequence`, {
            categoryId: categoryId,
            sequence: sequence
        }).then(functionPool.package200);
    }

    /**
     * 批量更新影片状态
     * @param {*} body 
     */
    batchUpdateFilmStatus(body) {
        return request(`${root}/media/filmsStatus`, body).then(functionPool.package200);
    }

    /**
     * 下发影片
     * @param {*} body 
     */
    releaseFilms(body) {
        return request(`${root}/media/films/release`, body).then(functionPool.package200);
    }

    /**
     * 影片下发情况列表
     * @param {*} id 
     * @param {*} params 
     */
    getFilmReleaseList(id, params) {
        let str = ``;
        if (params.search && params.search.length > 0) {
            str += `&search=${params.search}`;
        }
        if (params.city && params.city.length > 0) {
            str += `&city=${params.city}`;
        }
        return request(`${root}/media/films/${id}/release?${str}`).then(functionPool.package200);
    }

    /************************** 媒资管理-专题管理 **************************/

    /**
     * 获取专题列表
     * @param params
     * @returns {Promise.<TResult>|*}
     */
    getTopicList(params) {
        let str = `page=${params.page}&limit=${params.limit}`;
        if (params.search && params.search.length > 0) {
            str += `&search=${params.search}`;
        }
        if (params.sort && params.sort.length > 0) {
            str += `&sort=${params.sort}`;
        }
        return request(`${root}/media/subjects?${str}`).then(functionPool.package200);
    }

    getTopic(id) {
        return request(`${root}/media/subjects/${id}`).then(functionPool.package200);
    }

    /**
     * 新增专题
     * @param {*} body 
     */
    createTopic(body) {
        return request(`${root}/media/subjects`, body).then(functionPool.package201);
    }

    /**
     * 修改专题
     * @param {*} id 
     * @param {*} body 
     */
    updateTopic(id, body) {
        return request(`${root}/media/subjects/${id}`, body).then(functionPool.package200);
    }

    /**
     * 删除专题
     * @param id
     * @returns {*|Promise.<TResult>}
     */
    deleteTopic(id) {
        return axios.delete(`${root}/media/subjects/${id}`).then(res => res.data);
    }

    /**
     * 批量更新专题状态
     * @param {*} body 
     */
    batchUpdateTopicStatus(body) {
        return request(`${root}/media/subjectStatus`, body).then(functionPool.package200);
    }

    /**
     * 根据id获取跳转动作名称
     * 0：待入库 1：待审核 2：审核通过 3：审核1 4：审核2 5：驳回 6：上线 7：下线 8：待上线
     * @param id
     * @returns {*}
     */
    getFilmStatue(id) {
        switch(id){
            case 0:
                return '待入库'
            case 1:
                return '待审核'
            case 2:
                return '审核通过'
            case 3:
                return '审核1'
            case 4:
                return '审核2'
            case 5:
                return '驳回'
            case 6:
                return '上线'
            case 7:
                return '下线'
            case 8:
                return '待上线'
        }
    }

    /**
     * 是否免费
     * 0:付费，1:免费
     * @param id
     * @returns {*}
     */
    isFree(id) {
        switch(id){
            case 0:
                return '付费'
            case 1:
                return '免费'
            default:
                return ''
        }
    }

    /**
     * 是否监管
     * 0:否 1:是
     * @param id
     * @returns {*}
     */
    isCa(id) {
        switch(id){
            case 0:
                return '否'
            case 1:
                return '是'
            default:
                return ''
        }
    }

    /**
     * 日期格式化
     * @param unix
     * @returns {string}
     */
    renderTime_YYYYMMDDHHMM(unix) {
        return moment(unix * 1000).format('YYYY-MM-DD HH:mm');
    }

    getLanguagesByCodes(langCodes) {
        let languages = [
            {label:"简体中文", name:"chi"},
            {label:"英文", name:"eng"},
            {label:"日文", name:"jpn"},
            {label:"韩文", name:"kor"},
        ];

        return langCodes.map(code => {
            for (let item of languages) {
                if (item.name == code) {
                    return item.label;
                }
            }
        });
    }

}

module.exports = new MediaStore();