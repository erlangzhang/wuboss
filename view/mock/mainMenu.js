import moment from 'moment';

export default function (app) {

    /**
     * 获取主菜单素材列表
     */
    app.get('/shineblue/api/mainmenu/material', (req, res, next) => {
        const items = [];
        const total = 10;
        for (let i = 0; i < total; ++i) {
            items.push({
                "id": `${i}`,
                "name": `推荐位名称${i}`,
                "description": `描述${i}`,
                "onlineTime": moment().unix(),
                "offlineTime": moment().unix(),
                "actionType": 1,
                "visibleLang": ['简体中文', '英文'],
                "operatorId": `101${i}`,
                "createAt": moment().unix(),
            });
        }
        const data = {
            code: 0,
            message: 'success',
            data: {
                total: 100,
                docs: items,
                limit: parseInt(req.query.limit) || 10,
                page: parseInt(req.query.page) || 1,
            },
        };
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(data));
        res.end();
    });

    /**
     * 新增主菜单素材
     */
    app.post('/shineblue/api/mainmenu/material', (req, res, next) => {
        console.log('2' + req)
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify({
            code: 0,
            message: 'success',
            data: {},
        }));
        res.end();
    });

    /**
     * 根据id获取主菜单素材详情
     */
    app.get('/shineblue/api/mainmenu/material/:id', (req, res, next) => {
        const items = {
                "id": 110,
                "name": `推荐位名称`,
                "subName": '素材别名',
                "description": `描述`,
                "operatorId": 121,
                "status": 1,
                "isDefault": 1,
                "onlineTime": moment().unix(),
                "offlineTime": moment().unix(),
                "actionType": 1,
                "contentGlobalId": 1,
                "relatedaction": 'relatedaction',
                "relatedinfo": 'relatedinfo',
                /*"visibleLang": [{code: 'chi', name: '简体中文'},
                    {code: 'en', name: '英文'}],*/
                "visibleLang": ['简体中文', '英文', '日文'],
                "createAt": moment().unix(),
                "languageList": [{
                                    lang:'简体中文',
                                    pics: [{
                                        url: '',
                                        picType: 0,
                                        md5: ''
                                    }]
                                 },{
                                    lang:'英文',
                                    pics: [{
                                        url: '',
                                        picType: 0,
                                        md5: ''
                                    }]
                                },{
                                    lang:'日文',
                                    pics: [{
                                        url: '',
                                        picType: 0,
                                        md5: ''
                                    }]
                                }]
        }
        const data = {
            code: 0,
            message: 'success',
            data: items
        }
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(data));
        res.end();
    });

    /**
     * 删除素材
     */
    app.delete('/shineblue/api/mainmenu/material/:id', (req, res, next) => {
        const data = {
            code: 0,
            message: 'success',
        };
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(data));
        res.end();
    });

    /**
     * 获取酒店列表及酒店的主菜单当前推荐位个数
     */
    app.get('/shineblue/api/mainmenu/hotel', (req, res, next) => {
        const items = [];
        const total = 10;
        for (let i = 0; i < total; ++i) {
            items.push({
                "hostId": `${i}`,
                "hotelName": `酒店名称${i}`,
                "cityName": `城市${i}`,
                "officeName": `办事处${i}`,
                "hotelLevel": `酒店等级${i}`,
                "menuTotal": `${i}`
            });
        }
        const data = {
            code: 0,
            message: 'success',
            data: {
                total: 100,
                docs: items,
                limit: parseInt(req.query.limit) || 10,
                page: parseInt(req.query.page) || 1,
            },
        };
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(data));
        res.end();
    });

    /**
     * 获取属于酒店的素材条目列表
     */
    app.get('/shineblue/api/mainmenu/hotel/item', (req, res, next) => {
        const items = [];
        const total = 10;
        for (let i = 0; i < total; ++i) {
            items.push({
                "id": `${i}`,
                "pos": `${i}`,
                "name": `条目名称${i}`,
                "itemType": 2,
                "visibleLang": `可见语言${i}`,
                "rangeInfo": `2017-06-11 12:00/2017-06-21 12:00`
            });
        }
        const data = {
            code: 0,
            message: 'success',
            data: {
                total: 10,
                docs: items,
                limit: parseInt(req.query.limit) || 10,
                page: parseInt(req.query.page) || 1,
            },
        };
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(data));
        res.end();
    });

    /**
     * 获取主菜单发布列表
     */
    app.get('/shineblue/api/mainmenu', (req, res, next) => {
        const items = [];
        const total = 10;
        for (let i = 0; i < total; ++i) {
            items.push({
                "id": `${i}`,
                "name": `项目名称${i}`,
                "isDefault": '是',
                "onlineTime": moment().unix(),
                "offlineTime": moment().unix(),
                "citys": [{cityId:100, cityName:'深圳市'}],
                "agencys": [{name:'北京办事处'}],
                "hotelCnt": `${i}`,
                "status": 1,
                "createdAt": moment().unix(),
                "operatorName": `发布人${i}`
            });
        }
        const data = {
            code: 0,
            message: 'success',
            data: {
                total: 100,
                docs: items,
                limit: parseInt(req.query.limit) || 10,
                page: parseInt(req.query.page) || 1,
            },
        };
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(data));
        res.end();
    });

    /**
     * 获取主菜单发布详情
     */
    app.get('/shineblue/api/mainmenu/:id', (req, res, next) => {
        const items = {
            menuId:'58f572bbc76d5f0022b3d764',
            name:'我的项目',
            materials:[{
                    pos: 1,
                    name: '条目名称1',
                    itemType: 2,
                    visibleLang: '可见语言1',
                    rangeInfo: '2017-06-11 12:00/2017-06-21 12:00'
                },{
                    pos: 2,
                    name: '条目名称2',
                    itemType: 1,
                    visibleLang: '可见语言2',
                    rangeInfo: '2017-06-11 12:00/2017-06-21 12:00'
                },
            ],
            hotels:[{
                    hotelId:'58f572bbc76d5f0022b3d768',
                    hostId:1000,
                    name:'中华大酒店',
                    city:'深圳',
                    agencyName:'北京办事处',
                    hotelGrade:'S',
                    materialCnt:10,
                },{
                    hotelId:'58f572bbc76d5f0022b3d768',
                    hostId:1000,
                    name:'中华大酒店',
                    city:'深圳',
                    agencyName:'北京办事处',
                    hotelGrade:'S',
                    materialCnt:10,
                },
            ],
            createdAt:1494423920,
        }
        const data = {
            code: 0,
            message: 'success',
            data: items
        }
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(data));
        res.end();
    });

    /**
     * 删除主菜单
     */
    app.delete('/shineblue/api/mainmenu/:id', (req, res, next) => {
        const data = {
            code: 0,
            message: 'success',
        };
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(data));
        res.end();
    });

}