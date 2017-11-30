import request from './request';
import functionPool from './functionPool';
import axios from 'axios';

const root = '/wushu/api';
// const root = 'http://dev.console.utuapp.cn/wushu/api';

class MainMenuStore {

    constructor() {

    }

    /************************** 主菜单管理-素材管理 **************************/

    /**
     * 获取素材列表信息
     * @param params
     * @returns {Promise.<TResult>|*}
     */
    getMMMaterialList(params) {
        console.log("----" + JSON.stringify(params))
        let str = `page=${params.page}&limit=${params.limit}`;
        if (params.search && params.search.length > 0) {
            str += `&search=${params.search}`;
        }
        if (params.sort && params.sort.length > 0) {
            str += `&sort=${params.sort}`;
        }
        if ("" != params.actionType) {
            str += `&actionType=${params.actionType}`;
        }
        return request(`${root}/mainmenu/material?${str}`).then(functionPool.package200);
    }

    /**
     * 新增主菜单素材
     * @param body
     * @returns {Promise.<TResult>|*}
     */
    createMaterial(body) {
        return request(`${root}/mainmenu/material`, body).then(functionPool.package201);
    }

    /**
     * 编辑主菜单素材
     * @param body
     * @returns {Promise.<TResult>|*}
     */
    editMaterial(id, body) {
        return request(`${root}/mainmenu/material/${id}`, body).then(functionPool.package201);
    }

    /**
     * 根据id获取主菜单素材详情
     * @param id
     */
    getMaterial(id) {
        return request(`${root}/mainmenu/material/${id}`).then(functionPool.package200);
    }

    /**
     * 删除素材
     * @param id
     * @returns {*|Promise.<TResult>}
     */
    deleteMaterial(id) {
        return axios.delete(`${root}/mainmenu/material/${id}`).then(res => res.data);
    }

    /************************** 主菜单管理-酒店管理 **************************/

    /**
     * 获取酒店列表及酒店的主菜单当前推荐位个数
     * @param params
     * @returns {Promise.<TResult>|*}
     */
    getHotelList(params) {
        let str = `page=${params.page}&limit=${params.limit}`;
        if (params.search && params.search.length > 0) {
            str += `&search=${params.search}`;
        }
        if (params.sort && params.sort.length > 0) {
            str += `&sort=${params.sort}`;
        }
        return request(`${root}/mainmenu/hotel?${str}`).then(functionPool.package200);
    }

    /**
     * 获取属于酒店的素材条目列表
     * @param params
     * @returns {Promise.<TResult>|*}
     */
    getHotelItemList(params) {
        let str = `hostId=${params.hostId}`;
        if (params.search && params.search.length > 0) {
            str += `&search=${params.search}`;
        }
        return request(`${root}/mainmenu/hotel/item?${str}`).then(functionPool.package200);
    }

    /************************** 主菜单管理-发布管理 **************************/

    /**
     * 获取主菜单发布列表
     * @param params
     * @returns {Promise.<TResult>|*}
     */
    getMainMenuReleaseList(params) {
        let str = `page=${params.page}&limit=${params.limit}`;
        if (params.search && params.search.length > 0) {
            str += `&search=${params.search}`;
        }
        if (params.sort && params.sort.length > 0) {
            str += `&sort=${params.sort}`;
        }
        return request(`${root}/mainmenu?${str}`).then(functionPool.package200);
    }

    /**
     * 获取主菜单发布详情
     * @param id
     */
    getMainMenuReleaseInfo(id) {
        return request(`${root}/mainmenu/${id}`).then(functionPool.package200);
    }

    /**
     * 发布主菜单
     * @param body
     * @returns {Promise.<TResult>|*}
     */
    releaseMainMenu(body) {
        return request(`${root}/mainmenu`, body).then(functionPool.package200);
    }

    /**
     * 删除主菜单
     * @param id
     * @returns {*|Promise.<TResult>}
     */
    deleteMainMenu(id) {
        return axios.delete(`${root}/mainmenu/${id}`).then(res => res.data);
    }

    /**
     * 根据id获取跳转动作名称
     * @param id
     * @returns {*}
     */
    getActionTypeName(id) {
        switch(id){
            case 1:
                return '图片'
            case 2:
                return '视频'
            case 3:
                return '跳转栏目'
            case 4:
                return '电影专题'
            case 5:
                return '无动作'
        }
    }

    /**
     * 根据id获取发布状态名称
     * @param id
     * @returns {*}
     */
    getReleaseStatue(id) {
        switch(id){
            case 0:
                return '未发布'
            case 1:
                return '已发布'
            case 2:
                return '已删除'
        }
    }

    /**
     * 获取系统支持语言的列表
     */
    getLanguages() {
        /*return request(`${root}/languages`).then(functionPool.package200).then(res => {
            if (0 == res.code && null != res.data)
                localStorage.setItem('mainMenu:languages', JSON.stringify(res.data.docs))

        });*/
        return [
            {
                "id": 1,
                "langCode": "chi",
                "langName": "简体中文"
            },
            {
                "id": 2,
                "langCode": "eng",
                "langName": "英文"
            },
            {
                "id": 3,
                "langCode": "jpn",
                "langName": "日文"
            },
            {
                "id": 4,
                "langCode": "kor",
                "langName": "韩文"
            }
        ]
    }

    /**
     * 获取栏目列表
     */
    getCategory() {
        return request(`${root}/mainmenu/category`).then(functionPool.package200).then(res => res.data.docs);
    }

    /**
     * 根据语言编码获取语言名称
     *
     * @param langCode 支持字符串 或 数组
     * @returns {string}
     */
    renderLanguages(langCode){
        //let languages = localStorage.getItem('mainMenu:languages')
        let languages = this.getLanguages()
        console.log('languages:' + languages)
        if(null == languages)
            return ""

        let laJson = languages //JSON.parse(languages)

        let langCodeArr = []
        if (typeof(langCode) == 'string')
            langCodeArr.push(langCode)
        else
            langCodeArr = langCode

        let langName = ''
        laJson.map(la => {
            langCodeArr.map(c => {
                if (c == la.langCode) {
                    langName += la.langName + ' '
                }
            })
        })
        return langName
    }

    /**
     * 语言编码与名称互转
     *
     * @param source 支持字符串 或 数组
     * @param type 1-编码转名称 2-名称转编码
     *
     * @returns {string}
     */
    transLanguages(source, type){
        //let languages = localStorage.getItem('mainMenu:languages')
        let languages = this.getLanguages()
        if(null == languages)
            return ""

        let laJson = languages //JSON.parse(languages)

        let sourceArr = []
        if (typeof(source) == 'string')
            sourceArr.push(source)
        else
            sourceArr = source

        let resultArr = []
        laJson.map(la => {
            sourceArr.map(c => {
                if (1==type) {
                    if (c == la.langCode) {
                        resultArr.push(la.langName)
                    }
                }else {
                    if (c == la.langName) {
                        resultArr.push(la.langCode)
                    }
                }
            })
        })
        return resultArr
    }

}

module.exports = new MainMenuStore();