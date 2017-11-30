/**
 * @Author: Zz
 * @Date:   2016-09-09 10:09:20
 * @Email:  quitjie@gmail.com
 * @Project: hms-group-web
 * @Last modified by:   Zz
 * @Last modified time: 2016-10-09T20:23:25+08:00
 */
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config');
const moment = require('moment');
var router = express.Router();

const app = express();

const compiler = webpack(webpackConfig);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    status: {
        colors: true
    }
}));
app.use(require('webpack-hot-middleware')(compiler));

function mockLoginSuccess(res, body) {
    const data = {
        code: 0,
        message: 'success',
        data: {
            token: 'token',
            user: {
                Type: 9999,
                account: 'zz0',
                password: '',
                name: 'zz0',
                roles: [],
                lastLoginTime: 1473386516,
                id: '57de55213e442a17287ecd67',
                createAt: 1473326516,
                updateAt: 1473326516,
                tid: '12564'
            }
        },
    };

    res.session = {
        t: '0000',
    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
}
// VOD首页Mock
import vodHomeMock from './mock/vodHome';
vodHomeMock(app);
// 主菜单管理Mock
import mainMenuMock from './mock/mainMenu';
mainMenuMock(app);
// 媒资管理Mock
import mediaMock from './mock/media';
mediaMock(app);

app.post('/shineblue/api/login', (req, res, next) => {
    let body = req.body;
    // (1) 先获取 用户名及密码 的密文，解密
    mockLoginSuccess(res, {
        account: 'group'
    });
});

app.post('/shineblue/api/logout', (req, res, next) => {
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

app.get('/shineblue/api/hotels', (req, res, next) => {
    const items = [];
    const total = 20;
    for (let i = 0; i < total; ++i) {
        items.push({
            "id": `${i}`,
            "hostId": parseInt(`${i}`),
            "name": `酒店名称${i}`,
            "hotelType": 0,
            "stars": 'B',
            "ctripStars": 'A',
            "roomsCount": 35,
            "detailAddress": '西丽社区',
            "contactName": 'zz',
            "phoneNumber": `137589094${i}`,
            "description": `adasfdsafd${i}`,
            "longitude": 113.955866,
            "latitude": 22.547401,
            "province": 1,
            "city": 1,
            "county": 1,
            "pmsManufacturer": `厂商${i}`,
            "projectNum": '233242',
            "contractNo": `asdfasfasf${i}`,
            "contractName": '合同名称',
            "enableUwifi": 1,
            "enableHms": 1,
            "agency": '深圳办事处',
            "hotelGrade": 'B',
            "sales": 'zz',
            "status": i % 2,
            "epgVersion":  [
                    "2.0",
                    "2.1",
                    "2.3",
                    "1.2"
                ],
            "tags": ['😂', '🤕', '🙃', 'hello'],
            "createdAt": moment().unix(),
            "updatedAt": moment().unix(),
        });
    }
    const data = {
        code: 0,
        message: 'success',
        data: {
            total,
            docs: items,
            limit: req.query.limit || 15,
            page: req.query.page || 1,
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/hotels', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {},
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/hotels/:id', (req, res, next) => {
    const i = req.params.id;
    const data = {
        code: 0,
        message: 'success',
        data: {
            "id": `${i}`,
            "hostId": parseInt(`${i}`),
            "name": `酒店名称${i}`,
            "hotelType": 0,
            "stars": 'B',
            "ctripStars": 'C',
            "roomsCount": 35,
            "detailAddress": '西丽社区',
            "contactName": 'zz',
            "phoneNumber": `137589094${i}`,
            "description": `adasfdsafd${i}`,
            "longitude": 113.955866,
            "latitude": 22.547401,
            "province": 1,
            "city": 1,
            "county": 1,
            "pmsManufacturer": `厂商${i}`,
            "projectNum": '233242',
            "contractNo": `asdfasfasf${i}`,
            "contractName": '合同名称',
            "enableUwifi": 1,
            "enableHms": 1,
            "agency": '深圳办事处',
            "hotelGrade": 'B',
            "sales": 'zz',
            "status": i % 2,
            "epgVersion": '2.0',
            "tags": ['😂', '🤕', '🙃', 'hello'],
            "createdAt": moment().unix(),
            "updatedAt": moment().unix(),
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/hotels/:id', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {},
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/grades', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            hotelGrades: ['S', 'A', 'B', 'C', 'D'],
        },
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/agencys', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            agencys: ['深圳', '珠海', '广州', '三亚', '厦门', '成都', '重庆', '长沙', '武汉', '沈阳', '长春', '郑州', '背景', '上海', '南京', '青岛'],
        },
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});
app.get('/shineblue/api/epgs', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            epgs: ['1.0', '1.2', '2.0', '2.1', '2.3'],
        },
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/hotelStatus', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {},
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/hotel/groups', (req, res, next) => {
    const items = [];
    const total = 10;

    function getRandom() {
        return `${parseInt(Math.random() * 100000)}`;
    }
    for (let i = 0; i < total; ++i) {
        items.push({
            "id": `${i}`,
            "hotelIds": [getRandom(), getRandom(), getRandom()],
            "name": `酒店名称${i}`,
            "status": i % 2,
            "createdAt": moment().unix(),
            "updatedAt": moment().unix(),
        });
    }
    const data = {
        code: 0,
        message: 'success',
        data: {
            total,
            docs: items,
            limit: req.query.limit || 15,
            page: req.query.page || 1,
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/hotel/groupStatus', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {},
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/hotel/groups/:id', (req, res, next) => {
    const i = req.params.id;
    const data = {
        code: 0,
        message: 'success',
        data: {
            "id": i,
            "hotelIds": ['1', '3'],
            "name": "某分组",
            "status": 1,
            "createdAt": moment().unix(),
            "updatedAt": moment().unix(),
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/hotel/groups', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {},
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/hotel/groups/:id', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {},
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/hotel/dataSource', (req, res, next) => {
    const data = {
        code: 0,
        message: "操作成功",
        data: {
            agencys: ['深圳', '珠海', '广州', '三亚', '厦门', '成都', '重庆', '长沙', '武汉', '沈阳', '长春', '郑州', '北京', '上海', '南京', '青岛'],
            epgs: ['1.2', '2.0', '2.1', '2.3'],
            hotelGrades: ['S', 'A', 'B', 'C', 'D'],
            stars: { '3': '三星', '4': '四星', '5': '超五星', '6': '超五星', '10': '外贸' },
            ctripStars: { '2': '二星级及以下/经济', '3': '三星级/舒适', '4': '四星级/高档', '5': '超五星级/豪华' }
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});


app.post('/shineblue/api/roles', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            id: '123123',
            name: req.body.name,
            permissions: [],
            status: 1,
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        },
    };
    res.writeHead(201, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/roles', (req, res, next) => {
    const data = {
        "code": 0,
        "message": "success",
        "data": {
            "total": 1,
            "limit": 15,
            "page": 1,
            "pages": 1,
            "docs": [{
                "id": "58e5dd319a68090f00d1da31",
                "name": "test",
                "permissions": [{
                    "id": "vod",
                    "name": "VOD管理",
                    "category": {
                        "id": "mam",
                        "name": "媒资管理"
                    }
                }],
                "status": 1,
                "createdAt": 1491459377,
                "updatedAt": 1491459377
            }]
        }
    };

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/roles/:id', (req, res, next) => {
    const data = {
        "code": 0,
        "message": "success",
        "data": {
            "id": "58e5dd319a68090f00d1da31",
            "name": "test",
            "permissions": [{
                "id": "vod",
                "name": "VOD管理",
                "category": {
                    "id": "mam",
                    "name": "媒资管理"
                }
            }],
            "status": 1,
            "createdAt": 1491459377,
            "updatedAt": 1491459377
        }
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/roles/:id', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            id: '123123',
            name: req.body.name,
            permissions: [],
            status: 1,
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/accounts/batchDelete', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {},
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/accountStatus', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {},
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/accounts', (req, res, next) => {
    const items = [];
    const total = 30;
    for (let i = 0; i < total; ++i) {
        items.push({
            id: i,
            account: `${i}@qq.com`,
            name: `盛阳科技${i}`,
            department: `部门${i}`,
            telephone: `136787${i}`,
            lastLoginTime: moment().unix(),
            lastLoginIp: '137.23.23.11',
            roles: [{
                id: '1',
                name: '角色1'
            }, {
                id: '2',
                name: '角色2'
            }],
            hotelGroups: [{
                id: `1`,
                name: '盛阳科技1'
            }, {
                id: '2',
                name: '盛阳科技2'
            }],
            status: i % 2,
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        });
    }
    const data = {
        code: 0,
        message: 'success',
        data: {
            total,
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            docs: items,
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/accounts/:id', (req, res, next) => {
    const i = Math.random().toString().slice(-5);
    const data = {
        code: 0,
        message: 'success',
        data: {
            id: i,
            account: `${i}@qq.com`,
            name: `盛阳科技${i}`,
            department: `部门${i}`,
            telephone: `136787${i}`,
            lastLoginTime: moment().unix(),
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
            lastLoginIp: '137.23.23.11',
            roles: [{
                id: '1',
                name: '盛阳科技1'
            }, {
                id: '2',
                name: '盛阳科技2'
            }],
            hotelGroups: [],
            // hotelGroups: [{
            //     id: `1`,
            //     name: '盛阳科技1'
            // }, {
            //     id: '2',
            //     name: '盛阳科技2'
            // }],
            status: i % 2,
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/accounts/:id', (req, res, next) => {
    const i = Math.random().toString().slice(-5);
    const data = {
        code: 0,
        message: 'success',
        data: {
            id: i,
            account: `${i}`,
            name: `盛阳科技${i}`,
            department: `部门${i}`,
            telephone: `136787${i}`,
            lastLoginTime: moment().unix(),
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
            lastLoginIp: '137.23.23.11',
            roles: [i, i + 1],
            hotelGroups: [{
                id: `1`,
                name: '盛阳科技1'
            }, {
                id: '2',
                name: '盛阳科技2'
            }],
            status: i % 2,
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/accounts', (req, res, next) => {
    const i = Math.random().toString().slice(-5);
    const data = {
        code: 0,
        message: 'success',
        data: {
            id: i,
            account: `${i}`,
            name: `盛阳科技${i}`,
            department: `部门${i}`,
            telephone: `136787${i}`,
            lastLoginTime: moment().unix(),
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
            lastLoginIp: '137.23.23.11',
            roles: [i, i + 1],
            hotels: [`1`, `2`],
            status: i % 2,
        },
    };
    res.writeHead(201, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/login/captcha', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            // captcha: require('./test/code.png'),
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/permissions', (req, res, next) => {
    const data = {
        "code": 0,
        "message": "success",
        "data": {
            "docs": [{
                "id": "mam",
                "name": "媒资管理",
                "category": {}
            }, {
                "id": "vod",
                "name": "VOD管理",
                "category": {
                    "id": "mam",
                    "name": "媒资管理"
                }
            }, {
                "id": "music",
                "name": "音乐管理",
                "category": {
                    "id": "mam",
                    "name": "媒资管理"
                }
            }, {
                "id": "channel",
                "name": "频道管理",
                "category": {
                    "id": "mam",
                    "name": "媒资管理"
                }
            }, {
                "id": "news",
                "name": "新闻审核",
                "category": {
                    "id": "mam",
                    "name": "媒资管理"
                }
            }, {
                "id": "vod_online",
                "name": "在播影片",
                "category": {
                    "id": "mam",
                    "name": "媒资管理"
                }
            }, {
                "id": "systeminfo",
                "name": "系统信息",
                "category": {}
            }, {
                "id": "labelhistory",
                "name": "系统安装记录",
                "category": {
                    "id": "systeminfo",
                    "name": "系统信息"
                }
            }, {
                "id": "moduleversion",
                "name": "系统模块版本",
                "category": {
                    "id": "systeminfo",
                    "name": "系统信息"
                }
            }]
        }
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/logs', (req, res, next) => {
    const items = [];
    const total = 30;
    const count = req.query.limit || 10;
    const begin = req.query.limit ? 0 : req.query.limit - 1;
    for (let i = begin; i < count; ++i) {
        items.push({
            id: `${i}`,
            name: `增加${i}`,
            accountId: `${i}`,
            url: '/shineblue/api/accounts',
            method: 'post',
            params: {
                name: 'zz',
            },
            code: 0,
            message: 'hslfasf',
            createdAt: moment().unix(),
        });
    }
    const data = {
        code: 0,
        message: 'success',
        data: {
            total,
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            docs: items,
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/areas', (req, res, next) => {
    const data = { "code": 0, "message": "success", "data": { "province": [{ "id": 1, "name": "北京市", "level": 1 }, { "id": 2, "name": "天津市", "level": 1 }, { "id": 3, "name": "河北省", "level": 1 }, { "id": 4, "name": "山西省", "level": 1 }, { "id": 5, "name": "内蒙古自治区", "level": 1 }, { "id": 6, "name": "辽宁省", "level": 1 }, { "id": 7, "name": "吉林省", "level": 1 }, { "id": 8, "name": "黑龙江省", "level": 1 }, { "id": 9, "name": "上海市", "level": 1 }, { "id": 10, "name": "江苏省", "level": 1 }, { "id": 11, "name": "浙江省", "level": 1 }, { "id": 12, "name": "安徽省", "level": 1 }, { "id": 13, "name": "福建省", "level": 1 }, { "id": 14, "name": "江西省", "level": 1 }, { "id": 15, "name": "山东省", "level": 1 }, { "id": 16, "name": "河南省", "level": 1 }, { "id": 17, "name": "湖北省", "level": 1 }, { "id": 18, "name": "湖南省", "level": 1 }, { "id": 19, "name": "广东省", "level": 1 }, { "id": 20, "name": "海南省", "level": 1 }, { "id": 21, "name": "广西壮族自治区", "level": 1 }, { "id": 22, "name": "甘肃省", "level": 1 }, { "id": 23, "name": "陕西省", "level": 1 }, { "id": 24, "name": "新 疆维吾尔自治区", "level": 1 }, { "id": 25, "name": "青海省", "level": 1 }, { "id": 26, "name": "宁夏回族自治区", "level": 1 }, { "id": 27, "name": "重庆市", "level": 1 }, { "id": 28, "name": "四川省", "level": 1 }, { "id": 29, "name": "贵州省", "level": 1 }, { "id": 30, "name": "云南省", "level": 1 }, { "id": 31, "name": "西藏自治区", "level": 1 }, { "id": 32, "name": "台湾省", "level": 1 }, { "id": 33, "name": "澳门特别行政区", "level": 1 }, { "id": 34, "name": "香港特别行政区", "level": 1 }], "city": [{ "id": 1, "name": "北京市", "parentId": 1, "level": 2 }, { "id": 2, "name": "天津市", "parentId": 2, "level": 2 }, { "id": 3, "name": "上海市", "parentId": 9, "level": 2 }, { "id": 4, "name": "重庆市", "parentId": 27, "level": 2 }, { "id": 5, "name": "邯郸市", "parentId": 3, "level": 2 }, { "id": 6, "name": "石家庄市", "parentId": 3, "level": 2 }, { "id": 7, "name": "保定市", "parentId": 3, "level": 2 }, { "id": 8, "name": "张家口市", "parentId": 3, "level": 2 }, { "id": 9, "name": "承德市", "parentId": 3, "level": 2 }, { "id": 10, "name": "唐山市", "parentId": 3, "level": 2 }, { "id": 11, "name": "廊坊市", "parentId": 3, "level": 2 }, { "id": 12, "name": "沧州市", "parentId": 3, "level": 2 }, { "id": 13, "name": "衡水市", "parentId": 3, "level": 2 }, { "id": 14, "name": "邢台市", "parentId": 3, "level": 2 }, { "id": 16, "name": "朔州市", "parentId": 4, "level": 2 }, { "id": 17, "name": "忻州市", "parentId": 4, "level": 2 }, { "id": 18, "name": "太原市", "parentId": 4, "level": 2 }, { "id": 19, "name": "大同市", "parentId": 4, "level": 2 }, { "id": 20, "name": "阳泉市", "parentId": 4, "level": 2 }, { "id": 21, "name": "晋中市", "parentId": 4, "level": 2 }, { "id": 22, "name": "长治市", "parentId": 4, "level": 2 }, { "id": 23, "name": "晋城市", "parentId": 4, "level": 2 }, { "id": 24, "name": "临汾市", "parentId": 4, "level": 2 }, { "id": 25, "name": "吕梁市", "parentId": 4, "level": 2 }, { "id": 26, "name": "运城市", "parentId": 4, "level": 2 }, { "id": 27, "name": "沈阳市", "parentId": 6, "level": 2 }, { "id": 28, "name": "铁岭市", "parentId": 6, "level": 2 }, { "id": 29, "name": "大连市", "parentId": 6, "level": 2 }, { "id": 30, "name": "鞍山市", "parentId": 6, "level": 2 }, { "id": 31, "name": "抚顺市", "parentId": 6, "level": 2 }, { "id": 32, "name": "本溪市", "parentId": 6, "level": 2 }, { "id": 33, "name": "丹东市", "parentId": 6, "level": 2 }, { "id": 34, "name": "锦州市", "parentId": 6, "level": 2 }, { "id": 35, "name": "营口市", "parentId": 6, "level": 2 }, { "id": 36, "name": "阜新市", "parentId": 6, "level": 2 }, { "id": 37, "name": "辽阳市", "parentId": 6, "level": 2 }, { "id": 38, "name": "朝阳市", "parentId": 6, "level": 2 }, { "id": 39, "name": "盘锦市", "parentId": 6, "level": 2 }, { "id": 40, "name": "葫芦岛市", "parentId": 6, "level": 2 }, { "id": 41, "name": "长春市", "parentId": 7, "level": 2 }, { "id": 42, "name": "吉林市", "parentId": 7, "level": 2 }, { "id": 43, "name": "延边朝鲜族自治州", "parentId": 7, "level": 2 }, { "id": 44, "name": "四平市", "parentId": 7, "level": 2 }, { "id": 45, "name": "通化市", "parentId": 7, "level": 2 }, { "id": 46, "name": "白城市", "parentId": 7, "level": 2 }, { "id": 47, "name": "辽源市", "parentId": 7, "level": 2 }, { "id": 48, "name": "松原市", "parentId": 7, "level": 2 }, { "id": 49, "name": "白山市", "parentId": 7, "level": 2 }, { "id": 50, "name": "哈尔滨市", "parentId": 8, "level": 2 }, { "id": 51, "name": "齐齐哈尔市", "parentId": 8, "level": 2 }, { "id": 52, "name": "鸡西市", "parentId": 8, "level": 2 }, { "id": 53, "name": "牡丹江市", "parentId": 8, "level": 2 }, { "id": 54, "name": "七台河市", "parentId": 8, "level": 2 }, { "id": 55, "name": "佳木斯市", "parentId": 8, "level": 2 }, { "id": 56, "name": "鹤岗市", "parentId": 8, "level": 2 }, { "id": 57, "name": "双鸭山市", "parentId": 8, "level": 2 }, { "id": 58, "name": "绥化市", "parentId": 8, "level": 2 }, { "id": 59, "name": "黑河市", "parentId": 8, "level": 2 }, { "id": 60, "name": "大兴安岭地区", "parentId": 8, "level": 2 }, { "id": 61, "name": "伊春市", "parentId": 8, "level": 2 }, { "id": 62, "name": "大庆市", "parentId": 8, "level": 2 }, { "id": 63, "name": "南京市", "parentId": 10, "level": 2 }, { "id": 64, "name": "无锡市", "parentId": 10, "level": 2 }, { "id": 65, "name": "镇江市", "parentId": 10, "level": 2 }, { "id": 66, "name": "苏州市", "parentId": 10, "level": 2 }, { "id": 67, "name": "南通市", "parentId": 10, "level": 2 }, { "id": 68, "name": "扬州市", "parentId": 10, "level": 2 }, { "id": 69, "name": "盐城市", "parentId": 10, "level": 2 }, { "id": 70, "name": "徐州市", "parentId": 10, "level": 2 }, { "id": 71, "name": "淮安市", "parentId": 10, "level": 2 }, { "id": 72, "name": "连云港市", "parentId": 10, "level": 2 }, { "id": 73, "name": "常州市", "parentId": 10, "level": 2 }, { "id": 74, "name": "泰州市", "parentId": 10, "level": 2 }, { "id": 75, "name": "宿迁市", "parentId": 10, "level": 2 }, { "id": 76, "name": "舟山市", "parentId": 11, "level": 2 }, { "id": 77, "name": "衢州市", "parentId": 11, "level": 2 }, { "id": 78, "name": "杭州市", "parentId": 11, "level": 2 }, { "id": 79, "name": "湖州市", "parentId": 11, "level": 2 }, { "id": 80, "name": "嘉兴市", "parentId": 11, "level": 2 }, { "id": 81, "name": "宁波市", "parentId": 11, "level": 2 }, { "id": 82, "name": "绍兴市", "parentId": 11, "level": 2 }, { "id": 83, "name": "温州市", "parentId": 11, "level": 2 }, { "id": 84, "name": "丽水市", "parentId": 11, "level": 2 }, { "id": 85, "name": "金华市", "parentId": 11, "level": 2 }, { "id": 86, "name": "台州市", "parentId": 11, "level": 2 }, { "id": 87, "name": "合肥市", "parentId": 12, "level": 2 }, { "id": 88, "name": "芜湖市", "parentId": 12, "level": 2 }, { "id": 89, "name": "蚌埠市", "parentId": 12, "level": 2 }, { "id": 90, "name": "淮南市", "parentId": 12, "level": 2 }, { "id": 91, "name": "马鞍山市", "parentId": 12, "level": 2 }, { "id": 92, "name": "淮北市", "parentId": 12, "level": 2 }, { "id": 93, "name": "铜陵市", "parentId": 12, "level": 2 }, { "id": 94, "name": "安庆市", "parentId": 12, "level": 2 }, { "id": 95, "name": "黄山市", "parentId": 12, "level": 2 }, { "id": 96, "name": "滁州市", "parentId": 12, "level": 2 }, { "id": 97, "name": "阜阳市", "parentId": 12, "level": 2 }, { "id": 98, "name": "宿州市", "parentId": 12, "level": 2 }, { "id": 99, "name": "巢湖市", "parentId": 12, "level": 2 }, { "id": 100, "name": "六安市", "parentId": 12, "level": 2 }, { "id": 101, "name": "亳州市", "parentId": 12, "level": 2 }, { "id": 102, "name": "池州市", "parentId": 12, "level": 2 }, { "id": 103, "name": "宣城市", "parentId": 12, "level": 2 }, { "id": 104, "name": "福州市", "parentId": 13, "level": 2 }, { "id": 105, "name": "厦门市", "parentId": 13, "level": 2 }, { "id": 106, "name": "宁德市", "parentId": 13, "level": 2 }, { "id": 107, "name": "莆田市", "parentId": 13, "level": 2 }, { "id": 108, "name": "泉州市", "parentId": 13, "level": 2 }, { "id": 109, "name": "漳州市", "parentId": 13, "level": 2 }, { "id": 110, "name": "龙岩市", "parentId": 13, "level": 2 }, { "id": 111, "name": "三明市", "parentId": 13, "level": 2 }, { "id": 112, "name": "南平市", "parentId": 13, "level": 2 }, { "id": 113, "name": "鹰潭市", "parentId": 14, "level": 2 }, { "id": 114, "name": "新余市", "parentId": 14, "level": 2 }, { "id": 115, "name": "南昌市", "parentId": 14, "level": 2 }, { "id": 116, "name": "九江市", "parentId": 14, "level": 2 }, { "id": 117, "name": "上饶市", "parentId": 14, "level": 2 }, { "id": 118, "name": "抚州市", "parentId": 14, "level": 2 }, { "id": 119, "name": "宜春市", "parentId": 14, "level": 2 }, { "id": 120, "name": "吉安市", "parentId": 14, "level": 2 }, { "id": 121, "name": "赣州市", "parentId": 14, "level": 2 }, { "id": 122, "name": "景德镇市", "parentId": 14, "level": 2 }, { "id": 123, "name": "萍乡市", "parentId": 14, "level": 2 }, { "id": 124, "name": "菏泽市", "parentId": 15, "level": 2 }, { "id": 125, "name": "济南市", "parentId": 15, "level": 2 }, { "id": 126, "name": "青岛市", "parentId": 15, "level": 2 }, { "id": 127, "name": "淄博市", "parentId": 15, "level": 2 }, { "id": 128, "name": "德州市", "parentId": 15, "level": 2 }, { "id": 129, "name": "烟台市", "parentId": 15, "level": 2 }, { "id": 130, "name": "潍坊市", "parentId": 15, "level": 2 }, { "id": 131, "name": "济宁市", "parentId": 15, "level": 2 }, { "id": 132, "name": "泰安市", "parentId": 15, "level": 2 }, { "id": 133, "name": "临沂市", "parentId": 15, "level": 2 }, { "id": 134, "name": "滨州市", "parentId": 15, "level": 2 }, { "id": 135, "name": "东营市", "parentId": 15, "level": 2 }, { "id": 136, "name": "威海市", "parentId": 15, "level": 2 }, { "id": 137, "name": "枣庄市", "parentId": 15, "level": 2 }, { "id": 138, "name": "日照市", "parentId": 15, "level": 2 }, { "id": 139, "name": "莱芜市", "parentId": 15, "level": 2 }, { "id": 140, "name": "聊城市", "parentId": 15, "level": 2 }, { "id": 141, "name": "商丘市", "parentId": 16, "level": 2 }, { "id": 142, "name": "郑州市", "parentId": 16, "level": 2 }, { "id": 143, "name": "安阳市", "parentId": 16, "level": 2 }, { "id": 144, "name": "新乡市", "parentId": 16, "level": 2 }, { "id": 145, "name": "许昌市", "parentId": 16, "level": 2 }, { "id": 146, "name": "平顶山市", "parentId": 16, "level": 2 }, { "id": 147, "name": "信阳市", "parentId": 16, "level": 2 }, { "id": 148, "name": "南阳市", "parentId": 16, "level": 2 }, { "id": 149, "name": "开封市", "parentId": 16, "level": 2 }, { "id": 150, "name": "洛阳市", "parentId": 16, "level": 2 }, { "id": 151, "name": "济源市", "parentId": 16, "level": 2 }, { "id": 152, "name": "焦作市", "parentId": 16, "level": 2 }, { "id": 153, "name": "鹤壁市", "parentId": 16, "level": 2 }, { "id": 154, "name": "濮阳市", "parentId": 16, "level": 2 }, { "id": 155, "name": "周口市", "parentId": 16, "level": 2 }, { "id": 156, "name": "漯河市", "parentId": 16, "level": 2 }, { "id": 157, "name": "驻马店市", "parentId": 16, "level": 2 }, { "id": 158, "name": "三门峡市", "parentId": 16, "level": 2 }, { "id": 159, "name": "武汉市", "parentId": 17, "level": 2 }, { "id": 160, "name": "襄樊市", "parentId": 17, "level": 2 }, { "id": 161, "name": "鄂州市", "parentId": 17, "level": 2 }, { "id": 162, "name": "孝感市", "parentId": 17, "level": 2 }, { "id": 163, "name": "黄冈市", "parentId": 17, "level": 2 }, { "id": 164, "name": "黄石市", "parentId": 17, "level": 2 }, { "id": 165, "name": "咸宁市", "parentId": 17, "level": 2 }, { "id": 166, "name": "荆州市", "parentId": 17, "level": 2 }, { "id": 167, "name": "宜昌市", "parentId": 17, "level": 2 }, { "id": 168, "name": "恩施土家族苗族自治州", "parentId": 17, "level": 2 }, { "id": 169, "name": "神农架林区", "parentId": 17, "level": 2 }, { "id": 170, "name": "十堰市", "parentId": 17, "level": 2 }, { "id": 171, "name": "随州市", "parentId": 17, "level": 2 }, { "id": 172, "name": "荆门市", "parentId": 17, "level": 2 }, { "id": 173, "name": "仙桃市", "parentId": 17, "level": 2 }, { "id": 174, "name": "天门市", "parentId": 17, "level": 2 }, { "id": 175, "name": "潜江市", "parentId": 17, "level": 2 }, { "id": 176, "name": "岳阳市", "parentId": 18, "level": 2 }, { "id": 177, "name": "长沙市", "parentId": 18, "level": 2 }, { "id": 178, "name": "湘潭市", "parentId": 18, "level": 2 }, { "id": 179, "name": "株洲市", "parentId": 18, "level": 2 }, { "id": 180, "name": "衡阳市", "parentId": 18, "level": 2 }, { "id": 181, "name": "郴州市", "parentId": 18, "level": 2 }, { "id": 182, "name": "常德市", "parentId": 18, "level": 2 }, { "id": 183, "name": "益阳市", "parentId": 18, "level": 2 }, { "id": 184, "name": "娄底市", "parentId": 18, "level": 2 }, { "id": 185, "name": "邵阳市", "parentId": 18, "level": 2 }, { "id": 186, "name": "湘西土家族苗族自治州", "parentId": 18, "level": 2 }, { "id": 187, "name": "张家界市", "parentId": 18, "level": 2 }, { "id": 188, "name": "怀化市", "parentId": 18, "level": 2 }, { "id": 189, "name": "永州市", "parentId": 18, "level": 2 }, { "id": 190, "name": "广州市", "parentId": 19, "level": 2 }, { "id": 191, "name": "汕尾市", "parentId": 19, "level": 2 }, { "id": 192, "name": "阳江市", "parentId": 19, "level": 2 }, { "id": 193, "name": "揭阳市", "parentId": 19, "level": 2 }, { "id": 194, "name": "茂名市", "parentId": 19, "level": 2 }, { "id": 195, "name": "惠州市", "parentId": 19, "level": 2 }, { "id": 196, "name": "江门市", "parentId": 19, "level": 2 }, { "id": 197, "name": "韶关市", "parentId": 19, "level": 2 }, { "id": 198, "name": "梅州市", "parentId": 19, "level": 2 }, { "id": 199, "name": "汕头市", "parentId": 19, "level": 2 }, { "id": 200, "name": "深圳市", "parentId": 19, "level": 2 }, { "id": 201, "name": "珠海市", "parentId": 19, "level": 2 }, { "id": 202, "name": "佛山市", "parentId": 19, "level": 2 }, { "id": 203, "name": "肇庆市", "parentId": 19, "level": 2 }, { "id": 204, "name": "湛江市", "parentId": 19, "level": 2 }, { "id": 205, "name": "中山市", "parentId": 19, "level": 2 }, { "id": 206, "name": "河源市", "parentId": 19, "level": 2 }, { "id": 207, "name": "清远市", "parentId": 19, "level": 2 }, { "id": 208, "name": "云浮市", "parentId": 19, "level": 2 }, { "id": 209, "name": "潮州市", "parentId": 19, "level": 2 }, { "id": 210, "name": "东莞市", "parentId": 19, "level": 2 }, { "id": 211, "name": "兰州市", "parentId": 22, "level": 2 }, { "id": 212, "name": "金昌市", "parentId": 22, "level": 2 }, { "id": 213, "name": "白银市", "parentId": 22, "level": 2 }, { "id": 214, "name": "天水市", "parentId": 22, "level": 2 }, { "id": 215, "name": "嘉峪关市", "parentId": 22, "level": 2 }, { "id": 216, "name": "武威市", "parentId": 22, "level": 2 }, { "id": 217, "name": "张掖市", "parentId": 22, "level": 2 }, { "id": 218, "name": "平凉市", "parentId": 22, "level": 2 }, { "id": 219, "name": "酒泉市", "parentId": 22, "level": 2 }, { "id": 220, "name": "庆阳市", "parentId": 22, "level": 2 }, { "id": 221, "name": "定西市", "parentId": 22, "level": 2 }, { "id": 222, "name": "陇南市", "parentId": 22, "level": 2 }, { "id": 223, "name": "临夏回族自治州", "parentId": 22, "level": 2 }, { "id": 224, "name": "甘南藏族自治州", "parentId": 22, "level": 2 }, { "id": 225, "name": "成都市", "parentId": 28, "level": 2 }, { "id": 226, "name": "攀枝花市", "parentId": 28, "level": 2 }, { "id": 227, "name": "自贡市", "parentId": 28, "level": 2 }, { "id": 228, "name": "绵阳市", "parentId": 28, "level": 2 }, { "id": 229, "name": "南充市", "parentId": 28, "level": 2 }, { "id": 230, "name": "达州市", "parentId": 28, "level": 2 }, { "id": 231, "name": "遂宁市", "parentId": 28, "level": 2 }, { "id": 232, "name": "广安市", "parentId": 28, "level": 2 }, { "id": 233, "name": "巴中市", "parentId": 28, "level": 2 }, { "id": 234, "name": "泸州市", "parentId": 28, "level": 2 }, { "id": 235, "name": "宜宾市", "parentId": 28, "level": 2 }, { "id": 236, "name": "资阳市", "parentId": 28, "level": 2 }, { "id": 237, "name": "内江市", "parentId": 28, "level": 2 }, { "id": 238, "name": "乐山市", "parentId": 28, "level": 2 }, { "id": 239, "name": "眉山市", "parentId": 28, "level": 2 }, { "id": 240, "name": "凉山彝族自治州", "parentId": 28, "level": 2 }, { "id": 241, "name": "雅安市", "parentId": 28, "level": 2 }, { "id": 242, "name": "甘孜藏族自治州", "parentId": 28, "level": 2 }, { "id": 243, "name": "阿坝藏族羌族自治州", "parentId": 28, "level": 2 }, { "id": 244, "name": "德阳市", "parentId": 28, "level": 2 }, { "id": 245, "name": "广元市", "parentId": 28, "level": 2 }, { "id": 246, "name": "贵阳市", "parentId": 29, "level": 2 }, { "id": 247, "name": "遵义市", "parentId": 29, "level": 2 }, { "id": 248, "name": "安顺市", "parentId": 29, "level": 2 }, { "id": 249, "name": "黔南布依族苗族自治州", "parentId": 29, "level": 2 }, { "id": 250, "name": "黔东南苗族侗族自治州", "parentId": 29, "level": 2 }, { "id": 251, "name": "铜仁地区", "parentId": 29, "level": 2 }, { "id": 252, "name": "毕节地区", "parentId": 29, "level": 2 }, { "id": 253, "name": "六盘水市", "parentId": 29, "level": 2 }, { "id": 254, "name": "黔西南布依族苗族自治州", "parentId": 29, "level": 2 }, { "id": 255, "name": "海口市", "parentId": 20, "level": 2 }, { "id": 256, "name": "三亚市", "parentId": 20, "level": 2 }, { "id": 257, "name": "五指山市", "parentId": 20, "level": 2 }, { "id": 258, "name": "琼海市", "parentId": 20, "level": 2 }, { "id": 259, "name": "儋州市", "parentId": 20, "level": 2 }, { "id": 260, "name": "文昌市", "parentId": 20, "level": 2 }, { "id": 261, "name": "万宁市", "parentId": 20, "level": 2 }, { "id": 262, "name": "东方市", "parentId": 20, "level": 2 }, { "id": 263, "name": "澄迈县", "parentId": 20, "level": 2 }, { "id": 264, "name": "定安县", "parentId": 20, "level": 2 }, { "id": 265, "name": "屯昌县", "parentId": 20, "level": 2 }, { "id": 266, "name": "临高县", "parentId": 20, "level": 2 }, { "id": 267, "name": "白沙黎族自治县", "parentId": 20, "level": 2 }, { "id": 268, "name": "昌江黎族自治县", "parentId": 20, "level": 2 }, { "id": 269, "name": "乐东黎族自治县", "parentId": 20, "level": 2 }, { "id": 270, "name": "陵水黎族自治县", "parentId": 20, "level": 2 }, { "id": 271, "name": "保亭黎族苗族自治县", "parentId": 20, "level": 2 }, { "id": 272, "name": "琼中黎族苗族自治县", "parentId": 20, "level": 2 }, { "id": 273, "name": "西双版纳傣族自治州", "parentId": 30, "level": 2 }, { "id": 274, "name": "德宏傣族景颇族自治州", "parentId": 30, "level": 2 }, { "id": 275, "name": "昭通市", "parentId": 30, "level": 2 }, { "id": 276, "name": "昆明市", "parentId": 30, "level": 2 }, { "id": 277, "name": "大理白族自治州", "parentId": 30, "level": 2 }, { "id": 278, "name": "红河哈尼族彝族自治州", "parentId": 30, "level": 2 }, { "id": 279, "name": "曲靖市", "parentId": 30, "level": 2 }, { "id": 280, "name": "保山市", "parentId": 30, "level": 2 }, { "id": 281, "name": "文山壮族苗族自治州", "parentId": 30, "level": 2 }, { "id": 282, "name": "玉溪市", "parentId": 30, "level": 2 }, { "id": 283, "name": "楚雄彝族自治州", "parentId": 30, "level": 2 }, { "id": 284, "name": "普洱市", "parentId": 30, "level": 2 }, { "id": 285, "name": "临沧市", "parentId": 30, "level": 2 }, { "id": 286, "name": "怒江傈傈族自治州", "parentId": 30, "level": 2 }, { "id": 287, "name": "迪庆藏族自治州", "parentId": 30, "level": 2 }, { "id": 288, "name": "丽江市", "parentId": 30, "level": 2 }, { "id": 289, "name": "海北藏族自治州", "parentId": 25, "level": 2 }, { "id": 290, "name": "西宁市", "parentId": 25, "level": 2 }, { "id": 291, "name": "海东地区", "parentId": 25, "level": 2 }, { "id": 292, "name": "黄南藏族自治州", "parentId": 25, "level": 2 }, { "id": 293, "name": "海南藏族自治州", "parentId": 25, "level": 2 }, { "id": 294, "name": "果洛藏族自治州", "parentId": 25, "level": 2 }, { "id": 295, "name": "玉树藏族自治州", "parentId": 25, "level": 2 }, { "id": 296, "name": "海西蒙古族藏族自治州", "parentId": 25, "level": 2 }, { "id": 297, "name": "西安市", "parentId": 23, "level": 2 }, { "id": 298, "name": "咸阳市", "parentId": 23, "level": 2 }, { "id": 299, "name": "延安市", "parentId": 23, "level": 2 }, { "id": 300, "name": "榆林市", "parentId": 23, "level": 2 }, { "id": 301, "name": "渭南市", "parentId": 23, "level": 2 }, { "id": 302, "name": "商洛市", "parentId": 23, "level": 2 }, { "id": 303, "name": "安康市", "parentId": 23, "level": 2 }, { "id": 304, "name": "汉中市", "parentId": 23, "level": 2 }, { "id": 305, "name": "宝鸡市", "parentId": 23, "level": 2 }, { "id": 306, "name": "铜川市", "parentId": 23, "level": 2 }, { "id": 307, "name": "防城港市", "parentId": 21, "level": 2 }, { "id": 308, "name": "南宁市", "parentId": 21, "level": 2 }, { "id": 309, "name": "崇左市", "parentId": 21, "level": 2 }, { "id": 310, "name": "来宾市", "parentId": 21, "level": 2 }, { "id": 311, "name": "柳州市", "parentId": 21, "level": 2 }, { "id": 312, "name": "桂林市", "parentId": 21, "level": 2 }, { "id": 313, "name": "梧州市", "parentId": 21, "level": 2 }, { "id": 314, "name": "贺州市", "parentId": 21, "level": 2 }, { "id": 315, "name": "贵港市", "parentId": 21, "level": 2 }, { "id": 316, "name": "玉林市", "parentId": 21, "level": 2 }, { "id": 317, "name": "百色市", "parentId": 21, "level": 2 }, { "id": 318, "name": "钦州市", "parentId": 21, "level": 2 }, { "id": 319, "name": "河池市", "parentId": 21, "level": 2 }, { "id": 320, "name": "北海市", "parentId": 21, "level": 2 }, { "id": 321, "name": "拉萨市", "parentId": 31, "level": 2 }, { "id": 322, "name": "日喀则地区", "parentId": 31, "level": 2 }, { "id": 323, "name": "山南地区", "parentId": 31, "level": 2 }, { "id": 324, "name": "林芝地区", "parentId": 31, "level": 2 }, { "id": 325, "name": "昌都地区", "parentId": 31, "level": 2 }, { "id": 326, "name": "那曲地区", "parentId": 31, "level": 2 }, { "id": 327, "name": "阿里地区", "parentId": 31, "level": 2 }, { "id": 328, "name": "银川市", "parentId": 26, "level": 2 }, { "id": 329, "name": "石嘴山市", "parentId": 26, "level": 2 }, { "id": 330, "name": "吴忠市", "parentId": 26, "level": 2 }, { "id": 331, "name": "固原市", "parentId": 26, "level": 2 }, { "id": 332, "name": "中卫市", "parentId": 26, "level": 2 }, { "id": 333, "name": "塔城地区", "parentId": 24, "level": 2 }, { "id": 334, "name": "哈密地区", "parentId": 24, "level": 2 }, { "id": 335, "name": "和田地区", "parentId": 24, "level": 2 }, { "id": 336, "name": "阿勒泰地区", "parentId": 24, "level": 2 }, { "id": 337, "name": "克孜勒苏柯尔克孜自治州", "parentId": 24, "level": 2 }, { "id": 338, "name": "博尔塔拉蒙古自治州", "parentId": 24, "level": 2 }, { "id": 339, "name": "克拉玛依市", "parentId": 24, "level": 2 }, { "id": 340, "name": "乌鲁木齐市", "parentId": 24, "level": 2 }, { "id": 341, "name": "石河子市", "parentId": 24, "level": 2 }, { "id": 342, "name": "昌吉回族自治州", "parentId": 24, "level": 2 }, { "id": 343, "name": "五家渠市", "parentId": 24, "level": 2 }, { "id": 344, "name": "吐鲁番地区", "parentId": 24, "level": 2 }, { "id": 345, "name": "巴音郭楞蒙古自治州", "parentId": 24, "level": 2 }, { "id": 346, "name": "阿克苏地区", "parentId": 24, "level": 2 }, { "id": 347, "name": "阿拉尔市", "parentId": 24, "level": 2 }, { "id": 348, "name": "喀什地区", "parentId": 24, "level": 2 }, { "id": 349, "name": "图木舒克市", "parentId": 24, "level": 2 }, { "id": 350, "name": "伊犁哈萨克自治州", "parentId": 24, "level": 2 }, { "id": 351, "name": "呼伦贝尔市", "parentId": 5, "level": 2 }, { "id": 352, "name": "呼和浩特市", "parentId": 5, "level": 2 }, { "id": 353, "name": "包头市", "parentId": 5, "level": 2 }, { "id": 354, "name": "乌海市", "parentId": 5, "level": 2 }, { "id": 355, "name": "乌兰察布市", "parentId": 5, "level": 2 }, { "id": 356, "name": "通辽市", "parentId": 5, "level": 2 }, { "id": 357, "name": "赤峰市", "parentId": 5, "level": 2 }, { "id": 358, "name": "鄂尔多斯市", "parentId": 5, "level": 2 }, { "id": 359, "name": "巴彦淖尔市", "parentId": 5, "level": 2 }, { "id": 360, "name": "锡林郭勒盟", "parentId": 5, "level": 2 }, { "id": 361, "name": "兴安盟", "parentId": 5, "level": 2 }, { "id": 362, "name": "阿拉善盟", "parentId": 5, "level": 2 }, { "id": 363, "name": "台北市", "parentId": 32, "level": 2 }, { "id": 364, "name": "高雄市", "parentId": 32, "level": 2 }, { "id": 365, "name": "基隆市", "parentId": 32, "level": 2 }, { "id": 366, "name": "台中市", "parentId": 32, "level": 2 }, { "id": 367, "name": "台南市", "parentId": 32, "level": 2 }, { "id": 368, "name": "新竹市", "parentId": 32, "level": 2 }, { "id": 369, "name": "嘉义市", "parentId": 32, "level": 2 }, { "id": 370, "name": "澳门特别行政区", "parentId": 33, "level": 2 }, { "id": 371, "name": "香港特别行政区", "parentId": 34, "level": 2 }], "county": [{ "id": 1, "name": "东城区", "parentId": 1, "level": 3 }, { "id": 2, "name": "西城区", "parentId": 1, "level": 3 }, { "id": 3, "name": "崇文区", "parentId": 1, "level": 3 }, { "id": 4, "name": "宣武区", "parentId": 1, "level": 3 }, { "id": 5, "name": "朝阳区", "parentId": 1, "level": 3 }, { "id": 6, "name": "丰台区", "parentId": 1, "level": 3 }, { "id": 7, "name": "石景山区", "parentId": 1, "level": 3 }, { "id": 8, "name": "海淀区", "parentId": 1, "level": 3 }, { "id": 9, "name": "门头沟区", "parentId": 1, "level": 3 }, { "id": 10, "name": "房山区", "parentId": 1, "level": 3 }, { "id": 11, "name": "通州区", "parentId": 1, "level": 3 }, { "id": 12, "name": "顺义区", "parentId": 1, "level": 3 }, { "id": 13, "name": "昌平区", "parentId": 1, "level": 3 }, { "id": 14, "name": "大兴区", "parentId": 1, "level": 3 }, { "id": 15, "name": "怀柔区", "parentId": 1, "level": 3 }, { "id": 16, "name": "平谷区", "parentId": 1, "level": 3 }, { "id": 17, "name": "密云县", "parentId": 1, "level": 3 }, { "id": 18, "name": "延庆县", "parentId": 1, "level": 3 }, { "id": 19, "name": "和平区", "parentId": 2, "level": 3 }, { "id": 20, "name": "河东区", "parentId": 2, "level": 3 }, { "id": 21, "name": "河西区", "parentId": 2, "level": 3 }, { "id": 22, "name": "南开区", "parentId": 2, "level": 3 }, { "id": 23, "name": "河北区", "parentId": 2, "level": 3 }, { "id": 24, "name": "红桥区", "parentId": 2, "level": 3 }, { "id": 25, "name": "塘沽区", "parentId": 2, "level": 3 }, { "id": 26, "name": "汉沽区", "parentId": 2, "level": 3 }, { "id": 27, "name": "大港区", "parentId": 2, "level": 3 }, { "id": 28, "name": "东丽区", "parentId": 2, "level": 3 }, { "id": 29, "name": "西青区", "parentId": 2, "level": 3 }, { "id": 30, "name": "津南区", "parentId": 2, "level": 3 }, { "id": 31, "name": "北辰区", "parentId": 2, "level": 3 }, { "id": 32, "name": "武清区", "parentId": 2, "level": 3 }, { "id": 33, "name": "宝坻区", "parentId": 2, "level": 3 }, { "id": 34, "name": "宁河县", "parentId": 2, "level": 3 }, { "id": 35, "name": "静海县", "parentId": 2, "level": 3 }, { "id": 36, "name": "蓟县", "parentId": 2, "level": 3 }, { "id": 37, "name": "黄浦区", "parentId": 3, "level": 3 }, { "id": 38, "name": "卢湾区", "parentId": 3, "level": 3 }, { "id": 39, "name": "徐汇区", "parentId": 3, "level": 3 }, { "id": 40, "name": "长宁区", "parentId": 3, "level": 3 }, { "id": 41, "name": "静安区", "parentId": 3, "level": 3 }, { "id": 42, "name": "普陀区", "parentId": 3, "level": 3 }, { "id": 43, "name": "闸北区", "parentId": 3, "level": 3 }, { "id": 44, "name": "虹口区", "parentId": 3, "level": 3 }, { "id": 45, "name": "杨浦区", "parentId": 3, "level": 3 }, { "id": 46, "name": "闵行区", "parentId": 3, "level": 3 }, { "id": 47, "name": "宝山区", "parentId": 3, "level": 3 }, { "id": 48, "name": "嘉定区", "parentId": 3, "level": 3 }, { "id": 49, "name": "浦东新区", "parentId": 3, "level": 3 }, { "id": 50, "name": "金山区", "parentId": 3, "level": 3 }, { "id": 51, "name": "松江区", "parentId": 3, "level": 3 }, { "id": 52, "name": "青浦区", "parentId": 3, "level": 3 }, { "id": 53, "name": "南汇区", "parentId": 3, "level": 3 }, { "id": 54, "name": "奉贤区", "parentId": 3, "level": 3 }, { "id": 55, "name": "崇明县", "parentId": 3, "level": 3 }, { "id": 56, "name": "万州区", "parentId": 4, "level": 3 }, { "id": 57, "name": "涪陵区", "parentId": 4, "level": 3 }, { "id": 58, "name": "渝中区", "parentId": 4, "level": 3 }, { "id": 59, "name": "大渡口区", "parentId": 4, "level": 3 }, { "id": 60, "name": "江北区", "parentId": 4, "level": 3 }, { "id": 61, "name": "沙坪坝区", "parentId": 4, "level": 3 }, { "id": 62, "name": "九龙坡区", "parentId": 4, "level": 3 }, { "id": 63, "name": "南岸区", "parentId": 4, "level": 3 }, { "id": 64, "name": "北碚区", "parentId": 4, "level": 3 }, { "id": 65, "name": "万盛区", "parentId": 4, "level": 3 }, { "id": 66, "name": "双桥区", "parentId": 4, "level": 3 }, { "id": 67, "name": "渝北区", "parentId": 4, "level": 3 }, { "id": 68, "name": "巴南区", "parentId": 4, "level": 3 }, { "id": 69, "name": "黔江区", "parentId": 4, "level": 3 }, { "id": 70, "name": "长寿区", "parentId": 4, "level": 3 }, { "id": 71, "name": "江津区", "parentId": 4, "level": 3 }, { "id": 72, "name": "合川区", "parentId": 4, "level": 3 }, { "id": 73, "name": "永川区", "parentId": 4, "level": 3 }, { "id": 74, "name": "南川区", "parentId": 4, "level": 3 }, { "id": 75, "name": "綦江县", "parentId": 4, "level": 3 }, { "id": 76, "name": "潼南县", "parentId": 4, "level": 3 }, { "id": 77, "name": "铜梁县", "parentId": 4, "level": 3 }, { "id": 78, "name": "大足县", "parentId": 4, "level": 3 }, { "id": 79, "name": "荣昌县", "parentId": 4, "level": 3 }, { "id": 80, "name": "璧山县", "parentId": 4, "level": 3 }, { "id": 81, "name": "梁平县", "parentId": 4, "level": 3 }, { "id": 82, "name": "城口县", "parentId": 4, "level": 3 }, { "id": 83, "name": "丰都县", "parentId": 4, "level": 3 }, { "id": 84, "name": "垫江县", "parentId": 4, "level": 3 }, { "id": 85, "name": "武隆县", "parentId": 4, "level": 3 }, { "id": 86, "name": "忠县", "parentId": 4, "level": 3 }, { "id": 87, "name": "开县", "parentId": 4, "level": 3 }, { "id": 88, "name": "云阳县", "parentId": 4, "level": 3 }, { "id": 89, "name": "奉节县", "parentId": 4, "level": 3 }, { "id": 90, "name": "巫山县", "parentId": 4, "level": 3 }, { "id": 91, "name": "巫溪县", "parentId": 4, "level": 3 }, { "id": 92, "name": "石柱土家族自治县", "parentId": 4, "level": 3 }, { "id": 93, "name": "秀山土家族苗族自治县", "parentId": 4, "level": 3 }, { "id": 94, "name": "酉阳土家族苗族自治县", "parentId": 4, "level": 3 }, { "id": 95, "name": "彭水苗族土家族自治县", "parentId": 4, "level": 3 }, { "id": 96, "name": "邯山区", "parentId": 5, "level": 3 }, { "id": 97, "name": "丛台区", "parentId": 5, "level": 3 }, { "id": 98, "name": "复兴区", "parentId": 5, "level": 3 }, { "id": 99, "name": "峰峰矿区", "parentId": 5, "level": 3 }, { "id": 100, "name": "邯郸县", "parentId": 5, "level": 3 }, { "id": 101, "name": "临漳县", "parentId": 5, "level": 3 }, { "id": 102, "name": "成安县", "parentId": 5, "level": 3 }, { "id": 103, "name": "大名县", "parentId": 5, "level": 3 }, { "id": 104, "name": "涉县", "parentId": 5, "level": 3 }, { "id": 105, "name": "磁县", "parentId": 5, "level": 3 }, { "id": 106, "name": "肥乡县", "parentId": 5, "level": 3 }, { "id": 107, "name": "永年县", "parentId": 5, "level": 3 }, { "id": 108, "name": "邱县", "parentId": 5, "level": 3 }, { "id": 109, "name": "鸡泽县", "parentId": 5, "level": 3 }, { "id": 110, "name": "广平县", "parentId": 5, "level": 3 }, { "id": 111, "name": "馆陶县", "parentId": 5, "level": 3 }, { "id": 112, "name": "魏县", "parentId": 5, "level": 3 }, { "id": 113, "name": "曲周县", "parentId": 5, "level": 3 }, { "id": 114, "name": "武安市", "parentId": 5, "level": 3 }, { "id": 115, "name": "长安区", "parentId": 6, "level": 3 }, { "id": 116, "name": "桥东区", "parentId": 6, "level": 3 }, { "id": 117, "name": "桥西区", "parentId": 6, "level": 3 }, { "id": 118, "name": "新华区", "parentId": 6, "level": 3 }, { "id": 119, "name": "井陉矿区", "parentId": 6, "level": 3 }, { "id": 120, "name": "裕华区", "parentId": 6, "level": 3 }, { "id": 121, "name": "井陉县", "parentId": 6, "level": 3 }, { "id": 122, "name": "正定县", "parentId": 6, "level": 3 }, { "id": 123, "name": "栾城县", "parentId": 6, "level": 3 }, { "id": 124, "name": "行唐县", "parentId": 6, "level": 3 }, { "id": 125, "name": "灵寿县", "parentId": 6, "level": 3 }, { "id": 126, "name": "高邑县", "parentId": 6, "level": 3 }, { "id": 127, "name": "深泽县", "parentId": 6, "level": 3 }, { "id": 128, "name": "赞皇县", "parentId": 6, "level": 3 }, { "id": 129, "name": "无极县", "parentId": 6, "level": 3 }, { "id": 130, "name": "平山县", "parentId": 6, "level": 3 }, { "id": 131, "name": "元氏县", "parentId": 6, "level": 3 }, { "id": 132, "name": "赵县", "parentId": 6, "level": 3 }, { "id": 133, "name": "辛集市", "parentId": 6, "level": 3 }, { "id": 134, "name": "藁城市", "parentId": 6, "level": 3 }, { "id": 135, "name": "晋州市", "parentId": 6, "level": 3 }, { "id": 136, "name": "新乐市", "parentId": 6, "level": 3 }, { "id": 137, "name": "鹿泉市", "parentId": 6, "level": 3 }, { "id": 138, "name": "新市区", "parentId": 7, "level": 3 }, { "id": 139, "name": "北市区", "parentId": 7, "level": 3 }, { "id": 140, "name": "南市区", "parentId": 7, "level": 3 }, { "id": 141, "name": "满城县", "parentId": 7, "level": 3 }, { "id": 142, "name": "清苑县", "parentId": 7, "level": 3 }, { "id": 143, "name": "涞水县", "parentId": 7, "level": 3 }, { "id": 144, "name": "阜平县", "parentId": 7, "level": 3 }, { "id": 145, "name": "徐水县", "parentId": 7, "level": 3 }, { "id": 146, "name": "定兴县", "parentId": 7, "level": 3 }, { "id": 147, "name": "唐县", "parentId": 7, "level": 3 }, { "id": 148, "name": "高阳县", "parentId": 7, "level": 3 }, { "id": 149, "name": "容城县", "parentId": 7, "level": 3 }, { "id": 150, "name": "涞源县", "parentId": 7, "level": 3 }, { "id": 151, "name": "望都县", "parentId": 7, "level": 3 }, { "id": 152, "name": "安新县", "parentId": 7, "level": 3 }, { "id": 153, "name": "易县", "parentId": 7, "level": 3 }, { "id": 154, "name": "曲阳县", "parentId": 7, "level": 3 }, { "id": 155, "name": "蠡县", "parentId": 7, "level": 3 }, { "id": 156, "name": "顺平县", "parentId": 7, "level": 3 }, { "id": 157, "name": "博野县", "parentId": 7, "level": 3 }, { "id": 158, "name": "雄县", "parentId": 7, "level": 3 }, { "id": 159, "name": "涿州市", "parentId": 7, "level": 3 }, { "id": 160, "name": "定州市", "parentId": 7, "level": 3 }, { "id": 161, "name": "安国市", "parentId": 7, "level": 3 }, { "id": 162, "name": "高碑店市", "parentId": 7, "level": 3 }, { "id": 163, "name": "桥东区", "parentId": 8, "level": 3 }, { "id": 164, "name": "桥西区", "parentId": 8, "level": 3 }, { "id": 165, "name": "宣化区", "parentId": 8, "level": 3 }, { "id": 166, "name": "下花园区", "parentId": 8, "level": 3 }, { "id": 167, "name": "宣化县", "parentId": 8, "level": 3 }, { "id": 168, "name": "张北县", "parentId": 8, "level": 3 }, { "id": 169, "name": "康保县", "parentId": 8, "level": 3 }, { "id": 170, "name": "沽源县", "parentId": 8, "level": 3 }, { "id": 171, "name": "尚义县", "parentId": 8, "level": 3 }, { "id": 172, "name": "蔚县", "parentId": 8, "level": 3 }, { "id": 173, "name": "阳原县", "parentId": 8, "level": 3 }, { "id": 174, "name": "怀安县", "parentId": 8, "level": 3 }, { "id": 175, "name": "万全县", "parentId": 8, "level": 3 }, { "id": 176, "name": "怀来县", "parentId": 8, "level": 3 }, { "id": 177, "name": "涿鹿县", "parentId": 8, "level": 3 }, { "id": 178, "name": "赤城县", "parentId": 8, "level": 3 }, { "id": 179, "name": "崇礼县", "parentId": 8, "level": 3 }, { "id": 180, "name": "双桥区", "parentId": 9, "level": 3 }, { "id": 181, "name": "双滦区", "parentId": 9, "level": 3 }, { "id": 182, "name": "鹰手营子矿区", "parentId": 9, "level": 3 }, { "id": 183, "name": "承德县", "parentId": 9, "level": 3 }, { "id": 184, "name": "兴隆县", "parentId": 9, "level": 3 }, { "id": 185, "name": "平泉县", "parentId": 9, "level": 3 }, { "id": 186, "name": "滦平县", "parentId": 9, "level": 3 }, { "id": 187, "name": "隆化县", "parentId": 9, "level": 3 }, { "id": 188, "name": "丰宁满族自治县", "parentId": 9, "level": 3 }, { "id": 189, "name": "宽城满族自治县", "parentId": 9, "level": 3 }, { "id": 190, "name": "围场满族蒙古族自治县", "parentId": 9, "level": 3 }, { "id": 191, "name": "路南区", "parentId": 10, "level": 3 }, { "id": 192, "name": "路北区", "parentId": 10, "level": 3 }, { "id": 193, "name": "古冶区", "parentId": 10, "level": 3 }, { "id": 194, "name": "开平区", "parentId": 10, "level": 3 }, { "id": 195, "name": "丰南区", "parentId": 10, "level": 3 }, { "id": 196, "name": "丰润区", "parentId": 10, "level": 3 }, { "id": 197, "name": "滦县", "parentId": 10, "level": 3 }, { "id": 198, "name": "滦南县", "parentId": 10, "level": 3 }, { "id": 199, "name": "乐亭县", "parentId": 10, "level": 3 }, { "id": 200, "name": "迁西县", "parentId": 10, "level": 3 }, { "id": 201, "name": "玉田县", "parentId": 10, "level": 3 }, { "id": 202, "name": "唐海县", "parentId": 10, "level": 3 }, { "id": 203, "name": "遵化市", "parentId": 10, "level": 3 }, { "id": 204, "name": "迁安市", "parentId": 10, "level": 3 }, { "id": 205, "name": "安次区", "parentId": 11, "level": 3 }, { "id": 206, "name": "广阳区", "parentId": 11, "level": 3 }, { "id": 207, "name": "固安县", "parentId": 11, "level": 3 }, { "id": 208, "name": "永清县", "parentId": 11, "level": 3 }, { "id": 209, "name": "香河县", "parentId": 11, "level": 3 }, { "id": 210, "name": "大城县", "parentId": 11, "level": 3 }, { "id": 211, "name": "文安县", "parentId": 11, "level": 3 }, { "id": 212, "name": "大厂回族自治县", "parentId": 11, "level": 3 }, { "id": 213, "name": "霸州市", "parentId": 11, "level": 3 }, { "id": 214, "name": "三河市", "parentId": 11, "level": 3 }, { "id": 215, "name": "新华区", "parentId": 12, "level": 3 }, { "id": 216, "name": "运河区", "parentId": 12, "level": 3 }, { "id": 217, "name": "沧县", "parentId": 12, "level": 3 }, { "id": 218, "name": "青县", "parentId": 12, "level": 3 }, { "id": 219, "name": "东光县", "parentId": 12, "level": 3 }, { "id": 220, "name": "海兴县", "parentId": 12, "level": 3 }, { "id": 221, "name": "盐山县", "parentId": 12, "level": 3 }, { "id": 222, "name": "肃宁县", "parentId": 12, "level": 3 }, { "id": 223, "name": "南皮县", "parentId": 12, "level": 3 }, { "id": 224, "name": "吴桥县", "parentId": 12, "level": 3 }, { "id": 225, "name": "献县", "parentId": 12, "level": 3 }, { "id": 226, "name": "孟村回族自治县", "parentId": 12, "level": 3 }, { "id": 227, "name": "泊头市", "parentId": 12, "level": 3 }, { "id": 228, "name": "任丘市", "parentId": 12, "level": 3 }, { "id": 229, "name": "黄骅市", "parentId": 12, "level": 3 }, { "id": 230, "name": "河间市", "parentId": 12, "level": 3 }, { "id": 231, "name": "桃城区", "parentId": 13, "level": 3 }, { "id": 232, "name": "枣强县", "parentId": 13, "level": 3 }, { "id": 233, "name": "武邑县", "parentId": 13, "level": 3 }, { "id": 234, "name": "武强县", "parentId": 13, "level": 3 }, { "id": 235, "name": "饶阳县", "parentId": 13, "level": 3 }, { "id": 236, "name": "安平县", "parentId": 13, "level": 3 }, { "id": 237, "name": "故城县", "parentId": 13, "level": 3 }, { "id": 238, "name": "景县", "parentId": 13, "level": 3 }, { "id": 239, "name": "阜城县", "parentId": 13, "level": 3 }, { "id": 240, "name": "冀州市", "parentId": 13, "level": 3 }, { "id": 241, "name": "深州市", "parentId": 13, "level": 3 }, { "id": 242, "name": "桥东区", "parentId": 14, "level": 3 }, { "id": 243, "name": "桥西区", "parentId": 14, "level": 3 }, { "id": 244, "name": "邢台县", "parentId": 14, "level": 3 }, { "id": 245, "name": "临城县", "parentId": 14, "level": 3 }, { "id": 246, "name": "内丘县", "parentId": 14, "level": 3 }, { "id": 247, "name": "柏乡县", "parentId": 14, "level": 3 }, { "id": 248, "name": "隆尧县", "parentId": 14, "level": 3 }, { "id": 249, "name": "任县", "parentId": 14, "level": 3 }, { "id": 250, "name": "南和县", "parentId": 14, "level": 3 }, { "id": 251, "name": "宁晋县", "parentId": 14, "level": 3 }, { "id": 252, "name": "巨鹿县", "parentId": 14, "level": 3 }, { "id": 253, "name": "新河县", "parentId": 14, "level": 3 }, { "id": 254, "name": "广宗县", "parentId": 14, "level": 3 }, { "id": 255, "name": "平乡县", "parentId": 14, "level": 3 }, { "id": 256, "name": "威县", "parentId": 14, "level": 3 }, { "id": 257, "name": "清河县", "parentId": 14, "level": 3 }, { "id": 258, "name": "临西县", "parentId": 14, "level": 3 }, { "id": 259, "name": "南宫市", "parentId": 14, "level": 3 }, { "id": 260, "name": "沙河市", "parentId": 14, "level": 3 }, { "id": 261, "name": "海港区", "parentId": 15, "level": 3 }, { "id": 262, "name": "山海关区", "parentId": 15, "level": 3 }, { "id": 263, "name": "北戴河区", "parentId": 15, "level": 3 }, { "id": 264, "name": "青龙满族自治县", "parentId": 15, "level": 3 }, { "id": 265, "name": "昌黎县", "parentId": 15, "level": 3 }, { "id": 266, "name": "抚宁县", "parentId": 15, "level": 3 }, { "id": 267, "name": "卢龙县", "parentId": 15, "level": 3 }, { "id": 268, "name": "朔城区", "parentId": 16, "level": 3 }, { "id": 269, "name": "平鲁区", "parentId": 16, "level": 3 }, { "id": 270, "name": "山阴县", "parentId": 16, "level": 3 }, { "id": 271, "name": "应县", "parentId": 16, "level": 3 }, { "id": 272, "name": "右玉县", "parentId": 16, "level": 3 }, { "id": 273, "name": "怀仁县", "parentId": 16, "level": 3 }, { "id": 274, "name": "忻府区", "parentId": 17, "level": 3 }, { "id": 275, "name": "定襄县", "parentId": 17, "level": 3 }, { "id": 276, "name": "五台县", "parentId": 17, "level": 3 }, { "id": 277, "name": "代县", "parentId": 17, "level": 3 }, { "id": 278, "name": "繁峙县", "parentId": 17, "level": 3 }, { "id": 279, "name": "宁武县", "parentId": 17, "level": 3 }, { "id": 280, "name": "静乐县", "parentId": 17, "level": 3 }, { "id": 281, "name": "神池县", "parentId": 17, "level": 3 }, { "id": 282, "name": "五寨县", "parentId": 17, "level": 3 }, { "id": 283, "name": "岢岚县", "parentId": 17, "level": 3 }, { "id": 284, "name": "河曲县", "parentId": 17, "level": 3 }, { "id": 285, "name": "保德县", "parentId": 17, "level": 3 }, { "id": 286, "name": "偏关县", "parentId": 17, "level": 3 }, { "id": 287, "name": "原平市", "parentId": 17, "level": 3 }, { "id": 288, "name": "小店区", "parentId": 18, "level": 3 }, { "id": 289, "name": "迎泽区", "parentId": 18, "level": 3 }, { "id": 290, "name": "杏花岭区", "parentId": 18, "level": 3 }, { "id": 291, "name": "尖草坪区", "parentId": 18, "level": 3 }, { "id": 292, "name": "万柏林区", "parentId": 18, "level": 3 }, { "id": 293, "name": "晋源区", "parentId": 18, "level": 3 }, { "id": 294, "name": "清徐县", "parentId": 18, "level": 3 }, { "id": 295, "name": "阳曲县", "parentId": 18, "level": 3 }, { "id": 296, "name": "娄烦县", "parentId": 18, "level": 3 }, { "id": 297, "name": "古交市", "parentId": 18, "level": 3 }, { "id": 298, "name": "矿区", "parentId": 19, "level": 3 }, { "id": 299, "name": "南郊区", "parentId": 19, "level": 3 }, { "id": 300, "name": "新荣区", "parentId": 19, "level": 3 }, { "id": 301, "name": "阳高县", "parentId": 19, "level": 3 }, { "id": 302, "name": "天镇县", "parentId": 19, "level": 3 }, { "id": 303, "name": "广灵县", "parentId": 19, "level": 3 }, { "id": 304, "name": "灵丘县", "parentId": 19, "level": 3 }, { "id": 305, "name": "浑源县", "parentId": 19, "level": 3 }, { "id": 306, "name": "左云县", "parentId": 19, "level": 3 }, { "id": 307, "name": "大同县", "parentId": 19, "level": 3 }, { "id": 308, "name": "矿区", "parentId": 20, "level": 3 }, { "id": 309, "name": "平定县", "parentId": 20, "level": 3 }, { "id": 310, "name": "盂县", "parentId": 20, "level": 3 }, { "id": 311, "name": "榆次区", "parentId": 21, "level": 3 }, { "id": 312, "name": "榆社县", "parentId": 21, "level": 3 }, { "id": 313, "name": "左权县", "parentId": 21, "level": 3 }, { "id": 314, "name": "和顺县", "parentId": 21, "level": 3 }, { "id": 315, "name": "昔阳县", "parentId": 21, "level": 3 }, { "id": 316, "name": "寿阳县", "parentId": 21, "level": 3 }, { "id": 317, "name": "太谷县", "parentId": 21, "level": 3 }, { "id": 318, "name": "祁县", "parentId": 21, "level": 3 }, { "id": 319, "name": "平遥县", "parentId": 21, "level": 3 }, { "id": 320, "name": "灵石县", "parentId": 21, "level": 3 }, { "id": 321, "name": "介休市", "parentId": 21, "level": 3 }, { "id": 322, "name": "长治县", "parentId": 22, "level": 3 }, { "id": 323, "name": "襄垣县", "parentId": 22, "level": 3 }, { "id": 324, "name": "屯留县", "parentId": 22, "level": 3 }, { "id": 325, "name": "平顺县", "parentId": 22, "level": 3 }, { "id": 326, "name": "黎城县", "parentId": 22, "level": 3 }, { "id": 327, "name": "壶关县", "parentId": 22, "level": 3 }, { "id": 328, "name": "长子县", "parentId": 22, "level": 3 }, { "id": 329, "name": "武乡县", "parentId": 22, "level": 3 }, { "id": 330, "name": "沁县", "parentId": 22, "level": 3 }, { "id": 331, "name": "沁源县", "parentId": 22, "level": 3 }, { "id": 332, "name": "潞城市", "parentId": 22, "level": 3 }, { "id": 333, "name": "沁水县", "parentId": 23, "level": 3 }, { "id": 334, "name": "阳城县", "parentId": 23, "level": 3 }, { "id": 335, "name": "陵川县", "parentId": 23, "level": 3 }, { "id": 336, "name": "泽州县", "parentId": 23, "level": 3 }, { "id": 337, "name": "高平市", "parentId": 23, "level": 3 }, { "id": 338, "name": "尧都区", "parentId": 24, "level": 3 }, { "id": 339, "name": "曲沃县", "parentId": 24, "level": 3 }, { "id": 340, "name": "翼城县", "parentId": 24, "level": 3 }, { "id": 341, "name": "襄汾县", "parentId": 24, "level": 3 }, { "id": 342, "name": "洪洞县", "parentId": 24, "level": 3 }, { "id": 343, "name": "古县", "parentId": 24, "level": 3 }, { "id": 344, "name": "安泽县", "parentId": 24, "level": 3 }, { "id": 345, "name": "浮山县", "parentId": 24, "level": 3 }, { "id": 346, "name": "吉县", "parentId": 24, "level": 3 }, { "id": 347, "name": "乡宁县", "parentId": 24, "level": 3 }, { "id": 348, "name": "大宁县", "parentId": 24, "level": 3 }, { "id": 349, "name": "隰县", "parentId": 24, "level": 3 }, { "id": 350, "name": "永和县", "parentId": 24, "level": 3 }, { "id": 351, "name": "蒲县", "parentId": 24, "level": 3 }, { "id": 352, "name": "汾西县", "parentId": 24, "level": 3 }, { "id": 353, "name": "侯马市", "parentId": 24, "level": 3 }, { "id": 354, "name": "霍州市", "parentId": 24, "level": 3 }, { "id": 355, "name": "离石区", "parentId": 25, "level": 3 }, { "id": 356, "name": "文水县", "parentId": 25, "level": 3 }, { "id": 357, "name": "交城县", "parentId": 25, "level": 3 }, { "id": 358, "name": "兴县", "parentId": 25, "level": 3 }, { "id": 359, "name": "临县", "parentId": 25, "level": 3 }, { "id": 360, "name": "柳林县", "parentId": 25, "level": 3 }, { "id": 361, "name": "石楼县", "parentId": 25, "level": 3 }, { "id": 362, "name": "岚县", "parentId": 25, "level": 3 }, { "id": 363, "name": "方山县", "parentId": 25, "level": 3 }, { "id": 364, "name": "中阳县", "parentId": 25, "level": 3 }, { "id": 365, "name": "交口县", "parentId": 25, "level": 3 }, { "id": 366, "name": "孝义市", "parentId": 25, "level": 3 }, { "id": 367, "name": "汾阳市", "parentId": 25, "level": 3 }, { "id": 368, "name": "盐湖区", "parentId": 26, "level": 3 }, { "id": 369, "name": "临猗县", "parentId": 26, "level": 3 }, { "id": 370, "name": "万荣县", "parentId": 26, "level": 3 }, { "id": 371, "name": "闻喜县", "parentId": 26, "level": 3 }, { "id": 372, "name": "稷山县", "parentId": 26, "level": 3 }, { "id": 373, "name": "新绛县", "parentId": 26, "level": 3 }, { "id": 374, "name": "绛县", "parentId": 26, "level": 3 }, { "id": 375, "name": "垣曲县", "parentId": 26, "level": 3 }, { "id": 376, "name": "夏县", "parentId": 26, "level": 3 }, { "id": 377, "name": "平陆县", "parentId": 26, "level": 3 }, { "id": 378, "name": "芮城县", "parentId": 26, "level": 3 }, { "id": 379, "name": "永济市", "parentId": 26, "level": 3 }, { "id": 380, "name": "河津市", "parentId": 26, "level": 3 }, { "id": 381, "name": "和平区", "parentId": 27, "level": 3 }, { "id": 382, "name": "沈河区", "parentId": 27, "level": 3 }, { "id": 383, "name": "大东区", "parentId": 27, "level": 3 }, { "id": 384, "name": "皇姑区", "parentId": 27, "level": 3 }, { "id": 385, "name": "铁西区", "parentId": 27, "level": 3 }, { "id": 386, "name": "苏家屯区", "parentId": 27, "level": 3 }, { "id": 387, "name": "东陵区", "parentId": 27, "level": 3 }, { "id": 388, "name": "沈北新区", "parentId": 27, "level": 3 }, { "id": 389, "name": "于洪区", "parentId": 27, "level": 3 }, { "id": 390, "name": "辽中县", "parentId": 27, "level": 3 }, { "id": 391, "name": "康平县", "parentId": 27, "level": 3 }, { "id": 392, "name": "法库县", "parentId": 27, "level": 3 }, { "id": 393, "name": "新民市", "parentId": 27, "level": 3 }, { "id": 394, "name": "银州区", "parentId": 28, "level": 3 }, { "id": 395, "name": "清河区", "parentId": 28, "level": 3 }, { "id": 396, "name": "铁岭县", "parentId": 28, "level": 3 }, { "id": 397, "name": "西丰县", "parentId": 28, "level": 3 }, { "id": 398, "name": "昌图县", "parentId": 28, "level": 3 }, { "id": 399, "name": "调兵山市", "parentId": 28, "level": 3 }, { "id": 400, "name": "开原市", "parentId": 28, "level": 3 }, { "id": 401, "name": "长海县", "parentId": 29, "level": 3 }, { "id": 402, "name": "旅顺口区", "parentId": 29, "level": 3 }, { "id": 403, "name": "中山区", "parentId": 29, "level": 3 }, { "id": 404, "name": "西岗区", "parentId": 29, "level": 3 }, { "id": 405, "name": "沙河口区", "parentId": 29, "level": 3 }, { "id": 406, "name": "甘井子区", "parentId": 29, "level": 3 }, { "id": 407, "name": "金州区", "parentId": 29, "level": 3 }, { "id": 408, "name": "普兰店市", "parentId": 29, "level": 3 }, { "id": 409, "name": "瓦房店市", "parentId": 29, "level": 3 }, { "id": 410, "name": "庄河市", "parentId": 29, "level": 3 }, { "id": 411, "name": "铁东区", "parentId": 30, "level": 3 }, { "id": 412, "name": "铁西区", "parentId": 30, "level": 3 }, { "id": 413, "name": "立山区", "parentId": 30, "level": 3 }, { "id": 414, "name": "千山区", "parentId": 30, "level": 3 }, { "id": 415, "name": "台安县", "parentId": 30, "level": 3 }, { "id": 416, "name": "岫岩满族自治县", "parentId": 30, "level": 3 }, { "id": 417, "name": "海城市", "parentId": 30, "level": 3 }, { "id": 418, "name": "新抚区", "parentId": 31, "level": 3 }, { "id": 419, "name": "东洲区", "parentId": 31, "level": 3 }, { "id": 420, "name": "望花区", "parentId": 31, "level": 3 }, { "id": 421, "name": "顺城区", "parentId": 31, "level": 3 }, { "id": 422, "name": "抚顺县", "parentId": 31, "level": 3 }, { "id": 423, "name": "新宾满族自治县", "parentId": 31, "level": 3 }, { "id": 424, "name": "清原满族自治县", "parentId": 31, "level": 3 }, { "id": 425, "name": "平山区", "parentId": 32, "level": 3 }, { "id": 426, "name": "溪湖区", "parentId": 32, "level": 3 }, { "id": 427, "name": "明山区", "parentId": 32, "level": 3 }, { "id": 428, "name": "南芬区", "parentId": 32, "level": 3 }, { "id": 429, "name": "本溪满族自治县", "parentId": 32, "level": 3 }, { "id": 430, "name": "桓仁满族自治县", "parentId": 32, "level": 3 }, { "id": 431, "name": "元宝区", "parentId": 33, "level": 3 }, { "id": 432, "name": "振兴区", "parentId": 33, "level": 3 }, { "id": 433, "name": "振安区", "parentId": 33, "level": 3 }, { "id": 434, "name": "宽甸满族自治县", "parentId": 33, "level": 3 }, { "id": 435, "name": "东港市", "parentId": 33, "level": 3 }, { "id": 436, "name": "凤城市", "parentId": 33, "level": 3 }, { "id": 437, "name": "古塔区", "parentId": 34, "level": 3 }, { "id": 438, "name": "凌河区", "parentId": 34, "level": 3 }, { "id": 439, "name": "太和区", "parentId": 34, "level": 3 }, { "id": 440, "name": "黑山县", "parentId": 34, "level": 3 }, { "id": 441, "name": "义县", "parentId": 34, "level": 3 }, { "id": 442, "name": "凌海市", "parentId": 34, "level": 3 }, { "id": 443, "name": "北镇市", "parentId": 34, "level": 3 }, { "id": 444, "name": "站前区", "parentId": 35, "level": 3 }, { "id": 445, "name": "西市区", "parentId": 35, "level": 3 }, { "id": 446, "name": "鮁鱼圈区", "parentId": 35, "level": 3 }, { "id": 447, "name": "老边区", "parentId": 35, "level": 3 }, { "id": 448, "name": "盖州市", "parentId": 35, "level": 3 }, { "id": 449, "name": "大石桥市", "parentId": 35, "level": 3 }, { "id": 450, "name": "海州区", "parentId": 36, "level": 3 }, { "id": 451, "name": "新邱区", "parentId": 36, "level": 3 }, { "id": 452, "name": "太平区", "parentId": 36, "level": 3 }, { "id": 453, "name": "清河门区", "parentId": 36, "level": 3 }, { "id": 454, "name": "细河区", "parentId": 36, "level": 3 }, { "id": 455, "name": "阜新蒙古族自治县", "parentId": 36, "level": 3 }, { "id": 456, "name": "彰武县", "parentId": 36, "level": 3 }, { "id": 457, "name": "白塔区", "parentId": 37, "level": 3 }, { "id": 458, "name": "文圣区", "parentId": 37, "level": 3 }, { "id": 459, "name": "宏伟区", "parentId": 37, "level": 3 }, { "id": 460, "name": "弓长岭区", "parentId": 37, "level": 3 }, { "id": 461, "name": "太子河区", "parentId": 37, "level": 3 }, { "id": 462, "name": "辽阳县", "parentId": 37, "level": 3 }, { "id": 463, "name": "灯塔市", "parentId": 37, "level": 3 }, { "id": 464, "name": "双塔区", "parentId": 38, "level": 3 }, { "id": 465, "name": "龙城区", "parentId": 38, "level": 3 }, { "id": 466, "name": "朝阳县", "parentId": 38, "level": 3 }, { "id": 467, "name": "建平县", "parentId": 38, "level": 3 }, { "id": 468, "name": "喀喇沁左翼蒙古族自治县", "parentId": 38, "level": 3 }, { "id": 469, "name": "北票市", "parentId": 38, "level": 3 }, { "id": 470, "name": "凌源市", "parentId": 38, "level": 3 }, { "id": 471, "name": "双台子区", "parentId": 39, "level": 3 }, { "id": 472, "name": "兴隆台区", "parentId": 39, "level": 3 }, { "id": 473, "name": "大洼县", "parentId": 39, "level": 3 }, { "id": 474, "name": "盘山县", "parentId": 39, "level": 3 }, { "id": 475, "name": "连山区", "parentId": 40, "level": 3 }, { "id": 476, "name": "龙港区", "parentId": 40, "level": 3 }, { "id": 477, "name": "南票区", "parentId": 40, "level": 3 }, { "id": 478, "name": "绥中县", "parentId": 40, "level": 3 }, { "id": 479, "name": "建昌县", "parentId": 40, "level": 3 }, { "id": 480, "name": "兴城市", "parentId": 40, "level": 3 }, { "id": 481, "name": "南关区", "parentId": 41, "level": 3 }, { "id": 482, "name": "宽城区", "parentId": 41, "level": 3 }, { "id": 483, "name": "朝阳区", "parentId": 41, "level": 3 }, { "id": 484, "name": "二道区", "parentId": 41, "level": 3 }, { "id": 485, "name": "绿园区", "parentId": 41, "level": 3 }, { "id": 486, "name": "双阳区", "parentId": 41, "level": 3 }, { "id": 487, "name": "农安县", "parentId": 41, "level": 3 }, { "id": 488, "name": "九台市", "parentId": 41, "level": 3 }, { "id": 489, "name": "榆树市", "parentId": 41, "level": 3 }, { "id": 490, "name": "德惠市", "parentId": 41, "level": 3 }, { "id": 491, "name": "昌邑区", "parentId": 42, "level": 3 }, { "id": 492, "name": "龙潭区", "parentId": 42, "level": 3 }, { "id": 493, "name": "船营区", "parentId": 42, "level": 3 }, { "id": 494, "name": "丰满区", "parentId": 42, "level": 3 }, { "id": 495, "name": "永吉县", "parentId": 42, "level": 3 }, { "id": 496, "name": "蛟河市", "parentId": 42, "level": 3 }, { "id": 497, "name": "桦甸市", "parentId": 42, "level": 3 }, { "id": 498, "name": "舒兰市", "parentId": 42, "level": 3 }, { "id": 499, "name": "磐石市", "parentId": 42, "level": 3 }, { "id": 500, "name": "延吉市", "parentId": 43, "level": 3 }, { "id": 501, "name": "图们市", "parentId": 43, "level": 3 }, { "id": 502, "name": "敦化市", "parentId": 43, "level": 3 }, { "id": 503, "name": "珲春市", "parentId": 43, "level": 3 }, { "id": 504, "name": "龙井市", "parentId": 43, "level": 3 }, { "id": 505, "name": "和龙市", "parentId": 43, "level": 3 }, { "id": 506, "name": "汪清县", "parentId": 43, "level": 3 }, { "id": 507, "name": "安图县", "parentId": 43, "level": 3 }, { "id": 508, "name": "铁西区", "parentId": 44, "level": 3 }, { "id": 509, "name": "铁东区", "parentId": 44, "level": 3 }, { "id": 510, "name": "梨树县", "parentId": 44, "level": 3 }, { "id": 511, "name": "伊通满族自治县", "parentId": 44, "level": 3 }, { "id": 512, "name": "公主岭市", "parentId": 44, "level": 3 }, { "id": 513, "name": "双辽市", "parentId": 44, "level": 3 }, { "id": 514, "name": "东昌区", "parentId": 45, "level": 3 }, { "id": 515, "name": "二道江区", "parentId": 45, "level": 3 }, { "id": 516, "name": "通化县", "parentId": 45, "level": 3 }, { "id": 517, "name": "辉南县", "parentId": 45, "level": 3 }, { "id": 518, "name": "柳河县", "parentId": 45, "level": 3 }, { "id": 519, "name": "梅河口市", "parentId": 45, "level": 3 }, { "id": 520, "name": "集安市", "parentId": 45, "level": 3 }, { "id": 521, "name": "洮北区", "parentId": 46, "level": 3 }, { "id": 522, "name": "镇赉县", "parentId": 46, "level": 3 }, { "id": 523, "name": "通榆县", "parentId": 46, "level": 3 }, { "id": 524, "name": "洮南市", "parentId": 46, "level": 3 }, { "id": 525, "name": "大安市", "parentId": 46, "level": 3 }, { "id": 526, "name": "龙山区", "parentId": 47, "level": 3 }, { "id": 527, "name": "西安区", "parentId": 47, "level": 3 }, { "id": 528, "name": "东丰县", "parentId": 47, "level": 3 }, { "id": 529, "name": "东辽县", "parentId": 47, "level": 3 }, { "id": 530, "name": "宁江区", "parentId": 48, "level": 3 }, { "id": 531, "name": "前郭尔罗斯蒙古族自治县", "parentId": 48, "level": 3 }, { "id": 532, "name": "长岭县", "parentId": 48, "level": 3 }, { "id": 533, "name": "乾安县", "parentId": 48, "level": 3 }, { "id": 534, "name": "扶余县", "parentId": 48, "level": 3 }, { "id": 535, "name": "八道江区", "parentId": 49, "level": 3 }, { "id": 536, "name": "江源区", "parentId": 49, "level": 3 }, { "id": 537, "name": "抚松县", "parentId": 49, "level": 3 }, { "id": 538, "name": "靖宇县", "parentId": 49, "level": 3 }, { "id": 539, "name": "长白朝鲜族自治县", "parentId": 49, "level": 3 }, { "id": 540, "name": "临江市", "parentId": 49, "level": 3 }, { "id": 541, "name": "道里区", "parentId": 50, "level": 3 }, { "id": 542, "name": "南岗区", "parentId": 50, "level": 3 }, { "id": 543, "name": "道外区", "parentId": 50, "level": 3 }, { "id": 544, "name": "平房区", "parentId": 50, "level": 3 }, { "id": 545, "name": "松北区", "parentId": 50, "level": 3 }, { "id": 546, "name": "香坊区", "parentId": 50, "level": 3 }, { "id": 547, "name": "呼兰区", "parentId": 50, "level": 3 }, { "id": 548, "name": "阿城区", "parentId": 50, "level": 3 }, { "id": 549, "name": "依兰县", "parentId": 50, "level": 3 }, { "id": 550, "name": "方正县", "parentId": 50, "level": 3 }, { "id": 551, "name": "宾县", "parentId": 50, "level": 3 }, { "id": 552, "name": "巴彦县", "parentId": 50, "level": 3 }, { "id": 553, "name": "木兰县", "parentId": 50, "level": 3 }, { "id": 554, "name": "通河县", "parentId": 50, "level": 3 }, { "id": 555, "name": "延寿县", "parentId": 50, "level": 3 }, { "id": 556, "name": "双城市", "parentId": 50, "level": 3 }, { "id": 557, "name": "尚志市", "parentId": 50, "level": 3 }, { "id": 558, "name": "五常市", "parentId": 50, "level": 3 }, { "id": 559, "name": "龙沙区", "parentId": 51, "level": 3 }, { "id": 560, "name": "建华区", "parentId": 51, "level": 3 }, { "id": 561, "name": "铁锋区", "parentId": 51, "level": 3 }, { "id": 562, "name": "昂昂溪区", "parentId": 51, "level": 3 }, { "id": 563, "name": "富拉尔基区", "parentId": 51, "level": 3 }, { "id": 564, "name": "碾子山区", "parentId": 51, "level": 3 }, { "id": 565, "name": "梅里斯达翰尔族区", "parentId": 51, "level": 3 }, { "id": 566, "name": "龙江县", "parentId": 51, "level": 3 }, { "id": 567, "name": "依安县", "parentId": 51, "level": 3 }, { "id": 568, "name": "泰来县", "parentId": 51, "level": 3 }, { "id": 569, "name": "甘南县", "parentId": 51, "level": 3 }, { "id": 570, "name": "富裕县", "parentId": 51, "level": 3 }, { "id": 571, "name": "克山县", "parentId": 51, "level": 3 }, { "id": 572, "name": "克东县", "parentId": 51, "level": 3 }, { "id": 573, "name": "拜泉县", "parentId": 51, "level": 3 }, { "id": 574, "name": "讷河市", "parentId": 51, "level": 3 }, { "id": 575, "name": "鸡冠区", "parentId": 52, "level": 3 }, { "id": 576, "name": "恒山区", "parentId": 52, "level": 3 }, { "id": 577, "name": "滴道区", "parentId": 52, "level": 3 }, { "id": 578, "name": "梨树区", "parentId": 52, "level": 3 }, { "id": 579, "name": "城子河区", "parentId": 52, "level": 3 }, { "id": 580, "name": "麻山区", "parentId": 52, "level": 3 }, { "id": 581, "name": "鸡东县", "parentId": 52, "level": 3 }, { "id": 582, "name": "虎林市", "parentId": 52, "level": 3 }, { "id": 583, "name": "密山市", "parentId": 52, "level": 3 }, { "id": 584, "name": "东安区", "parentId": 53, "level": 3 }, { "id": 585, "name": "阳明区", "parentId": 53, "level": 3 }, { "id": 586, "name": "爱民区", "parentId": 53, "level": 3 }, { "id": 587, "name": "西安区", "parentId": 53, "level": 3 }, { "id": 588, "name": "东宁县", "parentId": 53, "level": 3 }, { "id": 589, "name": "林口县", "parentId": 53, "level": 3 }, { "id": 590, "name": "绥芬河市", "parentId": 53, "level": 3 }, { "id": 591, "name": "海林市", "parentId": 53, "level": 3 }, { "id": 592, "name": "宁安市", "parentId": 53, "level": 3 }, { "id": 593, "name": "穆棱市", "parentId": 53, "level": 3 }, { "id": 594, "name": "新兴区", "parentId": 54, "level": 3 }, { "id": 595, "name": "桃山区", "parentId": 54, "level": 3 }, { "id": 596, "name": "茄子河区", "parentId": 54, "level": 3 }, { "id": 597, "name": "勃利县", "parentId": 54, "level": 3 }, { "id": 598, "name": "向阳区", "parentId": 55, "level": 3 }, { "id": 599, "name": "前进区", "parentId": 55, "level": 3 }, { "id": 600, "name": "东风区", "parentId": 55, "level": 3 }, { "id": 601, "name": "桦南县", "parentId": 55, "level": 3 }, { "id": 602, "name": "桦川县", "parentId": 55, "level": 3 }, { "id": 603, "name": "汤原县", "parentId": 55, "level": 3 }, { "id": 604, "name": "抚远县", "parentId": 55, "level": 3 }, { "id": 605, "name": "同江市", "parentId": 55, "level": 3 }, { "id": 606, "name": "富锦市", "parentId": 55, "level": 3 }, { "id": 607, "name": "向阳区", "parentId": 56, "level": 3 }, { "id": 608, "name": "工农区", "parentId": 56, "level": 3 }, { "id": 609, "name": "南山区", "parentId": 56, "level": 3 }, { "id": 610, "name": "兴安区", "parentId": 56, "level": 3 }, { "id": 611, "name": "东山区", "parentId": 56, "level": 3 }, { "id": 612, "name": "兴山区", "parentId": 56, "level": 3 }, { "id": 613, "name": "萝北县", "parentId": 56, "level": 3 }, { "id": 614, "name": "绥滨县", "parentId": 56, "level": 3 }, { "id": 615, "name": "尖山区", "parentId": 57, "level": 3 }, { "id": 616, "name": "岭东区", "parentId": 57, "level": 3 }, { "id": 617, "name": "四方台区", "parentId": 57, "level": 3 }, { "id": 618, "name": "宝山区", "parentId": 57, "level": 3 }, { "id": 619, "name": "集贤县", "parentId": 57, "level": 3 }, { "id": 620, "name": "友谊县", "parentId": 57, "level": 3 }, { "id": 621, "name": "宝清县", "parentId": 57, "level": 3 }, { "id": 622, "name": "饶河县", "parentId": 57, "level": 3 }, { "id": 623, "name": "北林区", "parentId": 58, "level": 3 }, { "id": 624, "name": "望奎县", "parentId": 58, "level": 3 }, { "id": 625, "name": "兰西县", "parentId": 58, "level": 3 }, { "id": 626, "name": "青冈县", "parentId": 58, "level": 3 }, { "id": 627, "name": "庆安县", "parentId": 58, "level": 3 }, { "id": 628, "name": "明水县", "parentId": 58, "level": 3 }, { "id": 629, "name": "绥棱县", "parentId": 58, "level": 3 }, { "id": 630, "name": "安达市", "parentId": 58, "level": 3 }, { "id": 631, "name": "肇东市", "parentId": 58, "level": 3 }, { "id": 632, "name": "海伦市", "parentId": 58, "level": 3 }, { "id": 633, "name": "爱辉区", "parentId": 59, "level": 3 }, { "id": 634, "name": "嫩江县", "parentId": 59, "level": 3 }, { "id": 635, "name": "逊克县", "parentId": 59, "level": 3 }, { "id": 636, "name": "孙吴县", "parentId": 59, "level": 3 }, { "id": 637, "name": "北安市", "parentId": 59, "level": 3 }, { "id": 638, "name": "五大连池市", "parentId": 59, "level": 3 }, { "id": 639, "name": "呼玛县", "parentId": 60, "level": 3 }, { "id": 640, "name": "塔河县", "parentId": 60, "level": 3 }, { "id": 641, "name": "漠河县", "parentId": 60, "level": 3 }, { "id": 642, "name": "伊春区", "parentId": 61, "level": 3 }, { "id": 643, "name": "南岔区", "parentId": 61, "level": 3 }, { "id": 644, "name": "友好区", "parentId": 61, "level": 3 }, { "id": 645, "name": "西林区", "parentId": 61, "level": 3 }, { "id": 646, "name": "翠峦区", "parentId": 61, "level": 3 }, { "id": 647, "name": "新青区", "parentId": 61, "level": 3 }, { "id": 648, "name": "美溪区", "parentId": 61, "level": 3 }, { "id": 649, "name": "金山屯区", "parentId": 61, "level": 3 }, { "id": 650, "name": "五营区", "parentId": 61, "level": 3 }, { "id": 651, "name": "乌马河区", "parentId": 61, "level": 3 }, { "id": 652, "name": "汤旺河区", "parentId": 61, "level": 3 }, { "id": 653, "name": "带岭区", "parentId": 61, "level": 3 }, { "id": 654, "name": "乌伊岭区", "parentId": 61, "level": 3 }, { "id": 655, "name": "红星区", "parentId": 61, "level": 3 }, { "id": 656, "name": "上甘岭区", "parentId": 61, "level": 3 }, { "id": 657, "name": "嘉荫县", "parentId": 61, "level": 3 }, { "id": 658, "name": "铁力市", "parentId": 61, "level": 3 }, { "id": 659, "name": "萨尔图区", "parentId": 62, "level": 3 }, { "id": 660, "name": "龙凤区", "parentId": 62, "level": 3 }, { "id": 661, "name": "让胡路区", "parentId": 62, "level": 3 }, { "id": 662, "name": "红岗区", "parentId": 62, "level": 3 }, { "id": 663, "name": "大同区", "parentId": 62, "level": 3 }, { "id": 664, "name": "肇州县", "parentId": 62, "level": 3 }, { "id": 665, "name": "肇源县", "parentId": 62, "level": 3 }, { "id": 666, "name": "林甸县", "parentId": 62, "level": 3 }, { "id": 667, "name": "杜尔伯特蒙古族自治县", "parentId": 62, "level": 3 }, { "id": 668, "name": "江宁区", "parentId": 63, "level": 3 }, { "id": 669, "name": "浦口区", "parentId": 63, "level": 3 }, { "id": 670, "name": "玄武区", "parentId": 63, "level": 3 }, { "id": 671, "name": "白下区", "parentId": 63, "level": 3 }, { "id": 672, "name": "秦淮区", "parentId": 63, "level": 3 }, { "id": 673, "name": "建邺区", "parentId": 63, "level": 3 }, { "id": 674, "name": "鼓楼区", "parentId": 63, "level": 3 }, { "id": 675, "name": "下关区", "parentId": 63, "level": 3 }, { "id": 676, "name": "栖霞区", "parentId": 63, "level": 3 }, { "id": 677, "name": "雨花台区", "parentId": 63, "level": 3 }, { "id": 678, "name": "六合区", "parentId": 63, "level": 3 }, { "id": 679, "name": "溧水县", "parentId": 63, "level": 3 }, { "id": 680, "name": "高淳县", "parentId": 63, "level": 3 }, { "id": 681, "name": "崇安区", "parentId": 64, "level": 3 }, { "id": 682, "name": "南长区", "parentId": 64, "level": 3 }, { "id": 683, "name": "北塘区", "parentId": 64, "level": 3 }, { "id": 684, "name": "锡山区", "parentId": 64, "level": 3 }, { "id": 685, "name": "惠山区", "parentId": 64, "level": 3 }, { "id": 686, "name": "滨湖区", "parentId": 64, "level": 3 }, { "id": 687, "name": "江阴市", "parentId": 64, "level": 3 }, { "id": 688, "name": "宜兴市", "parentId": 64, "level": 3 }, { "id": 689, "name": "京口区", "parentId": 65, "level": 3 }, { "id": 690, "name": "润州区", "parentId": 65, "level": 3 }, { "id": 691, "name": "丹徒区", "parentId": 65, "level": 3 }, { "id": 692, "name": "丹阳市", "parentId": 65, "level": 3 }, { "id": 693, "name": "扬中市", "parentId": 65, "level": 3 }, { "id": 694, "name": "句容市", "parentId": 65, "level": 3 }, { "id": 695, "name": "沧浪区", "parentId": 66, "level": 3 }, { "id": 696, "name": "常熟市", "parentId": 66, "level": 3 }, { "id": 697, "name": "平江区", "parentId": 66, "level": 3 }, { "id": 698, "name": "金阊区", "parentId": 66, "level": 3 }, { "id": 699, "name": "虎丘区", "parentId": 66, "level": 3 }, { "id": 700, "name": "昆山市", "parentId": 66, "level": 3 }, { "id": 701, "name": "太仓市", "parentId": 66, "level": 3 }, { "id": 702, "name": "吴江市", "parentId": 66, "level": 3 }, { "id": 703, "name": "吴中区", "parentId": 66, "level": 3 }, { "id": 704, "name": "相城区", "parentId": 66, "level": 3 }, { "id": 705, "name": "张家港市", "parentId": 66, "level": 3 }, { "id": 706, "name": "崇川区", "parentId": 67, "level": 3 }, { "id": 707, "name": "港闸区", "parentId": 67, "level": 3 }, { "id": 708, "name": "海安县", "parentId": 67, "level": 3 }, { "id": 709, "name": "如东县", "parentId": 67, "level": 3 }, { "id": 710, "name": "启东市", "parentId": 67, "level": 3 }, { "id": 711, "name": "如皋市", "parentId": 67, "level": 3 }, { "id": 712, "name": "通州市", "parentId": 67, "level": 3 }, { "id": 713, "name": "海门市", "parentId": 67, "level": 3 }, { "id": 714, "name": "高邮市", "parentId": 68, "level": 3 }, { "id": 715, "name": "广陵区", "parentId": 68, "level": 3 }, { "id": 716, "name": "邗江区", "parentId": 68, "level": 3 }, { "id": 717, "name": "维扬区", "parentId": 68, "level": 3 }, { "id": 718, "name": "宝应县", "parentId": 68, "level": 3 }, { "id": 719, "name": "江都市", "parentId": 68, "level": 3 }, { "id": 720, "name": "仪征市", "parentId": 68, "level": 3 }, { "id": 721, "name": "亭湖区", "parentId": 69, "level": 3 }, { "id": 722, "name": "盐都区", "parentId": 69, "level": 3 }, { "id": 723, "name": "响水县", "parentId": 69, "level": 3 }, { "id": 724, "name": "滨海县", "parentId": 69, "level": 3 }, { "id": 725, "name": "阜宁县", "parentId": 69, "level": 3 }, { "id": 726, "name": "射阳县", "parentId": 69, "level": 3 }, { "id": 727, "name": "建湖县", "parentId": 69, "level": 3 }, { "id": 728, "name": "东台市", "parentId": 69, "level": 3 }, { "id": 729, "name": "大丰市", "parentId": 69, "level": 3 }, { "id": 730, "name": "鼓楼区", "parentId": 70, "level": 3 }, { "id": 731, "name": "云龙区", "parentId": 70, "level": 3 }, { "id": 732, "name": "九里区", "parentId": 70, "level": 3 }, { "id": 733, "name": "贾汪区", "parentId": 70, "level": 3 }, { "id": 734, "name": "泉山区", "parentId": 70, "level": 3 }, { "id": 735, "name": "丰县", "parentId": 70, "level": 3 }, { "id": 736, "name": "沛县", "parentId": 70, "level": 3 }, { "id": 737, "name": "铜山县", "parentId": 70, "level": 3 }, { "id": 738, "name": "睢宁县", "parentId": 70, "level": 3 }, { "id": 739, "name": "新沂市", "parentId": 70, "level": 3 }, { "id": 740, "name": "邳州市", "parentId": 70, "level": 3 }, { "id": 741, "name": "清河区", "parentId": 71, "level": 3 }, { "id": 742, "name": "楚州区", "parentId": 71, "level": 3 }, { "id": 743, "name": "淮阴区", "parentId": 71, "level": 3 }, { "id": 744, "name": "清浦区", "parentId": 71, "level": 3 }, { "id": 745, "name": "涟水县", "parentId": 71, "level": 3 }, { "id": 746, "name": "洪泽县", "parentId": 71, "level": 3 }, { "id": 747, "name": "盱眙县", "parentId": 71, "level": 3 }, { "id": 748, "name": "金湖县", "parentId": 71, "level": 3 }, { "id": 749, "name": "连云区", "parentId": 72, "level": 3 }, { "id": 750, "name": "新浦区", "parentId": 72, "level": 3 }, { "id": 751, "name": "海州区", "parentId": 72, "level": 3 }, { "id": 752, "name": "赣榆县", "parentId": 72, "level": 3 }, { "id": 753, "name": "东海县", "parentId": 72, "level": 3 }, { "id": 754, "name": "灌云县", "parentId": 72, "level": 3 }, { "id": 755, "name": "灌南县", "parentId": 72, "level": 3 }, { "id": 756, "name": "天宁区", "parentId": 73, "level": 3 }, { "id": 757, "name": "钟楼区", "parentId": 73, "level": 3 }, { "id": 758, "name": "戚墅堰区", "parentId": 73, "level": 3 }, { "id": 759, "name": "新北区", "parentId": 73, "level": 3 }, { "id": 760, "name": "武进区", "parentId": 73, "level": 3 }, { "id": 761, "name": "溧阳市", "parentId": 73, "level": 3 }, { "id": 762, "name": "金坛市", "parentId": 73, "level": 3 }, { "id": 763, "name": "海陵区", "parentId": 74, "level": 3 }, { "id": 764, "name": "高港区", "parentId": 74, "level": 3 }, { "id": 765, "name": "兴化市", "parentId": 74, "level": 3 }, { "id": 766, "name": "靖江市", "parentId": 74, "level": 3 }, { "id": 767, "name": "泰兴市", "parentId": 74, "level": 3 }, { "id": 768, "name": "姜堰市", "parentId": 74, "level": 3 }, { "id": 769, "name": "宿城区", "parentId": 75, "level": 3 }, { "id": 770, "name": "宿豫区", "parentId": 75, "level": 3 }, { "id": 771, "name": "沭阳县", "parentId": 75, "level": 3 }, { "id": 772, "name": "泗阳县", "parentId": 75, "level": 3 }, { "id": 773, "name": "泗洪县", "parentId": 75, "level": 3 }, { "id": 774, "name": "定海区", "parentId": 76, "level": 3 }, { "id": 775, "name": "普陀区", "parentId": 76, "level": 3 }, { "id": 776, "name": "岱山县", "parentId": 76, "level": 3 }, { "id": 777, "name": "嵊泗县", "parentId": 76, "level": 3 }, { "id": 778, "name": "柯城区", "parentId": 77, "level": 3 }, { "id": 779, "name": "衢江区", "parentId": 77, "level": 3 }, { "id": 780, "name": "常山县", "parentId": 77, "level": 3 }, { "id": 781, "name": "开化县", "parentId": 77, "level": 3 }, { "id": 782, "name": "龙游县", "parentId": 77, "level": 3 }, { "id": 783, "name": "江山市", "parentId": 77, "level": 3 }, { "id": 784, "name": "上城区", "parentId": 78, "level": 3 }, { "id": 785, "name": "下城区", "parentId": 78, "level": 3 }, { "id": 786, "name": "江干区", "parentId": 78, "level": 3 }, { "id": 787, "name": "拱墅区", "parentId": 78, "level": 3 }, { "id": 788, "name": "西湖区", "parentId": 78, "level": 3 }, { "id": 789, "name": "滨江区", "parentId": 78, "level": 3 }, { "id": 790, "name": "余杭区", "parentId": 78, "level": 3 }, { "id": 791, "name": "桐庐县", "parentId": 78, "level": 3 }, { "id": 792, "name": "淳安县", "parentId": 78, "level": 3 }, { "id": 793, "name": "建德市", "parentId": 78, "level": 3 }, { "id": 794, "name": "富阳市", "parentId": 78, "level": 3 }, { "id": 795, "name": "临安市", "parentId": 78, "level": 3 }, { "id": 796, "name": "萧山区", "parentId": 78, "level": 3 }, { "id": 797, "name": "吴兴区", "parentId": 79, "level": 3 }, { "id": 798, "name": "南浔区", "parentId": 79, "level": 3 }, { "id": 799, "name": "德清县", "parentId": 79, "level": 3 }, { "id": 800, "name": "长兴县", "parentId": 79, "level": 3 }, { "id": 801, "name": "安吉县", "parentId": 79, "level": 3 }, { "id": 802, "name": " 南湖区", "parentId": 80, "level": 3 }, { "id": 803, "name": " 秀洲区", "parentId": 80, "level": 3 }, { "id": 804, "name": " 嘉善县", "parentId": 80, "level": 3 }, { "id": 805, "name": " 海盐县", "parentId": 80, "level": 3 }, { "id": 806, "name": " 海宁市", "parentId": 80, "level": 3 }, { "id": 807, "name": " 平湖市", "parentId": 80, "level": 3 }, { "id": 808, "name": " 桐乡市 ", "parentId": 80, "level": 3 }, { "id": 809, "name": "海曙区", "parentId": 81, "level": 3 }, { "id": 810, "name": "江东区", "parentId": 81, "level": 3 }, { "id": 811, "name": "江北区", "parentId": 81, "level": 3 }, { "id": 812, "name": "北仑区", "parentId": 81, "level": 3 }, { "id": 813, "name": "镇海区", "parentId": 81, "level": 3 }, { "id": 814, "name": "鄞州区", "parentId": 81, "level": 3 }, { "id": 815, "name": "象山县", "parentId": 81, "level": 3 }, { "id": 816, "name": "宁海县", "parentId": 81, "level": 3 }, { "id": 817, "name": "余姚市", "parentId": 81, "level": 3 }, { "id": 818, "name": "慈溪市", "parentId": 81, "level": 3 }, { "id": 819, "name": "奉化市", "parentId": 81, "level": 3 }, { "id": 820, "name": "越城区", "parentId": 82, "level": 3 }, { "id": 821, "name": "绍兴县", "parentId": 82, "level": 3 }, { "id": 822, "name": "新昌县", "parentId": 82, "level": 3 }, { "id": 823, "name": "诸暨市", "parentId": 82, "level": 3 }, { "id": 824, "name": "上虞市", "parentId": 82, "level": 3 }, { "id": 825, "name": "嵊州市", "parentId": 82, "level": 3 }, { "id": 826, "name": "鹿城区", "parentId": 83, "level": 3 }, { "id": 827, "name": "龙湾区", "parentId": 83, "level": 3 }, { "id": 828, "name": "瓯海区", "parentId": 83, "level": 3 }, { "id": 829, "name": "洞头县", "parentId": 83, "level": 3 }, { "id": 830, "name": "永嘉县", "parentId": 83, "level": 3 }, { "id": 831, "name": "平阳县", "parentId": 83, "level": 3 }, { "id": 832, "name": "苍南县", "parentId": 83, "level": 3 }, { "id": 833, "name": "文成县", "parentId": 83, "level": 3 }, { "id": 834, "name": "泰顺县", "parentId": 83, "level": 3 }, { "id": 835, "name": "瑞安市", "parentId": 83, "level": 3 }, { "id": 836, "name": "乐清市", "parentId": 83, "level": 3 }, { "id": 837, "name": "莲都区", "parentId": 84, "level": 3 }, { "id": 838, "name": "青田县", "parentId": 84, "level": 3 }, { "id": 839, "name": "缙云县", "parentId": 84, "level": 3 }, { "id": 840, "name": "遂昌县", "parentId": 84, "level": 3 }, { "id": 841, "name": "松阳县", "parentId": 84, "level": 3 }, { "id": 842, "name": "云和县", "parentId": 84, "level": 3 }, { "id": 843, "name": "庆元县", "parentId": 84, "level": 3 }, { "id": 844, "name": "景宁畲族自治县", "parentId": 84, "level": 3 }, { "id": 845, "name": "龙泉市", "parentId": 84, "level": 3 }, { "id": 846, "name": "婺城区", "parentId": 85, "level": 3 }, { "id": 847, "name": "金东区", "parentId": 85, "level": 3 }, { "id": 848, "name": "武义县", "parentId": 85, "level": 3 }, { "id": 849, "name": "浦江县", "parentId": 85, "level": 3 }, { "id": 850, "name": "磐安县", "parentId": 85, "level": 3 }, { "id": 851, "name": "兰溪市", "parentId": 85, "level": 3 }, { "id": 852, "name": "义乌市", "parentId": 85, "level": 3 }, { "id": 853, "name": "东阳市", "parentId": 85, "level": 3 }, { "id": 854, "name": "永康市", "parentId": 85, "level": 3 }, { "id": 855, "name": "椒江区", "parentId": 86, "level": 3 }, { "id": 856, "name": "黄岩区", "parentId": 86, "level": 3 }, { "id": 857, "name": "路桥区", "parentId": 86, "level": 3 }, { "id": 858, "name": "玉环县", "parentId": 86, "level": 3 }, { "id": 859, "name": "三门县", "parentId": 86, "level": 3 }, { "id": 860, "name": "天台县", "parentId": 86, "level": 3 }, { "id": 861, "name": "仙居县", "parentId": 86, "level": 3 }, { "id": 862, "name": "温岭市", "parentId": 86, "level": 3 }, { "id": 863, "name": "临海市", "parentId": 86, "level": 3 }, { "id": 864, "name": "瑶海区", "parentId": 87, "level": 3 }, { "id": 865, "name": "庐阳区", "parentId": 87, "level": 3 }, { "id": 866, "name": "蜀山区", "parentId": 87, "level": 3 }, { "id": 867, "name": "包河区", "parentId": 87, "level": 3 }, { "id": 868, "name": "长丰县", "parentId": 87, "level": 3 }, { "id": 869, "name": "肥东县", "parentId": 87, "level": 3 }, { "id": 870, "name": "肥西县", "parentId": 87, "level": 3 }, { "id": 871, "name": "镜湖区", "parentId": 88, "level": 3 }, { "id": 872, "name": "弋江区", "parentId": 88, "level": 3 }, { "id": 873, "name": "鸠江区", "parentId": 88, "level": 3 }, { "id": 874, "name": "三山区", "parentId": 88, "level": 3 }, { "id": 875, "name": "芜湖县", "parentId": 88, "level": 3 }, { "id": 876, "name": "繁昌县", "parentId": 88, "level": 3 }, { "id": 877, "name": "南陵县", "parentId": 88, "level": 3 }, { "id": 878, "name": "龙子湖区", "parentId": 89, "level": 3 }, { "id": 879, "name": "蚌山区", "parentId": 89, "level": 3 }, { "id": 880, "name": "禹会区", "parentId": 89, "level": 3 }, { "id": 881, "name": "淮上区", "parentId": 89, "level": 3 }, { "id": 882, "name": "怀远县", "parentId": 89, "level": 3 }, { "id": 883, "name": "五河县", "parentId": 89, "level": 3 }, { "id": 884, "name": "固镇县", "parentId": 89, "level": 3 }, { "id": 885, "name": "大通区", "parentId": 90, "level": 3 }, { "id": 886, "name": "田家庵区", "parentId": 90, "level": 3 }, { "id": 887, "name": "谢家集区", "parentId": 90, "level": 3 }, { "id": 888, "name": "八公山区", "parentId": 90, "level": 3 }, { "id": 889, "name": "潘集区", "parentId": 90, "level": 3 }, { "id": 890, "name": "凤台县", "parentId": 90, "level": 3 }, { "id": 891, "name": "金家庄区", "parentId": 91, "level": 3 }, { "id": 892, "name": "花山区", "parentId": 91, "level": 3 }, { "id": 893, "name": "雨山区", "parentId": 91, "level": 3 }, { "id": 894, "name": "当涂县", "parentId": 91, "level": 3 }, { "id": 895, "name": "杜集区", "parentId": 92, "level": 3 }, { "id": 896, "name": "相山区", "parentId": 92, "level": 3 }, { "id": 897, "name": "烈山区", "parentId": 92, "level": 3 }, { "id": 898, "name": "濉溪县 ", "parentId": 92, "level": 3 }, { "id": 899, "name": "铜官山区", "parentId": 93, "level": 3 }, { "id": 900, "name": "狮子山区", "parentId": 93, "level": 3 }, { "id": 901, "name": "铜陵县", "parentId": 93, "level": 3 }, { "id": 902, "name": "迎江区", "parentId": 94, "level": 3 }, { "id": 903, "name": "大观区", "parentId": 94, "level": 3 }, { "id": 904, "name": "宜秀区", "parentId": 94, "level": 3 }, { "id": 905, "name": "怀宁县", "parentId": 94, "level": 3 }, { "id": 906, "name": "枞阳县", "parentId": 94, "level": 3 }, { "id": 907, "name": "潜山县", "parentId": 94, "level": 3 }, { "id": 908, "name": "太湖县", "parentId": 94, "level": 3 }, { "id": 909, "name": "宿松县", "parentId": 94, "level": 3 }, { "id": 910, "name": "望江县", "parentId": 94, "level": 3 }, { "id": 911, "name": "岳西县", "parentId": 94, "level": 3 }, { "id": 912, "name": "桐城市", "parentId": 94, "level": 3 }, { "id": 913, "name": "屯溪区", "parentId": 95, "level": 3 }, { "id": 914, "name": "黄山区", "parentId": 95, "level": 3 }, { "id": 915, "name": "徽州区", "parentId": 95, "level": 3 }, { "id": 916, "name": "歙县", "parentId": 95, "level": 3 }, { "id": 917, "name": "休宁县", "parentId": 95, "level": 3 }, { "id": 918, "name": "黟县", "parentId": 95, "level": 3 }, { "id": 919, "name": "祁门县", "parentId": 95, "level": 3 }, { "id": 920, "name": "琅琊区", "parentId": 96, "level": 3 }, { "id": 921, "name": "南谯区", "parentId": 96, "level": 3 }, { "id": 922, "name": "来安县", "parentId": 96, "level": 3 }, { "id": 923, "name": "全椒县", "parentId": 96, "level": 3 }, { "id": 924, "name": "定远县", "parentId": 96, "level": 3 }, { "id": 925, "name": "凤阳县", "parentId": 96, "level": 3 }, { "id": 926, "name": "天长市", "parentId": 96, "level": 3 }, { "id": 927, "name": "明光市", "parentId": 96, "level": 3 }, { "id": 928, "name": "颍州区", "parentId": 97, "level": 3 }, { "id": 929, "name": "颍东区", "parentId": 97, "level": 3 }, { "id": 930, "name": "颍泉区", "parentId": 97, "level": 3 }, { "id": 931, "name": "临泉县", "parentId": 97, "level": 3 }, { "id": 932, "name": "太和县", "parentId": 97, "level": 3 }, { "id": 933, "name": "阜南县", "parentId": 97, "level": 3 }, { "id": 934, "name": "颍上县", "parentId": 97, "level": 3 }, { "id": 935, "name": "界首市", "parentId": 97, "level": 3 }, { "id": 936, "name": "埇桥区", "parentId": 98, "level": 3 }, { "id": 937, "name": "砀山县", "parentId": 98, "level": 3 }, { "id": 938, "name": "萧县", "parentId": 98, "level": 3 }, { "id": 939, "name": "灵璧县", "parentId": 98, "level": 3 }, { "id": 940, "name": "泗县 ", "parentId": 98, "level": 3 }, { "id": 941, "name": "居巢区", "parentId": 99, "level": 3 }, { "id": 942, "name": "庐江县", "parentId": 99, "level": 3 }, { "id": 943, "name": "无为县", "parentId": 99, "level": 3 }, { "id": 944, "name": "含山县", "parentId": 99, "level": 3 }, { "id": 945, "name": "和县 ", "parentId": 99, "level": 3 }, { "id": 946, "name": "金安区", "parentId": 100, "level": 3 }, { "id": 947, "name": "裕安区", "parentId": 100, "level": 3 }, { "id": 948, "name": "寿县", "parentId": 100, "level": 3 }, { "id": 949, "name": "霍邱县", "parentId": 100, "level": 3 }, { "id": 950, "name": "舒城县", "parentId": 100, "level": 3 }, { "id": 951, "name": "金寨县", "parentId": 100, "level": 3 }, { "id": 952, "name": "霍山县", "parentId": 100, "level": 3 }, { "id": 953, "name": "谯城区", "parentId": 101, "level": 3 }, { "id": 954, "name": "涡阳县", "parentId": 101, "level": 3 }, { "id": 955, "name": "蒙城县", "parentId": 101, "level": 3 }, { "id": 956, "name": "利辛县", "parentId": 101, "level": 3 }, { "id": 957, "name": "贵池区", "parentId": 102, "level": 3 }, { "id": 958, "name": "东至县", "parentId": 102, "level": 3 }, { "id": 959, "name": "石台县", "parentId": 102, "level": 3 }, { "id": 960, "name": "青阳县", "parentId": 102, "level": 3 }, { "id": 961, "name": "宣州区", "parentId": 103, "level": 3 }, { "id": 962, "name": "郎溪县", "parentId": 103, "level": 3 }, { "id": 963, "name": "广德县", "parentId": 103, "level": 3 }, { "id": 964, "name": "泾县", "parentId": 103, "level": 3 }, { "id": 965, "name": "绩溪县", "parentId": 103, "level": 3 }, { "id": 966, "name": "旌德县", "parentId": 103, "level": 3 }, { "id": 967, "name": "宁国市", "parentId": 103, "level": 3 }, { "id": 968, "name": "鼓楼区", "parentId": 104, "level": 3 }, { "id": 969, "name": "台江区", "parentId": 104, "level": 3 }, { "id": 970, "name": "仓山区", "parentId": 104, "level": 3 }, { "id": 971, "name": "马尾区", "parentId": 104, "level": 3 }, { "id": 972, "name": "晋安区", "parentId": 104, "level": 3 }, { "id": 973, "name": "闽侯县", "parentId": 104, "level": 3 }, { "id": 974, "name": "连江县", "parentId": 104, "level": 3 }, { "id": 975, "name": "罗源县", "parentId": 104, "level": 3 }, { "id": 976, "name": "闽清县", "parentId": 104, "level": 3 }, { "id": 977, "name": "永泰县", "parentId": 104, "level": 3 }, { "id": 978, "name": "平潭县", "parentId": 104, "level": 3 }, { "id": 979, "name": "福清市", "parentId": 104, "level": 3 }, { "id": 980, "name": "长乐市", "parentId": 104, "level": 3 }, { "id": 981, "name": "思明区", "parentId": 105, "level": 3 }, { "id": 982, "name": "海沧区", "parentId": 105, "level": 3 }, { "id": 983, "name": "湖里区", "parentId": 105, "level": 3 }, { "id": 984, "name": "集美区", "parentId": 105, "level": 3 }, { "id": 985, "name": "同安区", "parentId": 105, "level": 3 }, { "id": 986, "name": "翔安区", "parentId": 105, "level": 3 }, { "id": 987, "name": "蕉城区", "parentId": 106, "level": 3 }, { "id": 988, "name": "霞浦县", "parentId": 106, "level": 3 }, { "id": 989, "name": "古田县", "parentId": 106, "level": 3 }, { "id": 990, "name": "屏南县", "parentId": 106, "level": 3 }, { "id": 991, "name": "寿宁县", "parentId": 106, "level": 3 }, { "id": 992, "name": "周宁县", "parentId": 106, "level": 3 }, { "id": 993, "name": "柘荣县", "parentId": 106, "level": 3 }, { "id": 994, "name": "福安市", "parentId": 106, "level": 3 }, { "id": 995, "name": "福鼎市", "parentId": 106, "level": 3 }, { "id": 996, "name": "城厢区", "parentId": 107, "level": 3 }, { "id": 997, "name": "涵江区", "parentId": 107, "level": 3 }, { "id": 998, "name": "荔城区", "parentId": 107, "level": 3 }, { "id": 999, "name": "秀屿区", "parentId": 107, "level": 3 }, { "id": 1000, "name": "仙游县", "parentId": 107, "level": 3 }, { "id": 1001, "name": "鲤城区", "parentId": 108, "level": 3 }, { "id": 1002, "name": "丰泽区", "parentId": 108, "level": 3 }, { "id": 1003, "name": "洛江区", "parentId": 108, "level": 3 }, { "id": 1004, "name": "泉港区", "parentId": 108, "level": 3 }, { "id": 1005, "name": "惠安县", "parentId": 108, "level": 3 }, { "id": 1006, "name": "安溪县", "parentId": 108, "level": 3 }, { "id": 1007, "name": "永春县", "parentId": 108, "level": 3 }, { "id": 1008, "name": "德化县", "parentId": 108, "level": 3 }, { "id": 1009, "name": "石狮市", "parentId": 108, "level": 3 }, { "id": 1010, "name": "晋江市", "parentId": 108, "level": 3 }, { "id": 1011, "name": "南安市", "parentId": 108, "level": 3 }, { "id": 1012, "name": "芗城区", "parentId": 109, "level": 3 }, { "id": 1013, "name": "龙文区", "parentId": 109, "level": 3 }, { "id": 1014, "name": "云霄县", "parentId": 109, "level": 3 }, { "id": 1015, "name": "漳浦县", "parentId": 109, "level": 3 }, { "id": 1016, "name": "诏安县", "parentId": 109, "level": 3 }, { "id": 1017, "name": "长泰县", "parentId": 109, "level": 3 }, { "id": 1018, "name": "东山县", "parentId": 109, "level": 3 }, { "id": 1019, "name": "南靖县", "parentId": 109, "level": 3 }, { "id": 1020, "name": "平和县", "parentId": 109, "level": 3 }, { "id": 1021, "name": "华安县", "parentId": 109, "level": 3 }, { "id": 1022, "name": "龙海市", "parentId": 109, "level": 3 }, { "id": 1023, "name": "新罗区", "parentId": 110, "level": 3 }, { "id": 1024, "name": "长汀县", "parentId": 110, "level": 3 }, { "id": 1025, "name": "永定县", "parentId": 110, "level": 3 }, { "id": 1026, "name": "上杭县", "parentId": 110, "level": 3 }, { "id": 1027, "name": "武平县", "parentId": 110, "level": 3 }, { "id": 1028, "name": "连城县", "parentId": 110, "level": 3 }, { "id": 1029, "name": "漳平市", "parentId": 110, "level": 3 }, { "id": 1030, "name": "梅列区", "parentId": 111, "level": 3 }, { "id": 1031, "name": "三元区", "parentId": 111, "level": 3 }, { "id": 1032, "name": "明溪县", "parentId": 111, "level": 3 }, { "id": 1033, "name": "清流县", "parentId": 111, "level": 3 }, { "id": 1034, "name": "宁化县", "parentId": 111, "level": 3 }, { "id": 1035, "name": "大田县", "parentId": 111, "level": 3 }, { "id": 1036, "name": "尤溪县", "parentId": 111, "level": 3 }, { "id": 1037, "name": "沙县", "parentId": 111, "level": 3 }, { "id": 1038, "name": "将乐县", "parentId": 111, "level": 3 }, { "id": 1039, "name": "泰宁县", "parentId": 111, "level": 3 }, { "id": 1040, "name": "建宁县", "parentId": 111, "level": 3 }, { "id": 1041, "name": "永安市", "parentId": 111, "level": 3 }, { "id": 1042, "name": "延平区", "parentId": 112, "level": 3 }, { "id": 1043, "name": "顺昌县", "parentId": 112, "level": 3 }, { "id": 1044, "name": "浦城县", "parentId": 112, "level": 3 }, { "id": 1045, "name": "光泽县", "parentId": 112, "level": 3 }, { "id": 1046, "name": "松溪县", "parentId": 112, "level": 3 }, { "id": 1047, "name": "政和县", "parentId": 112, "level": 3 }, { "id": 1048, "name": "邵武市", "parentId": 112, "level": 3 }, { "id": 1049, "name": "武夷山市", "parentId": 112, "level": 3 }, { "id": 1050, "name": "建瓯市", "parentId": 112, "level": 3 }, { "id": 1051, "name": "建阳市", "parentId": 112, "level": 3 }, { "id": 1052, "name": "月湖区", "parentId": 113, "level": 3 }, { "id": 1053, "name": "余江县", "parentId": 113, "level": 3 }, { "id": 1054, "name": "贵溪市", "parentId": 113, "level": 3 }, { "id": 1055, "name": "渝水区", "parentId": 114, "level": 3 }, { "id": 1056, "name": "分宜县", "parentId": 114, "level": 3 }, { "id": 1057, "name": "东湖区", "parentId": 115, "level": 3 }, { "id": 1058, "name": "西湖区", "parentId": 115, "level": 3 }, { "id": 1059, "name": "青云谱区", "parentId": 115, "level": 3 }, { "id": 1060, "name": "湾里区", "parentId": 115, "level": 3 }, { "id": 1061, "name": "青山湖区", "parentId": 115, "level": 3 }, { "id": 1062, "name": "南昌县", "parentId": 115, "level": 3 }, { "id": 1063, "name": "新建县", "parentId": 115, "level": 3 }, { "id": 1064, "name": "安义县", "parentId": 115, "level": 3 }, { "id": 1065, "name": "进贤县", "parentId": 115, "level": 3 }, { "id": 1066, "name": "庐山区", "parentId": 116, "level": 3 }, { "id": 1067, "name": "浔阳区", "parentId": 116, "level": 3 }, { "id": 1068, "name": "九江县", "parentId": 116, "level": 3 }, { "id": 1069, "name": "武宁县", "parentId": 116, "level": 3 }, { "id": 1070, "name": "修水县", "parentId": 116, "level": 3 }, { "id": 1071, "name": "永修县", "parentId": 116, "level": 3 }, { "id": 1072, "name": "德安县", "parentId": 116, "level": 3 }, { "id": 1073, "name": "星子县", "parentId": 116, "level": 3 }, { "id": 1074, "name": "都昌县", "parentId": 116, "level": 3 }, { "id": 1075, "name": "湖口县", "parentId": 116, "level": 3 }, { "id": 1076, "name": "彭泽县", "parentId": 116, "level": 3 }, { "id": 1077, "name": "瑞昌市", "parentId": 116, "level": 3 }, { "id": 1078, "name": "信州区", "parentId": 117, "level": 3 }, { "id": 1079, "name": "上饶县", "parentId": 117, "level": 3 }, { "id": 1080, "name": "广丰县", "parentId": 117, "level": 3 }, { "id": 1081, "name": "玉山县", "parentId": 117, "level": 3 }, { "id": 1082, "name": "铅山县", "parentId": 117, "level": 3 }, { "id": 1083, "name": "横峰县", "parentId": 117, "level": 3 }, { "id": 1084, "name": "弋阳县", "parentId": 117, "level": 3 }, { "id": 1085, "name": "余干县", "parentId": 117, "level": 3 }, { "id": 1086, "name": "鄱阳县", "parentId": 117, "level": 3 }, { "id": 1087, "name": "万年县", "parentId": 117, "level": 3 }, { "id": 1088, "name": "婺源县", "parentId": 117, "level": 3 }, { "id": 1089, "name": "德兴市", "parentId": 117, "level": 3 }, { "id": 1090, "name": "临川区", "parentId": 118, "level": 3 }, { "id": 1091, "name": "南城县", "parentId": 118, "level": 3 }, { "id": 1092, "name": "黎川县", "parentId": 118, "level": 3 }, { "id": 1093, "name": "南丰县", "parentId": 118, "level": 3 }, { "id": 1094, "name": "崇仁县", "parentId": 118, "level": 3 }, { "id": 1095, "name": "乐安县", "parentId": 118, "level": 3 }, { "id": 1096, "name": "宜黄县", "parentId": 118, "level": 3 }, { "id": 1097, "name": "金溪县", "parentId": 118, "level": 3 }, { "id": 1098, "name": "资溪县", "parentId": 118, "level": 3 }, { "id": 1099, "name": "东乡县", "parentId": 118, "level": 3 }, { "id": 1100, "name": "广昌县", "parentId": 118, "level": 3 }, { "id": 1101, "name": "袁州区", "parentId": 119, "level": 3 }, { "id": 1102, "name": "奉新县", "parentId": 119, "level": 3 }, { "id": 1103, "name": "万载县", "parentId": 119, "level": 3 }, { "id": 1104, "name": "上高县", "parentId": 119, "level": 3 }, { "id": 1105, "name": "宜丰县", "parentId": 119, "level": 3 }, { "id": 1106, "name": "靖安县", "parentId": 119, "level": 3 }, { "id": 1107, "name": "铜鼓县", "parentId": 119, "level": 3 }, { "id": 1108, "name": "丰城市", "parentId": 119, "level": 3 }, { "id": 1109, "name": "樟树市", "parentId": 119, "level": 3 }, { "id": 1110, "name": "高安市", "parentId": 119, "level": 3 }, { "id": 1111, "name": "吉州区", "parentId": 120, "level": 3 }, { "id": 1112, "name": "青原区", "parentId": 120, "level": 3 }, { "id": 1113, "name": "吉安县", "parentId": 120, "level": 3 }, { "id": 1114, "name": "吉水县", "parentId": 120, "level": 3 }, { "id": 1115, "name": "峡江县", "parentId": 120, "level": 3 }, { "id": 1116, "name": "新干县", "parentId": 120, "level": 3 }, { "id": 1117, "name": "永丰县", "parentId": 120, "level": 3 }, { "id": 1118, "name": "泰和县", "parentId": 120, "level": 3 }, { "id": 1119, "name": "遂川县", "parentId": 120, "level": 3 }, { "id": 1120, "name": "万安县", "parentId": 120, "level": 3 }, { "id": 1121, "name": "安福县", "parentId": 120, "level": 3 }, { "id": 1122, "name": "永新县", "parentId": 120, "level": 3 }, { "id": 1123, "name": "井冈山市", "parentId": 120, "level": 3 }, { "id": 1124, "name": "章贡区", "parentId": 121, "level": 3 }, { "id": 1125, "name": "赣县", "parentId": 121, "level": 3 }, { "id": 1126, "name": "信丰县", "parentId": 121, "level": 3 }, { "id": 1127, "name": "大余县", "parentId": 121, "level": 3 }, { "id": 1128, "name": "上犹县", "parentId": 121, "level": 3 }, { "id": 1129, "name": "崇义县", "parentId": 121, "level": 3 }, { "id": 1130, "name": "安远县", "parentId": 121, "level": 3 }, { "id": 1131, "name": "龙南县", "parentId": 121, "level": 3 }, { "id": 1132, "name": "定南县", "parentId": 121, "level": 3 }, { "id": 1133, "name": "全南县", "parentId": 121, "level": 3 }, { "id": 1134, "name": "宁都县", "parentId": 121, "level": 3 }, { "id": 1135, "name": "于都县", "parentId": 121, "level": 3 }, { "id": 1136, "name": "兴国县", "parentId": 121, "level": 3 }, { "id": 1137, "name": "会昌县", "parentId": 121, "level": 3 }, { "id": 1138, "name": "寻乌县", "parentId": 121, "level": 3 }, { "id": 1139, "name": "石城县", "parentId": 121, "level": 3 }, { "id": 1140, "name": "瑞金市", "parentId": 121, "level": 3 }, { "id": 1141, "name": "南康市", "parentId": 121, "level": 3 }, { "id": 1142, "name": "昌江区", "parentId": 122, "level": 3 }, { "id": 1143, "name": "珠山区", "parentId": 122, "level": 3 }, { "id": 1144, "name": "浮梁县", "parentId": 122, "level": 3 }, { "id": 1145, "name": "乐平市", "parentId": 122, "level": 3 }, { "id": 1146, "name": "安源区", "parentId": 123, "level": 3 }, { "id": 1147, "name": "湘东区", "parentId": 123, "level": 3 }, { "id": 1148, "name": "莲花县", "parentId": 123, "level": 3 }, { "id": 1149, "name": "上栗县", "parentId": 123, "level": 3 }, { "id": 1150, "name": "芦溪县", "parentId": 123, "level": 3 }, { "id": 1151, "name": "牡丹区", "parentId": 124, "level": 3 }, { "id": 1152, "name": "曹县", "parentId": 124, "level": 3 }, { "id": 1153, "name": "单县", "parentId": 124, "level": 3 }, { "id": 1154, "name": "成武县", "parentId": 124, "level": 3 }, { "id": 1155, "name": "巨野县", "parentId": 124, "level": 3 }, { "id": 1156, "name": "郓城县", "parentId": 124, "level": 3 }, { "id": 1157, "name": "鄄城县", "parentId": 124, "level": 3 }, { "id": 1158, "name": "定陶县", "parentId": 124, "level": 3 }, { "id": 1159, "name": "东明县", "parentId": 124, "level": 3 }, { "id": 1160, "name": "历下区", "parentId": 125, "level": 3 }, { "id": 1161, "name": "市中区", "parentId": 125, "level": 3 }, { "id": 1162, "name": "槐荫区", "parentId": 125, "level": 3 }, { "id": 1163, "name": "天桥区", "parentId": 125, "level": 3 }, { "id": 1164, "name": "历城区", "parentId": 125, "level": 3 }, { "id": 1165, "name": "长清区", "parentId": 125, "level": 3 }, { "id": 1166, "name": "平阴县", "parentId": 125, "level": 3 }, { "id": 1167, "name": "济阳县", "parentId": 125, "level": 3 }, { "id": 1168, "name": "商河县", "parentId": 125, "level": 3 }, { "id": 1169, "name": "章丘市", "parentId": 125, "level": 3 }, { "id": 1170, "name": "市南区", "parentId": 126, "level": 3 }, { "id": 1171, "name": "市北区", "parentId": 126, "level": 3 }, { "id": 1172, "name": "四方区", "parentId": 126, "level": 3 }, { "id": 1173, "name": "黄岛区", "parentId": 126, "level": 3 }, { "id": 1174, "name": "崂山区", "parentId": 126, "level": 3 }, { "id": 1175, "name": "李沧区", "parentId": 126, "level": 3 }, { "id": 1176, "name": "城阳区", "parentId": 126, "level": 3 }, { "id": 1177, "name": "胶州市", "parentId": 126, "level": 3 }, { "id": 1178, "name": "即墨市", "parentId": 126, "level": 3 }, { "id": 1179, "name": "平度市", "parentId": 126, "level": 3 }, { "id": 1180, "name": "胶南市", "parentId": 126, "level": 3 }, { "id": 1181, "name": "莱西市", "parentId": 126, "level": 3 }, { "id": 1182, "name": "淄川区", "parentId": 127, "level": 3 }, { "id": 1183, "name": "张店区", "parentId": 127, "level": 3 }, { "id": 1184, "name": "博山区", "parentId": 127, "level": 3 }, { "id": 1185, "name": "临淄区", "parentId": 127, "level": 3 }, { "id": 1186, "name": "周村区", "parentId": 127, "level": 3 }, { "id": 1187, "name": "桓台县", "parentId": 127, "level": 3 }, { "id": 1188, "name": "高青县", "parentId": 127, "level": 3 }, { "id": 1189, "name": "沂源县", "parentId": 127, "level": 3 }, { "id": 1190, "name": "德城区", "parentId": 128, "level": 3 }, { "id": 1191, "name": "陵县", "parentId": 128, "level": 3 }, { "id": 1192, "name": "宁津县", "parentId": 128, "level": 3 }, { "id": 1193, "name": "庆云县", "parentId": 128, "level": 3 }, { "id": 1194, "name": "临邑县", "parentId": 128, "level": 3 }, { "id": 1195, "name": "齐河县", "parentId": 128, "level": 3 }, { "id": 1196, "name": "平原县", "parentId": 128, "level": 3 }, { "id": 1197, "name": "夏津县", "parentId": 128, "level": 3 }, { "id": 1198, "name": "武城县", "parentId": 128, "level": 3 }, { "id": 1199, "name": "乐陵市", "parentId": 128, "level": 3 }, { "id": 1200, "name": "禹城市", "parentId": 128, "level": 3 }, { "id": 1201, "name": "芝罘区", "parentId": 129, "level": 3 }, { "id": 1202, "name": "福山区", "parentId": 129, "level": 3 }, { "id": 1203, "name": "牟平区", "parentId": 129, "level": 3 }, { "id": 1204, "name": "莱山区", "parentId": 129, "level": 3 }, { "id": 1205, "name": "长岛县", "parentId": 129, "level": 3 }, { "id": 1206, "name": "龙口市", "parentId": 129, "level": 3 }, { "id": 1207, "name": "莱阳市", "parentId": 129, "level": 3 }, { "id": 1208, "name": "莱州市", "parentId": 129, "level": 3 }, { "id": 1209, "name": "蓬莱市", "parentId": 129, "level": 3 }, { "id": 1210, "name": "招远市", "parentId": 129, "level": 3 }, { "id": 1211, "name": "栖霞市", "parentId": 129, "level": 3 }, { "id": 1212, "name": "海阳市", "parentId": 129, "level": 3 }, { "id": 1213, "name": "潍城区", "parentId": 130, "level": 3 }, { "id": 1214, "name": "寒亭区", "parentId": 130, "level": 3 }, { "id": 1215, "name": "坊子区", "parentId": 130, "level": 3 }, { "id": 1216, "name": "奎文区", "parentId": 130, "level": 3 }, { "id": 1217, "name": "临朐县", "parentId": 130, "level": 3 }, { "id": 1218, "name": "昌乐县", "parentId": 130, "level": 3 }, { "id": 1219, "name": "青州市", "parentId": 130, "level": 3 }, { "id": 1220, "name": "诸城市", "parentId": 130, "level": 3 }, { "id": 1221, "name": "寿光市", "parentId": 130, "level": 3 }, { "id": 1222, "name": "安丘市", "parentId": 130, "level": 3 }, { "id": 1223, "name": "高密市", "parentId": 130, "level": 3 }, { "id": 1224, "name": "昌邑市", "parentId": 130, "level": 3 }, { "id": 1225, "name": "市中区", "parentId": 131, "level": 3 }, { "id": 1226, "name": "任城区", "parentId": 131, "level": 3 }, { "id": 1227, "name": "微山县", "parentId": 131, "level": 3 }, { "id": 1228, "name": "鱼台县", "parentId": 131, "level": 3 }, { "id": 1229, "name": "金乡县", "parentId": 131, "level": 3 }, { "id": 1230, "name": "嘉祥县", "parentId": 131, "level": 3 }, { "id": 1231, "name": "汶上县", "parentId": 131, "level": 3 }, { "id": 1232, "name": "泗水县", "parentId": 131, "level": 3 }, { "id": 1233, "name": "梁山县", "parentId": 131, "level": 3 }, { "id": 1234, "name": "曲阜市", "parentId": 131, "level": 3 }, { "id": 1235, "name": "兖州市", "parentId": 131, "level": 3 }, { "id": 1236, "name": "邹城市", "parentId": 131, "level": 3 }, { "id": 1237, "name": "泰山区", "parentId": 132, "level": 3 }, { "id": 1238, "name": "岱岳区", "parentId": 132, "level": 3 }, { "id": 1239, "name": "宁阳县", "parentId": 132, "level": 3 }, { "id": 1240, "name": "东平县", "parentId": 132, "level": 3 }, { "id": 1241, "name": "新泰市", "parentId": 132, "level": 3 }, { "id": 1242, "name": "肥城市", "parentId": 132, "level": 3 }, { "id": 1243, "name": "兰山区", "parentId": 133, "level": 3 }, { "id": 1244, "name": "罗庄区", "parentId": 133, "level": 3 }, { "id": 1245, "name": "河东区", "parentId": 133, "level": 3 }, { "id": 1246, "name": "沂南县", "parentId": 133, "level": 3 }, { "id": 1247, "name": "郯城县", "parentId": 133, "level": 3 }, { "id": 1248, "name": "沂水县", "parentId": 133, "level": 3 }, { "id": 1249, "name": "苍山县", "parentId": 133, "level": 3 }, { "id": 1250, "name": "费县", "parentId": 133, "level": 3 }, { "id": 1251, "name": "平邑县", "parentId": 133, "level": 3 }, { "id": 1252, "name": "莒南县", "parentId": 133, "level": 3 }, { "id": 1253, "name": "蒙阴县", "parentId": 133, "level": 3 }, { "id": 1254, "name": "临沭县", "parentId": 133, "level": 3 }, { "id": 1255, "name": "滨城区", "parentId": 134, "level": 3 }, { "id": 1256, "name": "惠民县", "parentId": 134, "level": 3 }, { "id": 1257, "name": "阳信县", "parentId": 134, "level": 3 }, { "id": 1258, "name": "无棣县", "parentId": 134, "level": 3 }, { "id": 1259, "name": "沾化县", "parentId": 134, "level": 3 }, { "id": 1260, "name": "博兴县", "parentId": 134, "level": 3 }, { "id": 1261, "name": "邹平县", "parentId": 134, "level": 3 }, { "id": 1262, "name": "东营区", "parentId": 135, "level": 3 }, { "id": 1263, "name": "河口区", "parentId": 135, "level": 3 }, { "id": 1264, "name": "垦利县", "parentId": 135, "level": 3 }, { "id": 1265, "name": "利津县", "parentId": 135, "level": 3 }, { "id": 1266, "name": "广饶县", "parentId": 135, "level": 3 }, { "id": 1267, "name": "环翠区", "parentId": 136, "level": 3 }, { "id": 1268, "name": "文登市", "parentId": 136, "level": 3 }, { "id": 1269, "name": "荣成市", "parentId": 136, "level": 3 }, { "id": 1270, "name": "乳山市", "parentId": 136, "level": 3 }, { "id": 1271, "name": "市中区", "parentId": 137, "level": 3 }, { "id": 1272, "name": "薛城区", "parentId": 137, "level": 3 }, { "id": 1273, "name": "峄城区", "parentId": 137, "level": 3 }, { "id": 1274, "name": "台儿庄区", "parentId": 137, "level": 3 }, { "id": 1275, "name": "山亭区", "parentId": 137, "level": 3 }, { "id": 1276, "name": "滕州市", "parentId": 137, "level": 3 }, { "id": 1277, "name": "东港区", "parentId": 138, "level": 3 }, { "id": 1278, "name": "岚山区", "parentId": 138, "level": 3 }, { "id": 1279, "name": "五莲县", "parentId": 138, "level": 3 }, { "id": 1280, "name": "莒县", "parentId": 138, "level": 3 }, { "id": 1281, "name": "莱城区", "parentId": 139, "level": 3 }, { "id": 1282, "name": "钢城区", "parentId": 139, "level": 3 }, { "id": 1283, "name": "东昌府区", "parentId": 140, "level": 3 }, { "id": 1284, "name": "阳谷县", "parentId": 140, "level": 3 }, { "id": 1285, "name": "莘县", "parentId": 140, "level": 3 }, { "id": 1286, "name": "茌平县", "parentId": 140, "level": 3 }, { "id": 1287, "name": "东阿县", "parentId": 140, "level": 3 }, { "id": 1288, "name": "冠县", "parentId": 140, "level": 3 }, { "id": 1289, "name": "高唐县", "parentId": 140, "level": 3 }, { "id": 1290, "name": "临清市", "parentId": 140, "level": 3 }, { "id": 1291, "name": "梁园区", "parentId": 141, "level": 3 }, { "id": 1292, "name": "睢阳区", "parentId": 141, "level": 3 }, { "id": 1293, "name": "民权县", "parentId": 141, "level": 3 }, { "id": 1294, "name": "睢县", "parentId": 141, "level": 3 }, { "id": 1295, "name": "宁陵县", "parentId": 141, "level": 3 }, { "id": 1296, "name": "柘城县", "parentId": 141, "level": 3 }, { "id": 1297, "name": "虞城县", "parentId": 141, "level": 3 }, { "id": 1298, "name": "夏邑县", "parentId": 141, "level": 3 }, { "id": 1299, "name": "永城市", "parentId": 141, "level": 3 }, { "id": 1300, "name": "中原区", "parentId": 142, "level": 3 }, { "id": 1301, "name": "二七区", "parentId": 142, "level": 3 }, { "id": 1302, "name": "管城回族区", "parentId": 142, "level": 3 }, { "id": 1303, "name": "金水区", "parentId": 142, "level": 3 }, { "id": 1304, "name": "上街区", "parentId": 142, "level": 3 }, { "id": 1305, "name": "惠济区", "parentId": 142, "level": 3 }, { "id": 1306, "name": "中牟县", "parentId": 142, "level": 3 }, { "id": 1307, "name": "巩义市", "parentId": 142, "level": 3 }, { "id": 1308, "name": "荥阳市", "parentId": 142, "level": 3 }, { "id": 1309, "name": "新密市", "parentId": 142, "level": 3 }, { "id": 1310, "name": "新郑市", "parentId": 142, "level": 3 }, { "id": 1311, "name": "登封市", "parentId": 142, "level": 3 }, { "id": 1312, "name": "文峰区", "parentId": 143, "level": 3 }, { "id": 1313, "name": "北关区", "parentId": 143, "level": 3 }, { "id": 1314, "name": "殷都区", "parentId": 143, "level": 3 }, { "id": 1315, "name": "龙安区", "parentId": 143, "level": 3 }, { "id": 1316, "name": "安阳县", "parentId": 143, "level": 3 }, { "id": 1317, "name": "汤阴县", "parentId": 143, "level": 3 }, { "id": 1318, "name": "滑县", "parentId": 143, "level": 3 }, { "id": 1319, "name": "内黄县", "parentId": 143, "level": 3 }, { "id": 1320, "name": "林州市", "parentId": 143, "level": 3 }, { "id": 1321, "name": "红旗区", "parentId": 144, "level": 3 }, { "id": 1322, "name": "卫滨区", "parentId": 144, "level": 3 }, { "id": 1323, "name": "凤泉区", "parentId": 144, "level": 3 }, { "id": 1324, "name": "牧野区", "parentId": 144, "level": 3 }, { "id": 1325, "name": "新乡县", "parentId": 144, "level": 3 }, { "id": 1326, "name": "获嘉县", "parentId": 144, "level": 3 }, { "id": 1327, "name": "原阳县", "parentId": 144, "level": 3 }, { "id": 1328, "name": "延津县", "parentId": 144, "level": 3 }, { "id": 1329, "name": "封丘县", "parentId": 144, "level": 3 }, { "id": 1330, "name": "长垣县", "parentId": 144, "level": 3 }, { "id": 1331, "name": "卫辉市", "parentId": 144, "level": 3 }, { "id": 1332, "name": "辉县市", "parentId": 144, "level": 3 }, { "id": 1333, "name": "魏都区", "parentId": 145, "level": 3 }, { "id": 1334, "name": "许昌县", "parentId": 145, "level": 3 }, { "id": 1335, "name": "鄢陵县", "parentId": 145, "level": 3 }, { "id": 1336, "name": "襄城县", "parentId": 145, "level": 3 }, { "id": 1337, "name": "禹州市", "parentId": 145, "level": 3 }, { "id": 1338, "name": "长葛市", "parentId": 145, "level": 3 }, { "id": 1339, "name": "新华区", "parentId": 146, "level": 3 }, { "id": 1340, "name": "卫东区", "parentId": 146, "level": 3 }, { "id": 1341, "name": "石龙区", "parentId": 146, "level": 3 }, { "id": 1342, "name": "湛河区", "parentId": 146, "level": 3 }, { "id": 1343, "name": "宝丰县", "parentId": 146, "level": 3 }, { "id": 1344, "name": "叶县", "parentId": 146, "level": 3 }, { "id": 1345, "name": "鲁山县", "parentId": 146, "level": 3 }, { "id": 1346, "name": "郏县", "parentId": 146, "level": 3 }, { "id": 1347, "name": "舞钢市", "parentId": 146, "level": 3 }, { "id": 1348, "name": "汝州市", "parentId": 146, "level": 3 }, { "id": 1349, "name": "浉河区", "parentId": 147, "level": 3 }, { "id": 1350, "name": "平桥区", "parentId": 147, "level": 3 }, { "id": 1351, "name": "罗山县", "parentId": 147, "level": 3 }, { "id": 1352, "name": "光山县", "parentId": 147, "level": 3 }, { "id": 1353, "name": "新县", "parentId": 147, "level": 3 }, { "id": 1354, "name": "商城县", "parentId": 147, "level": 3 }, { "id": 1355, "name": "固始县", "parentId": 147, "level": 3 }, { "id": 1356, "name": "潢川县", "parentId": 147, "level": 3 }, { "id": 1357, "name": "淮滨县", "parentId": 147, "level": 3 }, { "id": 1358, "name": "息县", "parentId": 147, "level": 3 }, { "id": 1359, "name": "宛城区", "parentId": 148, "level": 3 }, { "id": 1360, "name": "卧龙区", "parentId": 148, "level": 3 }, { "id": 1361, "name": "南召县", "parentId": 148, "level": 3 }, { "id": 1362, "name": "方城县", "parentId": 148, "level": 3 }, { "id": 1363, "name": "西峡县", "parentId": 148, "level": 3 }, { "id": 1364, "name": "镇平县", "parentId": 148, "level": 3 }, { "id": 1365, "name": "内乡县", "parentId": 148, "level": 3 }, { "id": 1366, "name": "淅川县", "parentId": 148, "level": 3 }, { "id": 1367, "name": "社旗县", "parentId": 148, "level": 3 }, { "id": 1368, "name": "唐河县", "parentId": 148, "level": 3 }, { "id": 1369, "name": "新野县", "parentId": 148, "level": 3 }, { "id": 1370, "name": "桐柏县", "parentId": 148, "level": 3 }, { "id": 1371, "name": "邓州市", "parentId": 148, "level": 3 }, { "id": 1372, "name": "龙亭区", "parentId": 149, "level": 3 }, { "id": 1373, "name": "顺河回族区", "parentId": 149, "level": 3 }, { "id": 1374, "name": "鼓楼区", "parentId": 149, "level": 3 }, { "id": 1375, "name": "禹王台区", "parentId": 149, "level": 3 }, { "id": 1376, "name": "金明区", "parentId": 149, "level": 3 }, { "id": 1377, "name": "杞县", "parentId": 149, "level": 3 }, { "id": 1378, "name": "通许县", "parentId": 149, "level": 3 }, { "id": 1379, "name": "尉氏县", "parentId": 149, "level": 3 }, { "id": 1380, "name": "开封县", "parentId": 149, "level": 3 }, { "id": 1381, "name": "兰考县", "parentId": 149, "level": 3 }, { "id": 1382, "name": "老城区", "parentId": 150, "level": 3 }, { "id": 1383, "name": "西工区", "parentId": 150, "level": 3 }, { "id": 1384, "name": "瀍河回族区", "parentId": 150, "level": 3 }, { "id": 1385, "name": "涧西区", "parentId": 150, "level": 3 }, { "id": 1386, "name": "吉利区", "parentId": 150, "level": 3 }, { "id": 1387, "name": "洛龙区", "parentId": 150, "level": 3 }, { "id": 1388, "name": "孟津县", "parentId": 150, "level": 3 }, { "id": 1389, "name": "新安县", "parentId": 150, "level": 3 }, { "id": 1390, "name": "栾川县", "parentId": 150, "level": 3 }, { "id": 1391, "name": "嵩县", "parentId": 150, "level": 3 }, { "id": 1392, "name": "汝阳县", "parentId": 150, "level": 3 }, { "id": 1393, "name": "宜阳县", "parentId": 150, "level": 3 }, { "id": 1394, "name": "洛宁县", "parentId": 150, "level": 3 }, { "id": 1395, "name": "伊川县", "parentId": 150, "level": 3 }, { "id": 1396, "name": "偃师市", "parentId": 150, "level": 3 }, { "id": 1397, "name": "解放区", "parentId": 152, "level": 3 }, { "id": 1398, "name": "中站区", "parentId": 152, "level": 3 }, { "id": 1399, "name": "马村区", "parentId": 152, "level": 3 }, { "id": 1400, "name": "山阳区", "parentId": 152, "level": 3 }, { "id": 1401, "name": "修武县", "parentId": 152, "level": 3 }, { "id": 1402, "name": "博爱县", "parentId": 152, "level": 3 }, { "id": 1403, "name": "武陟县", "parentId": 152, "level": 3 }, { "id": 1404, "name": "温县", "parentId": 152, "level": 3 }, { "id": 1405, "name": "沁阳市", "parentId": 152, "level": 3 }, { "id": 1406, "name": "孟州市", "parentId": 152, "level": 3 }, { "id": 1407, "name": "鹤山区", "parentId": 153, "level": 3 }, { "id": 1408, "name": "山城区", "parentId": 153, "level": 3 }, { "id": 1409, "name": "淇滨区", "parentId": 153, "level": 3 }, { "id": 1410, "name": "浚县", "parentId": 153, "level": 3 }, { "id": 1411, "name": "淇县", "parentId": 153, "level": 3 }, { "id": 1412, "name": "华龙区", "parentId": 154, "level": 3 }, { "id": 1413, "name": "清丰县", "parentId": 154, "level": 3 }, { "id": 1414, "name": "南乐县", "parentId": 154, "level": 3 }, { "id": 1415, "name": "范县", "parentId": 154, "level": 3 }, { "id": 1416, "name": "台前县", "parentId": 154, "level": 3 }, { "id": 1417, "name": "濮阳县", "parentId": 154, "level": 3 }, { "id": 1418, "name": "川汇区", "parentId": 155, "level": 3 }, { "id": 1419, "name": "扶沟县", "parentId": 155, "level": 3 }, { "id": 1420, "name": "西华县", "parentId": 155, "level": 3 }, { "id": 1421, "name": "商水县", "parentId": 155, "level": 3 }, { "id": 1422, "name": "沈丘县", "parentId": 155, "level": 3 }, { "id": 1423, "name": "郸城县", "parentId": 155, "level": 3 }, { "id": 1424, "name": "淮阳县", "parentId": 155, "level": 3 }, { "id": 1425, "name": "太康县", "parentId": 155, "level": 3 }, { "id": 1426, "name": "鹿邑县", "parentId": 155, "level": 3 }, { "id": 1427, "name": "项城市", "parentId": 155, "level": 3 }, { "id": 1428, "name": "源汇区", "parentId": 156, "level": 3 }, { "id": 1429, "name": "郾城区", "parentId": 156, "level": 3 }, { "id": 1430, "name": "召陵区", "parentId": 156, "level": 3 }, { "id": 1431, "name": "舞阳县", "parentId": 156, "level": 3 }, { "id": 1432, "name": "临颍县", "parentId": 156, "level": 3 }, { "id": 1433, "name": "驿城区", "parentId": 157, "level": 3 }, { "id": 1434, "name": "西平县", "parentId": 157, "level": 3 }, { "id": 1435, "name": "上蔡县", "parentId": 157, "level": 3 }, { "id": 1436, "name": "平舆县", "parentId": 157, "level": 3 }, { "id": 1437, "name": "正阳县", "parentId": 157, "level": 3 }, { "id": 1438, "name": "确山县", "parentId": 157, "level": 3 }, { "id": 1439, "name": "泌阳县", "parentId": 157, "level": 3 }, { "id": 1440, "name": "汝南县", "parentId": 157, "level": 3 }, { "id": 1441, "name": "遂平县", "parentId": 157, "level": 3 }, { "id": 1442, "name": "新蔡县", "parentId": 157, "level": 3 }, { "id": 1443, "name": "湖滨区", "parentId": 158, "level": 3 }, { "id": 1444, "name": "渑池县", "parentId": 158, "level": 3 }, { "id": 1445, "name": "陕县", "parentId": 158, "level": 3 }, { "id": 1446, "name": "卢氏县", "parentId": 158, "level": 3 }, { "id": 1447, "name": "义马市", "parentId": 158, "level": 3 }, { "id": 1448, "name": "灵宝市", "parentId": 158, "level": 3 }, { "id": 1449, "name": "江岸区", "parentId": 159, "level": 3 }, { "id": 1450, "name": "江汉区", "parentId": 159, "level": 3 }, { "id": 1451, "name": "硚口区", "parentId": 159, "level": 3 }, { "id": 1452, "name": "汉阳区", "parentId": 159, "level": 3 }, { "id": 1453, "name": "武昌区", "parentId": 159, "level": 3 }, { "id": 1454, "name": "青山区", "parentId": 159, "level": 3 }, { "id": 1455, "name": "洪山区", "parentId": 159, "level": 3 }, { "id": 1456, "name": "东西湖区", "parentId": 159, "level": 3 }, { "id": 1457, "name": "汉南区", "parentId": 159, "level": 3 }, { "id": 1458, "name": "蔡甸区", "parentId": 159, "level": 3 }, { "id": 1459, "name": "江夏区", "parentId": 159, "level": 3 }, { "id": 1460, "name": "黄陂区", "parentId": 159, "level": 3 }, { "id": 1461, "name": "新洲区", "parentId": 159, "level": 3 }, { "id": 1462, "name": "襄城区", "parentId": 160, "level": 3 }, { "id": 1463, "name": "樊城区", "parentId": 160, "level": 3 }, { "id": 1464, "name": "襄阳区", "parentId": 160, "level": 3 }, { "id": 1465, "name": "南漳县", "parentId": 160, "level": 3 }, { "id": 1466, "name": "谷城县", "parentId": 160, "level": 3 }, { "id": 1467, "name": "保康县", "parentId": 160, "level": 3 }, { "id": 1468, "name": "老河口市", "parentId": 160, "level": 3 }, { "id": 1469, "name": "枣阳市", "parentId": 160, "level": 3 }, { "id": 1470, "name": "宜城市", "parentId": 160, "level": 3 }, { "id": 1471, "name": "梁子湖区", "parentId": 161, "level": 3 }, { "id": 1472, "name": "华容区", "parentId": 161, "level": 3 }, { "id": 1473, "name": "鄂城区", "parentId": 161, "level": 3 }, { "id": 1474, "name": "孝南区", "parentId": 162, "level": 3 }, { "id": 1475, "name": "孝昌县", "parentId": 162, "level": 3 }, { "id": 1476, "name": "大悟县", "parentId": 162, "level": 3 }, { "id": 1477, "name": "云梦县", "parentId": 162, "level": 3 }, { "id": 1478, "name": "应城市", "parentId": 162, "level": 3 }, { "id": 1479, "name": "安陆市", "parentId": 162, "level": 3 }, { "id": 1480, "name": "汉川市", "parentId": 162, "level": 3 }, { "id": 1481, "name": "黄州区", "parentId": 163, "level": 3 }, { "id": 1482, "name": "团风县", "parentId": 163, "level": 3 }, { "id": 1483, "name": "红安县", "parentId": 163, "level": 3 }, { "id": 1484, "name": "罗田县", "parentId": 163, "level": 3 }, { "id": 1485, "name": "英山县", "parentId": 163, "level": 3 }, { "id": 1486, "name": "浠水县", "parentId": 163, "level": 3 }, { "id": 1487, "name": "蕲春县", "parentId": 163, "level": 3 }, { "id": 1488, "name": "黄梅县", "parentId": 163, "level": 3 }, { "id": 1489, "name": "麻城市", "parentId": 163, "level": 3 }, { "id": 1490, "name": "武穴市", "parentId": 163, "level": 3 }, { "id": 1491, "name": "黄石港区", "parentId": 164, "level": 3 }, { "id": 1492, "name": "西塞山区", "parentId": 164, "level": 3 }, { "id": 1493, "name": "下陆区", "parentId": 164, "level": 3 }, { "id": 1494, "name": "铁山区", "parentId": 164, "level": 3 }, { "id": 1495, "name": "阳新县", "parentId": 164, "level": 3 }, { "id": 1496, "name": "大冶市", "parentId": 164, "level": 3 }, { "id": 1497, "name": "咸安区", "parentId": 165, "level": 3 }, { "id": 1498, "name": "嘉鱼县", "parentId": 165, "level": 3 }, { "id": 1499, "name": "通城县", "parentId": 165, "level": 3 }, { "id": 1500, "name": "崇阳县", "parentId": 165, "level": 3 }, { "id": 1501, "name": "通山县", "parentId": 165, "level": 3 }, { "id": 1502, "name": "赤壁市", "parentId": 165, "level": 3 }, { "id": 1503, "name": "沙市区", "parentId": 166, "level": 3 }, { "id": 1504, "name": "荆州区", "parentId": 166, "level": 3 }, { "id": 1505, "name": "公安县", "parentId": 166, "level": 3 }, { "id": 1506, "name": "监利县", "parentId": 166, "level": 3 }, { "id": 1507, "name": "江陵县", "parentId": 166, "level": 3 }, { "id": 1508, "name": "石首市", "parentId": 166, "level": 3 }, { "id": 1509, "name": "洪湖市", "parentId": 166, "level": 3 }, { "id": 1510, "name": "松滋市", "parentId": 166, "level": 3 }, { "id": 1511, "name": "西陵区", "parentId": 167, "level": 3 }, { "id": 1512, "name": "伍家岗区", "parentId": 167, "level": 3 }, { "id": 1513, "name": "点军区", "parentId": 167, "level": 3 }, { "id": 1514, "name": "猇亭区", "parentId": 167, "level": 3 }, { "id": 1515, "name": "夷陵区", "parentId": 167, "level": 3 }, { "id": 1516, "name": "远安县", "parentId": 167, "level": 3 }, { "id": 1517, "name": "兴山县", "parentId": 167, "level": 3 }, { "id": 1518, "name": "秭归县", "parentId": 167, "level": 3 }, { "id": 1519, "name": "长阳土家族自治县", "parentId": 167, "level": 3 }, { "id": 1520, "name": "五峰土家族自治县", "parentId": 167, "level": 3 }, { "id": 1521, "name": "宜都市", "parentId": 167, "level": 3 }, { "id": 1522, "name": "当阳市", "parentId": 167, "level": 3 }, { "id": 1523, "name": "枝江市", "parentId": 167, "level": 3 }, { "id": 1524, "name": "恩施市", "parentId": 168, "level": 3 }, { "id": 1525, "name": "利川市", "parentId": 168, "level": 3 }, { "id": 1526, "name": "建始县", "parentId": 168, "level": 3 }, { "id": 1527, "name": "巴东县", "parentId": 168, "level": 3 }, { "id": 1528, "name": "宣恩县", "parentId": 168, "level": 3 }, { "id": 1529, "name": "咸丰县", "parentId": 168, "level": 3 }, { "id": 1530, "name": "来凤县", "parentId": 168, "level": 3 }, { "id": 1531, "name": "鹤峰县", "parentId": 168, "level": 3 }, { "id": 1532, "name": "茅箭区", "parentId": 170, "level": 3 }, { "id": 1533, "name": "张湾区", "parentId": 170, "level": 3 }, { "id": 1534, "name": "郧县", "parentId": 170, "level": 3 }, { "id": 1535, "name": "郧西县", "parentId": 170, "level": 3 }, { "id": 1536, "name": "竹山县", "parentId": 170, "level": 3 }, { "id": 1537, "name": "竹溪县", "parentId": 170, "level": 3 }, { "id": 1538, "name": "房县", "parentId": 170, "level": 3 }, { "id": 1539, "name": "丹江口市", "parentId": 170, "level": 3 }, { "id": 1540, "name": "曾都区", "parentId": 171, "level": 3 }, { "id": 1541, "name": "广水市", "parentId": 171, "level": 3 }, { "id": 1542, "name": "东宝区", "parentId": 172, "level": 3 }, { "id": 1543, "name": "掇刀区", "parentId": 172, "level": 3 }, { "id": 1544, "name": "京山县", "parentId": 172, "level": 3 }, { "id": 1545, "name": "沙洋县", "parentId": 172, "level": 3 }, { "id": 1546, "name": "钟祥市", "parentId": 172, "level": 3 }, { "id": 1547, "name": "岳阳楼区", "parentId": 176, "level": 3 }, { "id": 1548, "name": "云溪区", "parentId": 176, "level": 3 }, { "id": 1549, "name": "君山区", "parentId": 176, "level": 3 }, { "id": 1550, "name": "岳阳县", "parentId": 176, "level": 3 }, { "id": 1551, "name": "华容县", "parentId": 176, "level": 3 }, { "id": 1552, "name": "湘阴县", "parentId": 176, "level": 3 }, { "id": 1553, "name": "平江县", "parentId": 176, "level": 3 }, { "id": 1554, "name": "汨罗市", "parentId": 176, "level": 3 }, { "id": 1555, "name": "临湘市", "parentId": 176, "level": 3 }, { "id": 1556, "name": "芙蓉区", "parentId": 177, "level": 3 }, { "id": 1557, "name": "天心区", "parentId": 177, "level": 3 }, { "id": 1558, "name": "岳麓区", "parentId": 177, "level": 3 }, { "id": 1559, "name": "开福区", "parentId": 177, "level": 3 }, { "id": 1560, "name": "雨花区", "parentId": 177, "level": 3 }, { "id": 1561, "name": "长沙县", "parentId": 177, "level": 3 }, { "id": 1562, "name": "望城县", "parentId": 177, "level": 3 }, { "id": 1563, "name": "宁乡县", "parentId": 177, "level": 3 }, { "id": 1564, "name": "浏阳市", "parentId": 177, "level": 3 }, { "id": 1565, "name": "雨湖区", "parentId": 178, "level": 3 }, { "id": 1566, "name": "岳塘区", "parentId": 178, "level": 3 }, { "id": 1567, "name": "湘潭县", "parentId": 178, "level": 3 }, { "id": 1568, "name": "湘乡市", "parentId": 178, "level": 3 }, { "id": 1569, "name": "韶山市", "parentId": 178, "level": 3 }, { "id": 1570, "name": "荷塘区", "parentId": 179, "level": 3 }, { "id": 1571, "name": "芦淞区", "parentId": 179, "level": 3 }, { "id": 1572, "name": "石峰区", "parentId": 179, "level": 3 }, { "id": 1573, "name": "天元区", "parentId": 179, "level": 3 }, { "id": 1574, "name": "株洲县", "parentId": 179, "level": 3 }, { "id": 1575, "name": "攸县", "parentId": 179, "level": 3 }, { "id": 1576, "name": "茶陵县", "parentId": 179, "level": 3 }, { "id": 1577, "name": "炎陵县", "parentId": 179, "level": 3 }, { "id": 1578, "name": "醴陵市", "parentId": 179, "level": 3 }, { "id": 1579, "name": "珠晖区", "parentId": 180, "level": 3 }, { "id": 1580, "name": "雁峰区", "parentId": 180, "level": 3 }, { "id": 1581, "name": "石鼓区", "parentId": 180, "level": 3 }, { "id": 1582, "name": "蒸湘区", "parentId": 180, "level": 3 }, { "id": 1583, "name": "南岳区", "parentId": 180, "level": 3 }, { "id": 1584, "name": "衡阳县", "parentId": 180, "level": 3 }, { "id": 1585, "name": "衡南县", "parentId": 180, "level": 3 }, { "id": 1586, "name": "衡山县", "parentId": 180, "level": 3 }, { "id": 1587, "name": "衡东县", "parentId": 180, "level": 3 }, { "id": 1588, "name": "祁东县", "parentId": 180, "level": 3 }, { "id": 1589, "name": "耒阳市", "parentId": 180, "level": 3 }, { "id": 1590, "name": "常宁市", "parentId": 180, "level": 3 }, { "id": 1591, "name": "北湖区", "parentId": 181, "level": 3 }, { "id": 1592, "name": "苏仙区", "parentId": 181, "level": 3 }, { "id": 1593, "name": "桂阳县", "parentId": 181, "level": 3 }, { "id": 1594, "name": "宜章县", "parentId": 181, "level": 3 }, { "id": 1595, "name": "永兴县", "parentId": 181, "level": 3 }, { "id": 1596, "name": "嘉禾县", "parentId": 181, "level": 3 }, { "id": 1597, "name": "临武县", "parentId": 181, "level": 3 }, { "id": 1598, "name": "汝城县", "parentId": 181, "level": 3 }, { "id": 1599, "name": "桂东县", "parentId": 181, "level": 3 }, { "id": 1600, "name": "安仁县", "parentId": 181, "level": 3 }, { "id": 1601, "name": "资兴市", "parentId": 181, "level": 3 }, { "id": 1602, "name": "武陵区", "parentId": 182, "level": 3 }, { "id": 1603, "name": "鼎城区", "parentId": 182, "level": 3 }, { "id": 1604, "name": "安乡县", "parentId": 182, "level": 3 }, { "id": 1605, "name": "汉寿县", "parentId": 182, "level": 3 }, { "id": 1606, "name": "澧县", "parentId": 182, "level": 3 }, { "id": 1607, "name": "临澧县", "parentId": 182, "level": 3 }, { "id": 1608, "name": "桃源县", "parentId": 182, "level": 3 }, { "id": 1609, "name": "石门县", "parentId": 182, "level": 3 }, { "id": 1610, "name": "津市市", "parentId": 182, "level": 3 }, { "id": 1611, "name": "资阳区", "parentId": 183, "level": 3 }, { "id": 1612, "name": "赫山区", "parentId": 183, "level": 3 }, { "id": 1613, "name": "南县", "parentId": 183, "level": 3 }, { "id": 1614, "name": "桃江县", "parentId": 183, "level": 3 }, { "id": 1615, "name": "安化县", "parentId": 183, "level": 3 }, { "id": 1616, "name": "沅江市", "parentId": 183, "level": 3 }, { "id": 1617, "name": "娄星区", "parentId": 184, "level": 3 }, { "id": 1618, "name": "双峰县", "parentId": 184, "level": 3 }, { "id": 1619, "name": "新化县", "parentId": 184, "level": 3 }, { "id": 1620, "name": "冷水江市", "parentId": 184, "level": 3 }, { "id": 1621, "name": "涟源市", "parentId": 184, "level": 3 }, { "id": 1622, "name": "双清区", "parentId": 185, "level": 3 }, { "id": 1623, "name": "大祥区", "parentId": 185, "level": 3 }, { "id": 1624, "name": "北塔区", "parentId": 185, "level": 3 }, { "id": 1625, "name": "邵东县", "parentId": 185, "level": 3 }, { "id": 1626, "name": "新邵县", "parentId": 185, "level": 3 }, { "id": 1627, "name": "邵阳县", "parentId": 185, "level": 3 }, { "id": 1628, "name": "隆回县", "parentId": 185, "level": 3 }, { "id": 1629, "name": "洞口县", "parentId": 185, "level": 3 }, { "id": 1630, "name": "绥宁县", "parentId": 185, "level": 3 }, { "id": 1631, "name": "新宁县", "parentId": 185, "level": 3 }, { "id": 1632, "name": "城步苗族自治县", "parentId": 185, "level": 3 }, { "id": 1633, "name": "武冈市", "parentId": 185, "level": 3 }, { "id": 1634, "name": "吉首市", "parentId": 186, "level": 3 }, { "id": 1635, "name": "泸溪县", "parentId": 186, "level": 3 }, { "id": 1636, "name": "凤凰县", "parentId": 186, "level": 3 }, { "id": 1637, "name": "花垣县", "parentId": 186, "level": 3 }, { "id": 1638, "name": "保靖县", "parentId": 186, "level": 3 }, { "id": 1639, "name": "古丈县", "parentId": 186, "level": 3 }, { "id": 1640, "name": "永顺县", "parentId": 186, "level": 3 }, { "id": 1641, "name": "龙山县", "parentId": 186, "level": 3 }, { "id": 1642, "name": "永定区", "parentId": 187, "level": 3 }, { "id": 1643, "name": "武陵源区", "parentId": 187, "level": 3 }, { "id": 1644, "name": "慈利县", "parentId": 187, "level": 3 }, { "id": 1645, "name": "桑植县", "parentId": 187, "level": 3 }, { "id": 1646, "name": "鹤城区", "parentId": 188, "level": 3 }, { "id": 1647, "name": "中方县", "parentId": 188, "level": 3 }, { "id": 1648, "name": "沅陵县", "parentId": 188, "level": 3 }, { "id": 1649, "name": "辰溪县", "parentId": 188, "level": 3 }, { "id": 1650, "name": "溆浦县", "parentId": 188, "level": 3 }, { "id": 1651, "name": "会同县", "parentId": 188, "level": 3 }, { "id": 1652, "name": "麻阳苗族自治县", "parentId": 188, "level": 3 }, { "id": 1653, "name": "新晃侗族自治县", "parentId": 188, "level": 3 }, { "id": 1654, "name": "芷江侗族自治县", "parentId": 188, "level": 3 }, { "id": 1655, "name": "靖州苗族侗族自治县", "parentId": 188, "level": 3 }, { "id": 1656, "name": "通道侗族自治县", "parentId": 188, "level": 3 }, { "id": 1657, "name": "洪江市", "parentId": 188, "level": 3 }, { "id": 1658, "name": "零陵区", "parentId": 189, "level": 3 }, { "id": 1659, "name": "冷水滩区", "parentId": 189, "level": 3 }, { "id": 1660, "name": "祁阳县", "parentId": 189, "level": 3 }, { "id": 1661, "name": "东安县", "parentId": 189, "level": 3 }, { "id": 1662, "name": "双牌县", "parentId": 189, "level": 3 }, { "id": 1663, "name": "道县", "parentId": 189, "level": 3 }, { "id": 1664, "name": "江永县", "parentId": 189, "level": 3 }, { "id": 1665, "name": "宁远县", "parentId": 189, "level": 3 }, { "id": 1666, "name": "蓝山县", "parentId": 189, "level": 3 }, { "id": 1667, "name": "新田县", "parentId": 189, "level": 3 }, { "id": 1668, "name": "江华瑶族自治县", "parentId": 189, "level": 3 }, { "id": 1669, "name": "从化市", "parentId": 190, "level": 3 }, { "id": 1670, "name": "荔湾区", "parentId": 190, "level": 3 }, { "id": 1671, "name": "越秀区", "parentId": 190, "level": 3 }, { "id": 1672, "name": "海珠区", "parentId": 190, "level": 3 }, { "id": 1673, "name": "天河区", "parentId": 190, "level": 3 }, { "id": 1674, "name": "白云区", "parentId": 190, "level": 3 }, { "id": 1675, "name": "花都区", "parentId": 190, "level": 3 }, { "id": 1676, "name": "黄埔区", "parentId": 190, "level": 3 }, { "id": 1677, "name": "萝岗区", "parentId": 190, "level": 3 }, { "id": 1678, "name": "南沙区", "parentId": 190, "level": 3 }, { "id": 1679, "name": "番禺区", "parentId": 190, "level": 3 }, { "id": 1680, "name": "增城市", "parentId": 190, "level": 3 }, { "id": 1681, "name": "海丰县", "parentId": 191, "level": 3 }, { "id": 1682, "name": "陆河县", "parentId": 191, "level": 3 }, { "id": 1683, "name": "陆丰市", "parentId": 191, "level": 3 }, { "id": 1684, "name": "江城区", "parentId": 192, "level": 3 }, { "id": 1685, "name": "阳西县", "parentId": 192, "level": 3 }, { "id": 1686, "name": "阳东县", "parentId": 192, "level": 3 }, { "id": 1687, "name": "阳春市", "parentId": 192, "level": 3 }, { "id": 1688, "name": "榕城区", "parentId": 193, "level": 3 }, { "id": 1689, "name": "揭东县", "parentId": 193, "level": 3 }, { "id": 1690, "name": "揭西县", "parentId": 193, "level": 3 }, { "id": 1691, "name": "惠来县", "parentId": 193, "level": 3 }, { "id": 1692, "name": "普宁市", "parentId": 193, "level": 3 }, { "id": 1693, "name": "茂南区", "parentId": 194, "level": 3 }, { "id": 1694, "name": "茂港区", "parentId": 194, "level": 3 }, { "id": 1695, "name": "电白县", "parentId": 194, "level": 3 }, { "id": 1696, "name": "高州市", "parentId": 194, "level": 3 }, { "id": 1697, "name": "化州市", "parentId": 194, "level": 3 }, { "id": 1698, "name": "信宜市", "parentId": 194, "level": 3 }, { "id": 1699, "name": "惠城区", "parentId": 195, "level": 3 }, { "id": 1700, "name": "惠阳区", "parentId": 195, "level": 3 }, { "id": 1701, "name": "博罗县", "parentId": 195, "level": 3 }, { "id": 1702, "name": "惠东县", "parentId": 195, "level": 3 }, { "id": 1703, "name": "龙门县", "parentId": 195, "level": 3 }, { "id": 1704, "name": "蓬江区", "parentId": 196, "level": 3 }, { "id": 1705, "name": "江海区", "parentId": 196, "level": 3 }, { "id": 1706, "name": "新会区", "parentId": 196, "level": 3 }, { "id": 1707, "name": "台山市", "parentId": 196, "level": 3 }, { "id": 1708, "name": "开平市", "parentId": 196, "level": 3 }, { "id": 1709, "name": "鹤山市", "parentId": 196, "level": 3 }, { "id": 1710, "name": "恩平市", "parentId": 196, "level": 3 }, { "id": 1711, "name": "武江区", "parentId": 197, "level": 3 }, { "id": 1712, "name": "浈江区", "parentId": 197, "level": 3 }, { "id": 1713, "name": "曲江区", "parentId": 197, "level": 3 }, { "id": 1714, "name": "始兴县", "parentId": 197, "level": 3 }, { "id": 1715, "name": "仁化县", "parentId": 197, "level": 3 }, { "id": 1716, "name": "翁源县", "parentId": 197, "level": 3 }, { "id": 1717, "name": "乳源瑶族自治县", "parentId": 197, "level": 3 }, { "id": 1718, "name": "新丰县", "parentId": 197, "level": 3 }, { "id": 1719, "name": "乐昌市", "parentId": 197, "level": 3 }, { "id": 1720, "name": "南雄市", "parentId": 197, "level": 3 }, { "id": 1721, "name": "梅江区", "parentId": 198, "level": 3 }, { "id": 1722, "name": "梅县", "parentId": 198, "level": 3 }, { "id": 1723, "name": "大埔县", "parentId": 198, "level": 3 }, { "id": 1724, "name": "丰顺县", "parentId": 198, "level": 3 }, { "id": 1725, "name": "五华县", "parentId": 198, "level": 3 }, { "id": 1726, "name": "平远县", "parentId": 198, "level": 3 }, { "id": 1727, "name": "蕉岭县", "parentId": 198, "level": 3 }, { "id": 1728, "name": "兴宁市", "parentId": 198, "level": 3 }, { "id": 1729, "name": "龙湖区", "parentId": 199, "level": 3 }, { "id": 1730, "name": "金平区", "parentId": 199, "level": 3 }, { "id": 1731, "name": "濠江区", "parentId": 199, "level": 3 }, { "id": 1732, "name": "潮阳区", "parentId": 199, "level": 3 }, { "id": 1733, "name": "潮南区", "parentId": 199, "level": 3 }, { "id": 1734, "name": "澄海区", "parentId": 199, "level": 3 }, { "id": 1735, "name": "南澳县", "parentId": 199, "level": 3 }, { "id": 1736, "name": "罗湖区", "parentId": 200, "level": 3 }, { "id": 1737, "name": "福田区", "parentId": 200, "level": 3 }, { "id": 1738, "name": "南山区", "parentId": 200, "level": 3 }, { "id": 1739, "name": "宝安区", "parentId": 200, "level": 3 }, { "id": 1740, "name": "龙岗区", "parentId": 200, "level": 3 }, { "id": 1741, "name": "盐田区", "parentId": 200, "level": 3 }, { "id": 1742, "name": "香洲区", "parentId": 201, "level": 3 }, { "id": 1743, "name": "斗门区", "parentId": 201, "level": 3 }, { "id": 1744, "name": "金湾区", "parentId": 201, "level": 3 }, { "id": 1745, "name": "禅城区", "parentId": 202, "level": 3 }, { "id": 1746, "name": "南海区", "parentId": 202, "level": 3 }, { "id": 1747, "name": "顺德区", "parentId": 202, "level": 3 }, { "id": 1748, "name": "三水区", "parentId": 202, "level": 3 }, { "id": 1749, "name": "高明区", "parentId": 202, "level": 3 }, { "id": 1750, "name": "端州区", "parentId": 203, "level": 3 }, { "id": 1751, "name": "鼎湖区", "parentId": 203, "level": 3 }, { "id": 1752, "name": "广宁县", "parentId": 203, "level": 3 }, { "id": 1753, "name": "怀集县", "parentId": 203, "level": 3 }, { "id": 1754, "name": "封开县", "parentId": 203, "level": 3 }, { "id": 1755, "name": "德庆县", "parentId": 203, "level": 3 }, { "id": 1756, "name": "高要市", "parentId": 203, "level": 3 }, { "id": 1757, "name": "四会市", "parentId": 203, "level": 3 }, { "id": 1758, "name": "赤坎区", "parentId": 204, "level": 3 }, { "id": 1759, "name": "霞山区", "parentId": 204, "level": 3 }, { "id": 1760, "name": "坡头区", "parentId": 204, "level": 3 }, { "id": 1761, "name": "麻章区", "parentId": 204, "level": 3 }, { "id": 1762, "name": "遂溪县", "parentId": 204, "level": 3 }, { "id": 1763, "name": "徐闻县", "parentId": 204, "level": 3 }, { "id": 1764, "name": "廉江市", "parentId": 204, "level": 3 }, { "id": 1765, "name": "雷州市", "parentId": 204, "level": 3 }, { "id": 1766, "name": "吴川市", "parentId": 204, "level": 3 }, { "id": 1767, "name": "源城区", "parentId": 206, "level": 3 }, { "id": 1768, "name": "紫金县", "parentId": 206, "level": 3 }, { "id": 1769, "name": "龙川县", "parentId": 206, "level": 3 }, { "id": 1770, "name": "连平县", "parentId": 206, "level": 3 }, { "id": 1771, "name": "和平县", "parentId": 206, "level": 3 }, { "id": 1772, "name": "东源县", "parentId": 206, "level": 3 }, { "id": 1773, "name": "清城区", "parentId": 207, "level": 3 }, { "id": 1774, "name": "佛冈县", "parentId": 207, "level": 3 }, { "id": 1775, "name": "阳山县", "parentId": 207, "level": 3 }, { "id": 1776, "name": "连山壮族瑶族自治县", "parentId": 207, "level": 3 }, { "id": 1777, "name": "连南瑶族自治县", "parentId": 207, "level": 3 }, { "id": 1778, "name": "清新县", "parentId": 207, "level": 3 }, { "id": 1779, "name": "英德市", "parentId": 207, "level": 3 }, { "id": 1780, "name": "连州市", "parentId": 207, "level": 3 }, { "id": 1781, "name": "云城区", "parentId": 208, "level": 3 }, { "id": 1782, "name": "新兴县", "parentId": 208, "level": 3 }, { "id": 1783, "name": "郁南县", "parentId": 208, "level": 3 }, { "id": 1784, "name": "云安县", "parentId": 208, "level": 3 }, { "id": 1785, "name": "罗定市", "parentId": 208, "level": 3 }, { "id": 1786, "name": "湘桥区", "parentId": 209, "level": 3 }, { "id": 1787, "name": "潮安县", "parentId": 209, "level": 3 }, { "id": 1788, "name": "饶平县", "parentId": 209, "level": 3 }, { "id": 1789, "name": "城关区", "parentId": 211, "level": 3 }, { "id": 1790, "name": "七里河区", "parentId": 211, "level": 3 }, { "id": 1791, "name": "西固区", "parentId": 211, "level": 3 }, { "id": 1792, "name": "安宁区", "parentId": 211, "level": 3 }, { "id": 1793, "name": "红古区", "parentId": 211, "level": 3 }, { "id": 1794, "name": "永登县", "parentId": 211, "level": 3 }, { "id": 1795, "name": "皋兰县", "parentId": 211, "level": 3 }, { "id": 1796, "name": "榆中县", "parentId": 211, "level": 3 }, { "id": 1797, "name": "金川区", "parentId": 212, "level": 3 }, { "id": 1798, "name": "永昌县", "parentId": 212, "level": 3 }, { "id": 1799, "name": "白银区", "parentId": 213, "level": 3 }, { "id": 1800, "name": "平川区", "parentId": 213, "level": 3 }, { "id": 1801, "name": "靖远县", "parentId": 213, "level": 3 }, { "id": 1802, "name": "会宁县", "parentId": 213, "level": 3 }, { "id": 1803, "name": "景泰县", "parentId": 213, "level": 3 }, { "id": 1804, "name": "秦州区", "parentId": 214, "level": 3 }, { "id": 1805, "name": "麦积区", "parentId": 214, "level": 3 }, { "id": 1806, "name": "清水县", "parentId": 214, "level": 3 }, { "id": 1807, "name": "秦安县", "parentId": 214, "level": 3 }, { "id": 1808, "name": "甘谷县", "parentId": 214, "level": 3 }, { "id": 1809, "name": "武山县", "parentId": 214, "level": 3 }, { "id": 1810, "name": "张家川回族自治县", "parentId": 214, "level": 3 }, { "id": 1811, "name": "凉州区", "parentId": 216, "level": 3 }, { "id": 1812, "name": "民勤县", "parentId": 216, "level": 3 }, { "id": 1813, "name": "古浪县", "parentId": 216, "level": 3 }, { "id": 1814, "name": "天祝藏族自治县", "parentId": 216, "level": 3 }, { "id": 1815, "name": "甘州区", "parentId": 217, "level": 3 }, { "id": 1816, "name": "肃南裕固族自治县", "parentId": 217, "level": 3 }, { "id": 1817, "name": "民乐县", "parentId": 217, "level": 3 }, { "id": 1818, "name": "临泽县", "parentId": 217, "level": 3 }, { "id": 1819, "name": "高台县", "parentId": 217, "level": 3 }, { "id": 1820, "name": "山丹县", "parentId": 217, "level": 3 }, { "id": 1821, "name": "崆峒区", "parentId": 218, "level": 3 }, { "id": 1822, "name": "泾川县", "parentId": 218, "level": 3 }, { "id": 1823, "name": "灵台县", "parentId": 218, "level": 3 }, { "id": 1824, "name": "崇信县", "parentId": 218, "level": 3 }, { "id": 1825, "name": "华亭县", "parentId": 218, "level": 3 }, { "id": 1826, "name": "庄浪县", "parentId": 218, "level": 3 }, { "id": 1827, "name": "静宁县", "parentId": 218, "level": 3 }, { "id": 1828, "name": "肃州区", "parentId": 219, "level": 3 }, { "id": 1829, "name": "金塔县", "parentId": 219, "level": 3 }, { "id": 1830, "name": "瓜州县", "parentId": 219, "level": 3 }, { "id": 1831, "name": "肃北蒙古族自治县", "parentId": 219, "level": 3 }, { "id": 1832, "name": "阿克塞哈萨克族自治县", "parentId": 219, "level": 3 }, { "id": 1833, "name": "玉门市", "parentId": 219, "level": 3 }, { "id": 1834, "name": "敦煌市", "parentId": 219, "level": 3 }, { "id": 1835, "name": "西峰区", "parentId": 220, "level": 3 }, { "id": 1836, "name": "庆城县", "parentId": 220, "level": 3 }, { "id": 1837, "name": "环县", "parentId": 220, "level": 3 }, { "id": 1838, "name": "华池县", "parentId": 220, "level": 3 }, { "id": 1839, "name": "合水县", "parentId": 220, "level": 3 }, { "id": 1840, "name": "正宁县", "parentId": 220, "level": 3 }, { "id": 1841, "name": "宁县", "parentId": 220, "level": 3 }, { "id": 1842, "name": "镇原县", "parentId": 220, "level": 3 }, { "id": 1843, "name": "安定区", "parentId": 221, "level": 3 }, { "id": 1844, "name": "通渭县", "parentId": 221, "level": 3 }, { "id": 1845, "name": "陇西县", "parentId": 221, "level": 3 }, { "id": 1846, "name": "渭源县", "parentId": 221, "level": 3 }, { "id": 1847, "name": "临洮县", "parentId": 221, "level": 3 }, { "id": 1848, "name": "漳县", "parentId": 221, "level": 3 }, { "id": 1849, "name": "岷县", "parentId": 221, "level": 3 }, { "id": 1850, "name": "武都区", "parentId": 222, "level": 3 }, { "id": 1851, "name": "成县", "parentId": 222, "level": 3 }, { "id": 1852, "name": "文县", "parentId": 222, "level": 3 }, { "id": 1853, "name": "宕昌县", "parentId": 222, "level": 3 }, { "id": 1854, "name": "康县", "parentId": 222, "level": 3 }, { "id": 1855, "name": "西和县", "parentId": 222, "level": 3 }, { "id": 1856, "name": "礼县", "parentId": 222, "level": 3 }, { "id": 1857, "name": "徽县", "parentId": 222, "level": 3 }, { "id": 1858, "name": "两当县", "parentId": 222, "level": 3 }, { "id": 1859, "name": "临夏市", "parentId": 223, "level": 3 }, { "id": 1860, "name": "临夏县", "parentId": 223, "level": 3 }, { "id": 1861, "name": "康乐县", "parentId": 223, "level": 3 }, { "id": 1862, "name": "永靖县", "parentId": 223, "level": 3 }, { "id": 1863, "name": "广河县", "parentId": 223, "level": 3 }, { "id": 1864, "name": "和政县", "parentId": 223, "level": 3 }, { "id": 1865, "name": "东乡族自治县", "parentId": 223, "level": 3 }, { "id": 1866, "name": "积石山保安族东乡族撒拉族自治县", "parentId": 223, "level": 3 }, { "id": 1867, "name": "合作市", "parentId": 224, "level": 3 }, { "id": 1868, "name": "临潭县", "parentId": 224, "level": 3 }, { "id": 1869, "name": "卓尼县", "parentId": 224, "level": 3 }, { "id": 1870, "name": "舟曲县", "parentId": 224, "level": 3 }, { "id": 1871, "name": "迭部县", "parentId": 224, "level": 3 }, { "id": 1872, "name": "玛曲县", "parentId": 224, "level": 3 }, { "id": 1873, "name": "碌曲县", "parentId": 224, "level": 3 }, { "id": 1874, "name": "夏河县", "parentId": 224, "level": 3 }, { "id": 1875, "name": "锦江区", "parentId": 225, "level": 3 }, { "id": 1876, "name": "青羊区", "parentId": 225, "level": 3 }, { "id": 1877, "name": "金牛区", "parentId": 225, "level": 3 }, { "id": 1878, "name": "武侯区", "parentId": 225, "level": 3 }, { "id": 1879, "name": "成华区", "parentId": 225, "level": 3 }, { "id": 1880, "name": "龙泉驿区", "parentId": 225, "level": 3 }, { "id": 1881, "name": "青白江区", "parentId": 225, "level": 3 }, { "id": 1882, "name": "新都区", "parentId": 225, "level": 3 }, { "id": 1883, "name": "温江区", "parentId": 225, "level": 3 }, { "id": 1884, "name": "金堂县", "parentId": 225, "level": 3 }, { "id": 1885, "name": "双流县", "parentId": 225, "level": 3 }, { "id": 1886, "name": "郫县", "parentId": 225, "level": 3 }, { "id": 1887, "name": "大邑县", "parentId": 225, "level": 3 }, { "id": 1888, "name": "蒲江县", "parentId": 225, "level": 3 }, { "id": 1889, "name": "新津县", "parentId": 225, "level": 3 }, { "id": 1890, "name": "都江堰市", "parentId": 225, "level": 3 }, { "id": 1891, "name": "彭州市", "parentId": 225, "level": 3 }, { "id": 1892, "name": "邛崃市", "parentId": 225, "level": 3 }, { "id": 1893, "name": "崇州市", "parentId": 225, "level": 3 }, { "id": 1894, "name": "东区", "parentId": 226, "level": 3 }, { "id": 1895, "name": "西区", "parentId": 226, "level": 3 }, { "id": 1896, "name": "仁和区", "parentId": 226, "level": 3 }, { "id": 1897, "name": "米易县", "parentId": 226, "level": 3 }, { "id": 1898, "name": "盐边县", "parentId": 226, "level": 3 }, { "id": 1899, "name": "自流井区", "parentId": 227, "level": 3 }, { "id": 1900, "name": "贡井区", "parentId": 227, "level": 3 }, { "id": 1901, "name": "大安区", "parentId": 227, "level": 3 }, { "id": 1902, "name": "沿滩区", "parentId": 227, "level": 3 }, { "id": 1903, "name": "荣县", "parentId": 227, "level": 3 }, { "id": 1904, "name": "富顺县", "parentId": 227, "level": 3 }, { "id": 1905, "name": "涪城区", "parentId": 228, "level": 3 }, { "id": 1906, "name": "游仙区", "parentId": 228, "level": 3 }, { "id": 1907, "name": "三台县", "parentId": 228, "level": 3 }, { "id": 1908, "name": "盐亭县", "parentId": 228, "level": 3 }, { "id": 1909, "name": "安县", "parentId": 228, "level": 3 }, { "id": 1910, "name": "梓潼县", "parentId": 228, "level": 3 }, { "id": 1911, "name": "北川羌族自治县", "parentId": 228, "level": 3 }, { "id": 1912, "name": "平武县", "parentId": 228, "level": 3 }, { "id": 1913, "name": "江油市", "parentId": 228, "level": 3 }, { "id": 1914, "name": "顺庆区", "parentId": 229, "level": 3 }, { "id": 1915, "name": "高坪区", "parentId": 229, "level": 3 }, { "id": 1916, "name": "嘉陵区", "parentId": 229, "level": 3 }, { "id": 1917, "name": "南部县", "parentId": 229, "level": 3 }, { "id": 1918, "name": "营山县", "parentId": 229, "level": 3 }, { "id": 1919, "name": "蓬安县", "parentId": 229, "level": 3 }, { "id": 1920, "name": "仪陇县", "parentId": 229, "level": 3 }, { "id": 1921, "name": "西充县", "parentId": 229, "level": 3 }, { "id": 1922, "name": "阆中市", "parentId": 229, "level": 3 }, { "id": 1923, "name": "通川区", "parentId": 230, "level": 3 }, { "id": 1924, "name": "达县", "parentId": 230, "level": 3 }, { "id": 1925, "name": "宣汉县", "parentId": 230, "level": 3 }, { "id": 1926, "name": "开江县", "parentId": 230, "level": 3 }, { "id": 1927, "name": "大竹县", "parentId": 230, "level": 3 }, { "id": 1928, "name": "渠县", "parentId": 230, "level": 3 }, { "id": 1929, "name": "万源市", "parentId": 230, "level": 3 }, { "id": 1930, "name": "船山区", "parentId": 231, "level": 3 }, { "id": 1931, "name": "安居区", "parentId": 231, "level": 3 }, { "id": 1932, "name": "蓬溪县", "parentId": 231, "level": 3 }, { "id": 1933, "name": "射洪县", "parentId": 231, "level": 3 }, { "id": 1934, "name": "大英县", "parentId": 231, "level": 3 }, { "id": 1935, "name": "广安区", "parentId": 232, "level": 3 }, { "id": 1936, "name": "岳池县", "parentId": 232, "level": 3 }, { "id": 1937, "name": "武胜县", "parentId": 232, "level": 3 }, { "id": 1938, "name": "邻水县", "parentId": 232, "level": 3 }, { "id": 1939, "name": "华蓥市", "parentId": 232, "level": 3 }, { "id": 1940, "name": "巴州区", "parentId": 233, "level": 3 }, { "id": 1941, "name": "通江县", "parentId": 233, "level": 3 }, { "id": 1942, "name": "南江县", "parentId": 233, "level": 3 }, { "id": 1943, "name": "平昌县", "parentId": 233, "level": 3 }, { "id": 1944, "name": "江阳区", "parentId": 234, "level": 3 }, { "id": 1945, "name": "纳溪区", "parentId": 234, "level": 3 }, { "id": 1946, "name": "龙马潭区", "parentId": 234, "level": 3 }, { "id": 1947, "name": "泸县", "parentId": 234, "level": 3 }, { "id": 1948, "name": "合江县", "parentId": 234, "level": 3 }, { "id": 1949, "name": "叙永县", "parentId": 234, "level": 3 }, { "id": 1950, "name": "古蔺县", "parentId": 234, "level": 3 }, { "id": 1951, "name": "翠屏区", "parentId": 235, "level": 3 }, { "id": 1952, "name": "宜宾县", "parentId": 235, "level": 3 }, { "id": 1953, "name": "南溪县", "parentId": 235, "level": 3 }, { "id": 1954, "name": "江安县", "parentId": 235, "level": 3 }, { "id": 1955, "name": "长宁县", "parentId": 235, "level": 3 }, { "id": 1956, "name": "高县", "parentId": 235, "level": 3 }, { "id": 1957, "name": "珙县", "parentId": 235, "level": 3 }, { "id": 1958, "name": "筠连县", "parentId": 235, "level": 3 }, { "id": 1959, "name": "兴文县", "parentId": 235, "level": 3 }, { "id": 1960, "name": "屏山县", "parentId": 235, "level": 3 }, { "id": 1961, "name": "雁江区", "parentId": 236, "level": 3 }, { "id": 1962, "name": "安岳县", "parentId": 236, "level": 3 }, { "id": 1963, "name": "乐至县", "parentId": 236, "level": 3 }, { "id": 1964, "name": "简阳市", "parentId": 236, "level": 3 }, { "id": 1965, "name": "市中区", "parentId": 237, "level": 3 }, { "id": 1966, "name": "东兴区", "parentId": 237, "level": 3 }, { "id": 1967, "name": "威远县", "parentId": 237, "level": 3 }, { "id": 1968, "name": "资中县", "parentId": 237, "level": 3 }, { "id": 1969, "name": "隆昌县", "parentId": 237, "level": 3 }, { "id": 1970, "name": "市中区", "parentId": 238, "level": 3 }, { "id": 1971, "name": "沙湾区", "parentId": 238, "level": 3 }, { "id": 1972, "name": "五通桥区", "parentId": 238, "level": 3 }, { "id": 1973, "name": "金口河区", "parentId": 238, "level": 3 }, { "id": 1974, "name": "犍为县", "parentId": 238, "level": 3 }, { "id": 1975, "name": "井研县", "parentId": 238, "level": 3 }, { "id": 1976, "name": "夹江县", "parentId": 238, "level": 3 }, { "id": 1977, "name": "沐川县", "parentId": 238, "level": 3 }, { "id": 1978, "name": "峨边彝族自治县", "parentId": 238, "level": 3 }, { "id": 1979, "name": "马边彝族自治县", "parentId": 238, "level": 3 }, { "id": 1980, "name": "峨眉山市", "parentId": 238, "level": 3 }, { "id": 1981, "name": "东坡区", "parentId": 239, "level": 3 }, { "id": 1982, "name": "仁寿县", "parentId": 239, "level": 3 }, { "id": 1983, "name": "彭山县", "parentId": 239, "level": 3 }, { "id": 1984, "name": "洪雅县", "parentId": 239, "level": 3 }, { "id": 1985, "name": "丹棱县", "parentId": 239, "level": 3 }, { "id": 1986, "name": "青神县", "parentId": 239, "level": 3 }, { "id": 1987, "name": "西昌市", "parentId": 240, "level": 3 }, { "id": 1988, "name": "木里藏族自治县", "parentId": 240, "level": 3 }, { "id": 1989, "name": "盐源县", "parentId": 240, "level": 3 }, { "id": 1990, "name": "德昌县", "parentId": 240, "level": 3 }, { "id": 1991, "name": "会理县", "parentId": 240, "level": 3 }, { "id": 1992, "name": "会东县", "parentId": 240, "level": 3 }, { "id": 1993, "name": "宁南县", "parentId": 240, "level": 3 }, { "id": 1994, "name": "普格县", "parentId": 240, "level": 3 }, { "id": 1995, "name": "布拖县", "parentId": 240, "level": 3 }, { "id": 1996, "name": "金阳县", "parentId": 240, "level": 3 }, { "id": 1997, "name": "昭觉县", "parentId": 240, "level": 3 }, { "id": 1998, "name": "喜德县", "parentId": 240, "level": 3 }, { "id": 1999, "name": "冕宁县", "parentId": 240, "level": 3 }, { "id": 2000, "name": "越西县", "parentId": 240, "level": 3 }, { "id": 2001, "name": "甘洛县", "parentId": 240, "level": 3 }, { "id": 2002, "name": "美姑县", "parentId": 240, "level": 3 }, { "id": 2003, "name": "雷波县", "parentId": 240, "level": 3 }, { "id": 2004, "name": "雨城区", "parentId": 241, "level": 3 }, { "id": 2005, "name": "名山县", "parentId": 241, "level": 3 }, { "id": 2006, "name": "荥经县", "parentId": 241, "level": 3 }, { "id": 2007, "name": "汉源县", "parentId": 241, "level": 3 }, { "id": 2008, "name": "石棉县", "parentId": 241, "level": 3 }, { "id": 2009, "name": "天全县", "parentId": 241, "level": 3 }, { "id": 2010, "name": "芦山县", "parentId": 241, "level": 3 }, { "id": 2011, "name": "宝兴县", "parentId": 241, "level": 3 }, { "id": 2012, "name": "康定县", "parentId": 242, "level": 3 }, { "id": 2013, "name": "泸定县", "parentId": 242, "level": 3 }, { "id": 2014, "name": "丹巴县", "parentId": 242, "level": 3 }, { "id": 2015, "name": "九龙县", "parentId": 242, "level": 3 }, { "id": 2016, "name": "雅江县", "parentId": 242, "level": 3 }, { "id": 2017, "name": "道孚县", "parentId": 242, "level": 3 }, { "id": 2018, "name": "炉霍县", "parentId": 242, "level": 3 }, { "id": 2019, "name": "甘孜县", "parentId": 242, "level": 3 }, { "id": 2020, "name": "新龙县", "parentId": 242, "level": 3 }, { "id": 2021, "name": "德格县", "parentId": 242, "level": 3 }, { "id": 2022, "name": "白玉县", "parentId": 242, "level": 3 }, { "id": 2023, "name": "石渠县", "parentId": 242, "level": 3 }, { "id": 2024, "name": "色达县", "parentId": 242, "level": 3 }, { "id": 2025, "name": "理塘县", "parentId": 242, "level": 3 }, { "id": 2026, "name": "巴塘县", "parentId": 242, "level": 3 }, { "id": 2027, "name": "乡城县", "parentId": 242, "level": 3 }, { "id": 2028, "name": "稻城县", "parentId": 242, "level": 3 }, { "id": 2029, "name": "得荣县", "parentId": 242, "level": 3 }, { "id": 2030, "name": "汶川县", "parentId": 243, "level": 3 }, { "id": 2031, "name": "理县", "parentId": 243, "level": 3 }, { "id": 2032, "name": "茂县", "parentId": 243, "level": 3 }, { "id": 2033, "name": "松潘县", "parentId": 243, "level": 3 }, { "id": 2034, "name": "九寨沟县", "parentId": 243, "level": 3 }, { "id": 2035, "name": "金川县", "parentId": 243, "level": 3 }, { "id": 2036, "name": "小金县", "parentId": 243, "level": 3 }, { "id": 2037, "name": "黑水县", "parentId": 243, "level": 3 }, { "id": 2038, "name": "马尔康县", "parentId": 243, "level": 3 }, { "id": 2039, "name": "壤塘县", "parentId": 243, "level": 3 }, { "id": 2040, "name": "阿坝县", "parentId": 243, "level": 3 }, { "id": 2041, "name": "若尔盖县", "parentId": 243, "level": 3 }, { "id": 2042, "name": "红原县", "parentId": 243, "level": 3 }, { "id": 2043, "name": "旌阳区", "parentId": 244, "level": 3 }, { "id": 2044, "name": "中江县", "parentId": 244, "level": 3 }, { "id": 2045, "name": "罗江县", "parentId": 244, "level": 3 }, { "id": 2046, "name": "广汉市", "parentId": 244, "level": 3 }, { "id": 2047, "name": "什邡市", "parentId": 244, "level": 3 }, { "id": 2048, "name": "绵竹市", "parentId": 244, "level": 3 }, { "id": 2049, "name": "市中区", "parentId": 245, "level": 3 }, { "id": 2050, "name": "元坝区", "parentId": 245, "level": 3 }, { "id": 2051, "name": "朝天区", "parentId": 245, "level": 3 }, { "id": 2052, "name": "旺苍县", "parentId": 245, "level": 3 }, { "id": 2053, "name": "青川县", "parentId": 245, "level": 3 }, { "id": 2054, "name": "剑阁县", "parentId": 245, "level": 3 }, { "id": 2055, "name": "苍溪县", "parentId": 245, "level": 3 }, { "id": 2056, "name": "南明区", "parentId": 246, "level": 3 }, { "id": 2057, "name": "云岩区", "parentId": 246, "level": 3 }, { "id": 2058, "name": "花溪区", "parentId": 246, "level": 3 }, { "id": 2059, "name": "乌当区", "parentId": 246, "level": 3 }, { "id": 2060, "name": "白云区", "parentId": 246, "level": 3 }, { "id": 2061, "name": "小河区", "parentId": 246, "level": 3 }, { "id": 2062, "name": "开阳县", "parentId": 246, "level": 3 }, { "id": 2063, "name": "息烽县", "parentId": 246, "level": 3 }, { "id": 2064, "name": "修文县", "parentId": 246, "level": 3 }, { "id": 2065, "name": "清镇市", "parentId": 246, "level": 3 }, { "id": 2066, "name": "红花岗区", "parentId": 247, "level": 3 }, { "id": 2067, "name": "汇川区", "parentId": 247, "level": 3 }, { "id": 2068, "name": "遵义县", "parentId": 247, "level": 3 }, { "id": 2069, "name": "桐梓县", "parentId": 247, "level": 3 }, { "id": 2070, "name": "绥阳县", "parentId": 247, "level": 3 }, { "id": 2071, "name": "正安县", "parentId": 247, "level": 3 }, { "id": 2072, "name": "道真仡佬族苗族自治县", "parentId": 247, "level": 3 }, { "id": 2073, "name": "务川仡佬族苗族自治县", "parentId": 247, "level": 3 }, { "id": 2074, "name": "凤冈县", "parentId": 247, "level": 3 }, { "id": 2075, "name": "湄潭县", "parentId": 247, "level": 3 }, { "id": 2076, "name": "余庆县", "parentId": 247, "level": 3 }, { "id": 2077, "name": "习水县", "parentId": 247, "level": 3 }, { "id": 2078, "name": "赤水市", "parentId": 247, "level": 3 }, { "id": 2079, "name": "仁怀市", "parentId": 247, "level": 3 }, { "id": 2080, "name": "西秀区", "parentId": 248, "level": 3 }, { "id": 2081, "name": "平坝县", "parentId": 248, "level": 3 }, { "id": 2082, "name": "普定县", "parentId": 248, "level": 3 }, { "id": 2083, "name": "镇宁布依族苗族自治县", "parentId": 248, "level": 3 }, { "id": 2084, "name": "关岭布依族苗族自治县", "parentId": 248, "level": 3 }, { "id": 2085, "name": "紫云苗族布依族自治县", "parentId": 248, "level": 3 }, { "id": 2086, "name": "都匀市", "parentId": 249, "level": 3 }, { "id": 2087, "name": "福泉市", "parentId": 249, "level": 3 }, { "id": 2088, "name": "荔波县", "parentId": 249, "level": 3 }, { "id": 2089, "name": "贵定县", "parentId": 249, "level": 3 }, { "id": 2090, "name": "瓮安县", "parentId": 249, "level": 3 }, { "id": 2091, "name": "独山县", "parentId": 249, "level": 3 }, { "id": 2092, "name": "平塘县", "parentId": 249, "level": 3 }, { "id": 2093, "name": "罗甸县", "parentId": 249, "level": 3 }, { "id": 2094, "name": "长顺县", "parentId": 249, "level": 3 }, { "id": 2095, "name": "龙里县", "parentId": 249, "level": 3 }, { "id": 2096, "name": "惠水县", "parentId": 249, "level": 3 }, { "id": 2097, "name": "三都水族自治县", "parentId": 249, "level": 3 }, { "id": 2098, "name": "凯里市", "parentId": 250, "level": 3 }, { "id": 2099, "name": "黄平县", "parentId": 250, "level": 3 }, { "id": 2100, "name": "施秉县", "parentId": 250, "level": 3 }, { "id": 2101, "name": "三穗县", "parentId": 250, "level": 3 }, { "id": 2102, "name": "镇远县", "parentId": 250, "level": 3 }, { "id": 2103, "name": "岑巩县", "parentId": 250, "level": 3 }, { "id": 2104, "name": "天柱县", "parentId": 250, "level": 3 }, { "id": 2105, "name": "锦屏县", "parentId": 250, "level": 3 }, { "id": 2106, "name": "剑河县", "parentId": 250, "level": 3 }, { "id": 2107, "name": "台江县", "parentId": 250, "level": 3 }, { "id": 2108, "name": "黎平县", "parentId": 250, "level": 3 }, { "id": 2109, "name": "榕江县", "parentId": 250, "level": 3 }, { "id": 2110, "name": "从江县", "parentId": 250, "level": 3 }, { "id": 2111, "name": "雷山县", "parentId": 250, "level": 3 }, { "id": 2112, "name": "麻江县", "parentId": 250, "level": 3 }, { "id": 2113, "name": "丹寨县", "parentId": 250, "level": 3 }, { "id": 2114, "name": "铜仁市", "parentId": 251, "level": 3 }, { "id": 2115, "name": "江口县", "parentId": 251, "level": 3 }, { "id": 2116, "name": "玉屏侗族自治县", "parentId": 251, "level": 3 }, { "id": 2117, "name": "石阡县", "parentId": 251, "level": 3 }, { "id": 2118, "name": "思南县", "parentId": 251, "level": 3 }, { "id": 2119, "name": "印江土家族苗族自治县", "parentId": 251, "level": 3 }, { "id": 2120, "name": "德江县", "parentId": 251, "level": 3 }, { "id": 2121, "name": "沿河土家族自治县", "parentId": 251, "level": 3 }, { "id": 2122, "name": "松桃苗族自治县", "parentId": 251, "level": 3 }, { "id": 2123, "name": "万山特区", "parentId": 251, "level": 3 }, { "id": 2124, "name": "毕节市", "parentId": 252, "level": 3 }, { "id": 2125, "name": "大方县", "parentId": 252, "level": 3 }, { "id": 2126, "name": "黔西县", "parentId": 252, "level": 3 }, { "id": 2127, "name": "金沙县", "parentId": 252, "level": 3 }, { "id": 2128, "name": "织金县", "parentId": 252, "level": 3 }, { "id": 2129, "name": "纳雍县", "parentId": 252, "level": 3 }, { "id": 2130, "name": "威宁彝族回族苗族自治县", "parentId": 252, "level": 3 }, { "id": 2131, "name": "赫章县", "parentId": 252, "level": 3 }, { "id": 2132, "name": "钟山区", "parentId": 253, "level": 3 }, { "id": 2133, "name": "六枝特区", "parentId": 253, "level": 3 }, { "id": 2134, "name": "水城县", "parentId": 253, "level": 3 }, { "id": 2135, "name": "盘县", "parentId": 253, "level": 3 }, { "id": 2136, "name": "兴义市", "parentId": 254, "level": 3 }, { "id": 2137, "name": "兴仁县", "parentId": 254, "level": 3 }, { "id": 2138, "name": "普安县", "parentId": 254, "level": 3 }, { "id": 2139, "name": "晴隆县", "parentId": 254, "level": 3 }, { "id": 2140, "name": "贞丰县", "parentId": 254, "level": 3 }, { "id": 2141, "name": "望谟县", "parentId": 254, "level": 3 }, { "id": 2142, "name": "册亨县", "parentId": 254, "level": 3 }, { "id": 2143, "name": "安龙县", "parentId": 254, "level": 3 }, { "id": 2144, "name": "秀英区", "parentId": 255, "level": 3 }, { "id": 2145, "name": "龙华区", "parentId": 255, "level": 3 }, { "id": 2146, "name": "琼山区", "parentId": 255, "level": 3 }, { "id": 2147, "name": "美兰区", "parentId": 255, "level": 3 }, { "id": 2148, "name": "景洪市", "parentId": 273, "level": 3 }, { "id": 2149, "name": "勐海县", "parentId": 273, "level": 3 }, { "id": 2150, "name": "勐腊县", "parentId": 273, "level": 3 }, { "id": 2151, "name": "瑞丽市", "parentId": 274, "level": 3 }, { "id": 2152, "name": "潞西市", "parentId": 274, "level": 3 }, { "id": 2153, "name": "梁河县", "parentId": 274, "level": 3 }, { "id": 2154, "name": "盈江县", "parentId": 274, "level": 3 }, { "id": 2155, "name": "陇川县", "parentId": 274, "level": 3 }, { "id": 2156, "name": "昭阳区", "parentId": 275, "level": 3 }, { "id": 2157, "name": "鲁甸县", "parentId": 275, "level": 3 }, { "id": 2158, "name": "巧家县", "parentId": 275, "level": 3 }, { "id": 2159, "name": "盐津县", "parentId": 275, "level": 3 }, { "id": 2160, "name": "大关县", "parentId": 275, "level": 3 }, { "id": 2161, "name": "永善县", "parentId": 275, "level": 3 }, { "id": 2162, "name": "绥江县", "parentId": 275, "level": 3 }, { "id": 2163, "name": "镇雄县", "parentId": 275, "level": 3 }, { "id": 2164, "name": "彝良县", "parentId": 275, "level": 3 }, { "id": 2165, "name": "威信县", "parentId": 275, "level": 3 }, { "id": 2166, "name": "水富县", "parentId": 275, "level": 3 }, { "id": 2167, "name": "五华区", "parentId": 276, "level": 3 }, { "id": 2168, "name": "盘龙区", "parentId": 276, "level": 3 }, { "id": 2169, "name": "官渡区", "parentId": 276, "level": 3 }, { "id": 2170, "name": "西山区", "parentId": 276, "level": 3 }, { "id": 2171, "name": "东川区", "parentId": 276, "level": 3 }, { "id": 2172, "name": "呈贡县", "parentId": 276, "level": 3 }, { "id": 2173, "name": "晋宁县", "parentId": 276, "level": 3 }, { "id": 2174, "name": "富民县", "parentId": 276, "level": 3 }, { "id": 2175, "name": "宜良县", "parentId": 276, "level": 3 }, { "id": 2176, "name": "石林彝族自治县", "parentId": 276, "level": 3 }, { "id": 2177, "name": "嵩明县", "parentId": 276, "level": 3 }, { "id": 2178, "name": "禄劝彝族苗族自治县", "parentId": 276, "level": 3 }, { "id": 2179, "name": "寻甸回族彝族自治县", "parentId": 276, "level": 3 }, { "id": 2180, "name": "安宁市", "parentId": 276, "level": 3 }, { "id": 2181, "name": "大理市", "parentId": 277, "level": 3 }, { "id": 2182, "name": "漾濞彝族自治县", "parentId": 277, "level": 3 }, { "id": 2183, "name": "祥云县", "parentId": 277, "level": 3 }, { "id": 2184, "name": "宾川县", "parentId": 277, "level": 3 }, { "id": 2185, "name": "弥渡县", "parentId": 277, "level": 3 }, { "id": 2186, "name": "南涧彝族自治县", "parentId": 277, "level": 3 }, { "id": 2187, "name": "巍山彝族回族自治县", "parentId": 277, "level": 3 }, { "id": 2188, "name": "永平县", "parentId": 277, "level": 3 }, { "id": 2189, "name": "云龙县", "parentId": 277, "level": 3 }, { "id": 2190, "name": "洱源县", "parentId": 277, "level": 3 }, { "id": 2191, "name": "剑川县", "parentId": 277, "level": 3 }, { "id": 2192, "name": "鹤庆县", "parentId": 277, "level": 3 }, { "id": 2193, "name": "个旧市", "parentId": 278, "level": 3 }, { "id": 2194, "name": "开远市", "parentId": 278, "level": 3 }, { "id": 2195, "name": "蒙自县", "parentId": 278, "level": 3 }, { "id": 2196, "name": "屏边苗族自治县", "parentId": 278, "level": 3 }, { "id": 2197, "name": "建水县", "parentId": 278, "level": 3 }, { "id": 2198, "name": "石屏县", "parentId": 278, "level": 3 }, { "id": 2199, "name": "弥勒县", "parentId": 278, "level": 3 }, { "id": 2200, "name": "泸西县", "parentId": 278, "level": 3 }, { "id": 2201, "name": "元阳县", "parentId": 278, "level": 3 }, { "id": 2202, "name": "红河县", "parentId": 278, "level": 3 }, { "id": 2203, "name": "金平苗族瑶族傣族自治县", "parentId": 278, "level": 3 }, { "id": 2204, "name": "绿春县", "parentId": 278, "level": 3 }, { "id": 2205, "name": "河口瑶族自治县", "parentId": 278, "level": 3 }, { "id": 2206, "name": "麒麟区", "parentId": 279, "level": 3 }, { "id": 2207, "name": "马龙县", "parentId": 279, "level": 3 }, { "id": 2208, "name": "陆良县", "parentId": 279, "level": 3 }, { "id": 2209, "name": "师宗县", "parentId": 279, "level": 3 }, { "id": 2210, "name": "罗平县", "parentId": 279, "level": 3 }, { "id": 2211, "name": "富源县", "parentId": 279, "level": 3 }, { "id": 2212, "name": "会泽县", "parentId": 279, "level": 3 }, { "id": 2213, "name": "沾益县", "parentId": 279, "level": 3 }, { "id": 2214, "name": "宣威市", "parentId": 279, "level": 3 }, { "id": 2215, "name": "隆阳区", "parentId": 280, "level": 3 }, { "id": 2216, "name": "施甸县", "parentId": 280, "level": 3 }, { "id": 2217, "name": "腾冲县", "parentId": 280, "level": 3 }, { "id": 2218, "name": "龙陵县", "parentId": 280, "level": 3 }, { "id": 2219, "name": "昌宁县", "parentId": 280, "level": 3 }, { "id": 2220, "name": "文山县", "parentId": 281, "level": 3 }, { "id": 2221, "name": "砚山县", "parentId": 281, "level": 3 }, { "id": 2222, "name": "西畴县", "parentId": 281, "level": 3 }, { "id": 2223, "name": "麻栗坡县", "parentId": 281, "level": 3 }, { "id": 2224, "name": "马关县", "parentId": 281, "level": 3 }, { "id": 2225, "name": "丘北县", "parentId": 281, "level": 3 }, { "id": 2226, "name": "广南县", "parentId": 281, "level": 3 }, { "id": 2227, "name": "富宁县", "parentId": 281, "level": 3 }, { "id": 2228, "name": "红塔区", "parentId": 282, "level": 3 }, { "id": 2229, "name": "江川县", "parentId": 282, "level": 3 }, { "id": 2230, "name": "澄江县", "parentId": 282, "level": 3 }, { "id": 2231, "name": "通海县", "parentId": 282, "level": 3 }, { "id": 2232, "name": "华宁县", "parentId": 282, "level": 3 }, { "id": 2233, "name": "易门县", "parentId": 282, "level": 3 }, { "id": 2234, "name": "峨山彝族自治县", "parentId": 282, "level": 3 }, { "id": 2235, "name": "新平彝族傣族自治县", "parentId": 282, "level": 3 }, { "id": 2236, "name": "元江哈尼族彝族傣族自治县", "parentId": 282, "level": 3 }, { "id": 2237, "name": "楚雄市", "parentId": 283, "level": 3 }, { "id": 2238, "name": "双柏县", "parentId": 283, "level": 3 }, { "id": 2239, "name": "牟定县", "parentId": 283, "level": 3 }, { "id": 2240, "name": "南华县", "parentId": 283, "level": 3 }, { "id": 2241, "name": "姚安县", "parentId": 283, "level": 3 }, { "id": 2242, "name": "大姚县", "parentId": 283, "level": 3 }, { "id": 2243, "name": "永仁县", "parentId": 283, "level": 3 }, { "id": 2244, "name": "元谋县", "parentId": 283, "level": 3 }, { "id": 2245, "name": "武定县", "parentId": 283, "level": 3 }, { "id": 2246, "name": "禄丰县", "parentId": 283, "level": 3 }, { "id": 2247, "name": "思茅区", "parentId": 284, "level": 3 }, { "id": 2248, "name": "宁洱哈尼族彝族自治县", "parentId": 284, "level": 3 }, { "id": 2249, "name": "墨江哈尼族自治县", "parentId": 284, "level": 3 }, { "id": 2250, "name": "景东彝族自治县", "parentId": 284, "level": 3 }, { "id": 2251, "name": "景谷傣族彝族自治县", "parentId": 284, "level": 3 }, { "id": 2252, "name": "镇沅彝族哈尼族拉祜族自治县", "parentId": 284, "level": 3 }, { "id": 2253, "name": "江城哈尼族彝族自治县", "parentId": 284, "level": 3 }, { "id": 2254, "name": "孟连傣族拉祜族佤族自治县", "parentId": 284, "level": 3 }, { "id": 2255, "name": "澜沧拉祜族自治县", "parentId": 284, "level": 3 }, { "id": 2256, "name": "西盟佤族自治县", "parentId": 284, "level": 3 }, { "id": 2257, "name": "临翔区", "parentId": 285, "level": 3 }, { "id": 2258, "name": "凤庆县", "parentId": 285, "level": 3 }, { "id": 2259, "name": "云县", "parentId": 285, "level": 3 }, { "id": 2260, "name": "永德县", "parentId": 285, "level": 3 }, { "id": 2261, "name": "镇康县", "parentId": 285, "level": 3 }, { "id": 2262, "name": "双江拉祜族佤族布朗族傣族自治县", "parentId": 285, "level": 3 }, { "id": 2263, "name": "耿马傣族佤族自治县", "parentId": 285, "level": 3 }, { "id": 2264, "name": "沧源佤族自治县", "parentId": 285, "level": 3 }, { "id": 2265, "name": "泸水县", "parentId": 286, "level": 3 }, { "id": 2266, "name": "福贡县", "parentId": 286, "level": 3 }, { "id": 2267, "name": "贡山独龙族怒族自治县", "parentId": 286, "level": 3 }, { "id": 2268, "name": "兰坪白族普米族自治县", "parentId": 286, "level": 3 }, { "id": 2269, "name": "香格里拉县", "parentId": 287, "level": 3 }, { "id": 2270, "name": "德钦县", "parentId": 287, "level": 3 }, { "id": 2271, "name": "维西傈僳族自治县", "parentId": 287, "level": 3 }, { "id": 2272, "name": "古城区", "parentId": 288, "level": 3 }, { "id": 2273, "name": "玉龙纳西族自治县", "parentId": 288, "level": 3 }, { "id": 2274, "name": "永胜县", "parentId": 288, "level": 3 }, { "id": 2275, "name": "华坪县", "parentId": 288, "level": 3 }, { "id": 2276, "name": "宁蒗彝族自治县", "parentId": 288, "level": 3 }, { "id": 2277, "name": "门源回族自治县", "parentId": 289, "level": 3 }, { "id": 2278, "name": "祁连县", "parentId": 289, "level": 3 }, { "id": 2279, "name": "海晏县", "parentId": 289, "level": 3 }, { "id": 2280, "name": "刚察县", "parentId": 289, "level": 3 }, { "id": 2281, "name": "城东区", "parentId": 290, "level": 3 }, { "id": 2282, "name": "城中区", "parentId": 290, "level": 3 }, { "id": 2283, "name": "城西区", "parentId": 290, "level": 3 }, { "id": 2284, "name": "城北区", "parentId": 290, "level": 3 }, { "id": 2285, "name": "大通回族土族自治县", "parentId": 290, "level": 3 }, { "id": 2286, "name": "湟中县", "parentId": 290, "level": 3 }, { "id": 2287, "name": "湟源县", "parentId": 290, "level": 3 }, { "id": 2288, "name": "平安县", "parentId": 291, "level": 3 }, { "id": 2289, "name": "民和回族土族自治县", "parentId": 291, "level": 3 }, { "id": 2290, "name": "乐都县", "parentId": 291, "level": 3 }, { "id": 2291, "name": "互助土族自治县", "parentId": 291, "level": 3 }, { "id": 2292, "name": "化隆回族自治县", "parentId": 291, "level": 3 }, { "id": 2293, "name": "循化撒拉族自治县", "parentId": 291, "level": 3 }, { "id": 2294, "name": "同仁县", "parentId": 292, "level": 3 }, { "id": 2295, "name": "尖扎县", "parentId": 292, "level": 3 }, { "id": 2296, "name": "泽库县", "parentId": 292, "level": 3 }, { "id": 2297, "name": "河南蒙古族自治县", "parentId": 292, "level": 3 }, { "id": 2298, "name": "共和县", "parentId": 293, "level": 3 }, { "id": 2299, "name": "同德县", "parentId": 293, "level": 3 }, { "id": 2300, "name": "贵德县", "parentId": 293, "level": 3 }, { "id": 2301, "name": "兴海县", "parentId": 293, "level": 3 }, { "id": 2302, "name": "贵南县", "parentId": 293, "level": 3 }, { "id": 2303, "name": "玛沁县", "parentId": 294, "level": 3 }, { "id": 2304, "name": "班玛县", "parentId": 294, "level": 3 }, { "id": 2305, "name": "甘德县", "parentId": 294, "level": 3 }, { "id": 2306, "name": "达日县", "parentId": 294, "level": 3 }, { "id": 2307, "name": "久治县", "parentId": 294, "level": 3 }, { "id": 2308, "name": "玛多县", "parentId": 294, "level": 3 }, { "id": 2309, "name": "玉树县", "parentId": 295, "level": 3 }, { "id": 2310, "name": "杂多县", "parentId": 295, "level": 3 }, { "id": 2311, "name": "称多县", "parentId": 295, "level": 3 }, { "id": 2312, "name": "治多县", "parentId": 295, "level": 3 }, { "id": 2313, "name": "囊谦县", "parentId": 295, "level": 3 }, { "id": 2314, "name": "曲麻莱县", "parentId": 295, "level": 3 }, { "id": 2315, "name": "格尔木市", "parentId": 296, "level": 3 }, { "id": 2316, "name": "德令哈市", "parentId": 296, "level": 3 }, { "id": 2317, "name": "乌兰县", "parentId": 296, "level": 3 }, { "id": 2318, "name": "都兰县", "parentId": 296, "level": 3 }, { "id": 2319, "name": "天峻县", "parentId": 296, "level": 3 }, { "id": 2320, "name": "新城区", "parentId": 297, "level": 3 }, { "id": 2321, "name": "碑林区", "parentId": 297, "level": 3 }, { "id": 2322, "name": "莲湖区", "parentId": 297, "level": 3 }, { "id": 2323, "name": "灞桥区", "parentId": 297, "level": 3 }, { "id": 2324, "name": "未央区", "parentId": 297, "level": 3 }, { "id": 2325, "name": "雁塔区", "parentId": 297, "level": 3 }, { "id": 2326, "name": "阎良区", "parentId": 297, "level": 3 }, { "id": 2327, "name": "临潼区", "parentId": 297, "level": 3 }, { "id": 2328, "name": "长安区", "parentId": 297, "level": 3 }, { "id": 2329, "name": "蓝田县", "parentId": 297, "level": 3 }, { "id": 2330, "name": "周至县", "parentId": 297, "level": 3 }, { "id": 2331, "name": "户县", "parentId": 297, "level": 3 }, { "id": 2332, "name": "高陵县", "parentId": 297, "level": 3 }, { "id": 2333, "name": "秦都区", "parentId": 298, "level": 3 }, { "id": 2334, "name": "杨陵区", "parentId": 298, "level": 3 }, { "id": 2335, "name": "渭城区", "parentId": 298, "level": 3 }, { "id": 2336, "name": "三原县", "parentId": 298, "level": 3 }, { "id": 2337, "name": "泾阳县", "parentId": 298, "level": 3 }, { "id": 2338, "name": "乾县", "parentId": 298, "level": 3 }, { "id": 2339, "name": "礼泉县", "parentId": 298, "level": 3 }, { "id": 2340, "name": "永寿县", "parentId": 298, "level": 3 }, { "id": 2341, "name": "彬县", "parentId": 298, "level": 3 }, { "id": 2342, "name": "长武县", "parentId": 298, "level": 3 }, { "id": 2343, "name": "旬邑县", "parentId": 298, "level": 3 }, { "id": 2344, "name": "淳化县", "parentId": 298, "level": 3 }, { "id": 2345, "name": "武功县", "parentId": 298, "level": 3 }, { "id": 2346, "name": "兴平市", "parentId": 298, "level": 3 }, { "id": 2347, "name": "宝塔区", "parentId": 299, "level": 3 }, { "id": 2348, "name": "延长县", "parentId": 299, "level": 3 }, { "id": 2349, "name": "延川县", "parentId": 299, "level": 3 }, { "id": 2350, "name": "子长县", "parentId": 299, "level": 3 }, { "id": 2351, "name": "安塞县", "parentId": 299, "level": 3 }, { "id": 2352, "name": "志丹县", "parentId": 299, "level": 3 }, { "id": 2353, "name": "吴起县", "parentId": 299, "level": 3 }, { "id": 2354, "name": "甘泉县", "parentId": 299, "level": 3 }, { "id": 2355, "name": "富县", "parentId": 299, "level": 3 }, { "id": 2356, "name": "洛川县", "parentId": 299, "level": 3 }, { "id": 2357, "name": "宜川县", "parentId": 299, "level": 3 }, { "id": 2358, "name": "黄龙县", "parentId": 299, "level": 3 }, { "id": 2359, "name": "黄陵县", "parentId": 299, "level": 3 }, { "id": 2360, "name": "榆阳区", "parentId": 300, "level": 3 }, { "id": 2361, "name": "神木县", "parentId": 300, "level": 3 }, { "id": 2362, "name": "府谷县", "parentId": 300, "level": 3 }, { "id": 2363, "name": "横山县", "parentId": 300, "level": 3 }, { "id": 2364, "name": "靖边县", "parentId": 300, "level": 3 }, { "id": 2365, "name": "定边县", "parentId": 300, "level": 3 }, { "id": 2366, "name": "绥德县", "parentId": 300, "level": 3 }, { "id": 2367, "name": "米脂县", "parentId": 300, "level": 3 }, { "id": 2368, "name": "佳县", "parentId": 300, "level": 3 }, { "id": 2369, "name": "吴堡县", "parentId": 300, "level": 3 }, { "id": 2370, "name": "清涧县", "parentId": 300, "level": 3 }, { "id": 2371, "name": "子洲县", "parentId": 300, "level": 3 }, { "id": 2372, "name": "临渭区", "parentId": 301, "level": 3 }, { "id": 2373, "name": "华县", "parentId": 301, "level": 3 }, { "id": 2374, "name": "潼关县", "parentId": 301, "level": 3 }, { "id": 2375, "name": "大荔县", "parentId": 301, "level": 3 }, { "id": 2376, "name": "合阳县", "parentId": 301, "level": 3 }, { "id": 2377, "name": "澄城县", "parentId": 301, "level": 3 }, { "id": 2378, "name": "蒲城县", "parentId": 301, "level": 3 }, { "id": 2379, "name": "白水县", "parentId": 301, "level": 3 }, { "id": 2380, "name": "富平县", "parentId": 301, "level": 3 }, { "id": 2381, "name": "韩城市", "parentId": 301, "level": 3 }, { "id": 2382, "name": "华阴市", "parentId": 301, "level": 3 }, { "id": 2383, "name": "商州区", "parentId": 302, "level": 3 }, { "id": 2384, "name": "洛南县", "parentId": 302, "level": 3 }, { "id": 2385, "name": "丹凤县", "parentId": 302, "level": 3 }, { "id": 2386, "name": "商南县", "parentId": 302, "level": 3 }, { "id": 2387, "name": "山阳县", "parentId": 302, "level": 3 }, { "id": 2388, "name": "镇安县", "parentId": 302, "level": 3 }, { "id": 2389, "name": "柞水县", "parentId": 302, "level": 3 }, { "id": 2390, "name": "汉滨区", "parentId": 303, "level": 3 }, { "id": 2391, "name": "汉阴县", "parentId": 303, "level": 3 }, { "id": 2392, "name": "石泉县", "parentId": 303, "level": 3 }, { "id": 2393, "name": "宁陕县", "parentId": 303, "level": 3 }, { "id": 2394, "name": "紫阳县", "parentId": 303, "level": 3 }, { "id": 2395, "name": "岚皋县", "parentId": 303, "level": 3 }, { "id": 2396, "name": "平利县", "parentId": 303, "level": 3 }, { "id": 2397, "name": "镇坪县", "parentId": 303, "level": 3 }, { "id": 2398, "name": "旬阳县", "parentId": 303, "level": 3 }, { "id": 2399, "name": "白河县", "parentId": 303, "level": 3 }, { "id": 2400, "name": "汉台区", "parentId": 304, "level": 3 }, { "id": 2401, "name": "南郑县", "parentId": 304, "level": 3 }, { "id": 2402, "name": "城固县", "parentId": 304, "level": 3 }, { "id": 2403, "name": "洋县", "parentId": 304, "level": 3 }, { "id": 2404, "name": "西乡县", "parentId": 304, "level": 3 }, { "id": 2405, "name": "勉县", "parentId": 304, "level": 3 }, { "id": 2406, "name": "宁强县", "parentId": 304, "level": 3 }, { "id": 2407, "name": "略阳县", "parentId": 304, "level": 3 }, { "id": 2408, "name": "镇巴县", "parentId": 304, "level": 3 }, { "id": 2409, "name": "留坝县", "parentId": 304, "level": 3 }, { "id": 2410, "name": "佛坪县", "parentId": 304, "level": 3 }, { "id": 2411, "name": "渭滨区", "parentId": 305, "level": 3 }, { "id": 2412, "name": "金台区", "parentId": 305, "level": 3 }, { "id": 2413, "name": "陈仓区", "parentId": 305, "level": 3 }, { "id": 2414, "name": "凤翔县", "parentId": 305, "level": 3 }, { "id": 2415, "name": "岐山县", "parentId": 305, "level": 3 }, { "id": 2416, "name": "扶风县", "parentId": 305, "level": 3 }, { "id": 2417, "name": "眉县", "parentId": 305, "level": 3 }, { "id": 2418, "name": "陇县", "parentId": 305, "level": 3 }, { "id": 2419, "name": "千阳县", "parentId": 305, "level": 3 }, { "id": 2420, "name": "麟游县", "parentId": 305, "level": 3 }, { "id": 2421, "name": "凤县", "parentId": 305, "level": 3 }, { "id": 2422, "name": "太白县", "parentId": 305, "level": 3 }, { "id": 2423, "name": "王益区", "parentId": 306, "level": 3 }, { "id": 2424, "name": "印台区", "parentId": 306, "level": 3 }, { "id": 2425, "name": "耀州区", "parentId": 306, "level": 3 }, { "id": 2426, "name": "宜君县", "parentId": 306, "level": 3 }, { "id": 2427, "name": "港口区", "parentId": 307, "level": 3 }, { "id": 2428, "name": "防城区", "parentId": 307, "level": 3 }, { "id": 2429, "name": "上思县", "parentId": 307, "level": 3 }, { "id": 2430, "name": "东兴市", "parentId": 307, "level": 3 }, { "id": 2431, "name": "兴宁区", "parentId": 308, "level": 3 }, { "id": 2432, "name": "青秀区", "parentId": 308, "level": 3 }, { "id": 2433, "name": "江南区", "parentId": 308, "level": 3 }, { "id": 2434, "name": "西乡塘区", "parentId": 308, "level": 3 }, { "id": 2435, "name": "良庆区", "parentId": 308, "level": 3 }, { "id": 2436, "name": "邕宁区", "parentId": 308, "level": 3 }, { "id": 2437, "name": "武鸣县", "parentId": 308, "level": 3 }, { "id": 2438, "name": "隆安县", "parentId": 308, "level": 3 }, { "id": 2439, "name": "马山县", "parentId": 308, "level": 3 }, { "id": 2440, "name": "上林县", "parentId": 308, "level": 3 }, { "id": 2441, "name": "宾阳县", "parentId": 308, "level": 3 }, { "id": 2442, "name": "横县", "parentId": 308, "level": 3 }, { "id": 2443, "name": "江洲区", "parentId": 309, "level": 3 }, { "id": 2444, "name": "扶绥县", "parentId": 309, "level": 3 }, { "id": 2445, "name": "宁明县", "parentId": 309, "level": 3 }, { "id": 2446, "name": "龙州县", "parentId": 309, "level": 3 }, { "id": 2447, "name": "大新县", "parentId": 309, "level": 3 }, { "id": 2448, "name": "天等县", "parentId": 309, "level": 3 }, { "id": 2449, "name": "凭祥市", "parentId": 309, "level": 3 }, { "id": 2450, "name": "兴宾区", "parentId": 310, "level": 3 }, { "id": 2451, "name": "忻城县", "parentId": 310, "level": 3 }, { "id": 2452, "name": "象州县", "parentId": 310, "level": 3 }, { "id": 2453, "name": "武宣县", "parentId": 310, "level": 3 }, { "id": 2454, "name": "金秀瑶族自治县", "parentId": 310, "level": 3 }, { "id": 2455, "name": "合山市", "parentId": 310, "level": 3 }, { "id": 2456, "name": "城中区", "parentId": 311, "level": 3 }, { "id": 2457, "name": "鱼峰区", "parentId": 311, "level": 3 }, { "id": 2458, "name": "柳南区", "parentId": 311, "level": 3 }, { "id": 2459, "name": "柳北区", "parentId": 311, "level": 3 }, { "id": 2460, "name": "柳江县", "parentId": 311, "level": 3 }, { "id": 2461, "name": "柳城县", "parentId": 311, "level": 3 }, { "id": 2462, "name": "鹿寨县", "parentId": 311, "level": 3 }, { "id": 2463, "name": "融安县", "parentId": 311, "level": 3 }, { "id": 2464, "name": "融水苗族自治县", "parentId": 311, "level": 3 }, { "id": 2465, "name": "三江侗族自治县", "parentId": 311, "level": 3 }, { "id": 2466, "name": "秀峰区", "parentId": 312, "level": 3 }, { "id": 2467, "name": "叠彩区", "parentId": 312, "level": 3 }, { "id": 2468, "name": "象山区", "parentId": 312, "level": 3 }, { "id": 2469, "name": "七星区", "parentId": 312, "level": 3 }, { "id": 2470, "name": "雁山区", "parentId": 312, "level": 3 }, { "id": 2471, "name": "阳朔县", "parentId": 312, "level": 3 }, { "id": 2472, "name": "临桂县", "parentId": 312, "level": 3 }, { "id": 2473, "name": "灵川县", "parentId": 312, "level": 3 }, { "id": 2474, "name": "全州县", "parentId": 312, "level": 3 }, { "id": 2475, "name": "兴安县", "parentId": 312, "level": 3 }, { "id": 2476, "name": "永福县", "parentId": 312, "level": 3 }, { "id": 2477, "name": "灌阳县", "parentId": 312, "level": 3 }, { "id": 2478, "name": "龙胜各族自治县", "parentId": 312, "level": 3 }, { "id": 2479, "name": "资源县", "parentId": 312, "level": 3 }, { "id": 2480, "name": "平乐县", "parentId": 312, "level": 3 }, { "id": 2481, "name": "荔浦县", "parentId": 312, "level": 3 }, { "id": 2482, "name": "恭城瑶族自治县", "parentId": 312, "level": 3 }, { "id": 2483, "name": "万秀区", "parentId": 313, "level": 3 }, { "id": 2484, "name": "碟山区", "parentId": 313, "level": 3 }, { "id": 2485, "name": "长洲区", "parentId": 313, "level": 3 }, { "id": 2486, "name": "苍梧县", "parentId": 313, "level": 3 }, { "id": 2487, "name": "藤县", "parentId": 313, "level": 3 }, { "id": 2488, "name": "蒙山县", "parentId": 313, "level": 3 }, { "id": 2489, "name": "岑溪市", "parentId": 313, "level": 3 }, { "id": 2490, "name": "八步区", "parentId": 314, "level": 3 }, { "id": 2491, "name": "昭平县", "parentId": 314, "level": 3 }, { "id": 2492, "name": "钟山县", "parentId": 314, "level": 3 }, { "id": 2493, "name": "富川瑶族自治县", "parentId": 314, "level": 3 }, { "id": 2494, "name": "港北区", "parentId": 315, "level": 3 }, { "id": 2495, "name": "港南区", "parentId": 315, "level": 3 }, { "id": 2496, "name": "覃塘区", "parentId": 315, "level": 3 }, { "id": 2497, "name": "平南县", "parentId": 315, "level": 3 }, { "id": 2498, "name": "桂平市", "parentId": 315, "level": 3 }, { "id": 2499, "name": "玉州区", "parentId": 316, "level": 3 }, { "id": 2500, "name": "容县", "parentId": 316, "level": 3 }, { "id": 2501, "name": "陆川县", "parentId": 316, "level": 3 }, { "id": 2502, "name": "博白县", "parentId": 316, "level": 3 }, { "id": 2503, "name": "兴业县", "parentId": 316, "level": 3 }, { "id": 2504, "name": "北流市", "parentId": 316, "level": 3 }, { "id": 2505, "name": "右江区", "parentId": 317, "level": 3 }, { "id": 2506, "name": "田阳县", "parentId": 317, "level": 3 }, { "id": 2507, "name": "田东县", "parentId": 317, "level": 3 }, { "id": 2508, "name": "平果县", "parentId": 317, "level": 3 }, { "id": 2509, "name": "德保县", "parentId": 317, "level": 3 }, { "id": 2510, "name": "靖西县", "parentId": 317, "level": 3 }, { "id": 2511, "name": "那坡县", "parentId": 317, "level": 3 }, { "id": 2512, "name": "凌云县", "parentId": 317, "level": 3 }, { "id": 2513, "name": "乐业县", "parentId": 317, "level": 3 }, { "id": 2514, "name": "田林县", "parentId": 317, "level": 3 }, { "id": 2515, "name": "西林县", "parentId": 317, "level": 3 }, { "id": 2516, "name": "隆林各族自治县", "parentId": 317, "level": 3 }, { "id": 2517, "name": "钦南区", "parentId": 318, "level": 3 }, { "id": 2518, "name": "钦北区", "parentId": 318, "level": 3 }, { "id": 2519, "name": "灵山县", "parentId": 318, "level": 3 }, { "id": 2520, "name": "浦北县", "parentId": 318, "level": 3 }, { "id": 2521, "name": "金城江区", "parentId": 319, "level": 3 }, { "id": 2522, "name": "南丹县", "parentId": 319, "level": 3 }, { "id": 2523, "name": "天峨县", "parentId": 319, "level": 3 }, { "id": 2524, "name": "凤山县", "parentId": 319, "level": 3 }, { "id": 2525, "name": "东兰县", "parentId": 319, "level": 3 }, { "id": 2526, "name": "罗城仫佬族自治县", "parentId": 319, "level": 3 }, { "id": 2527, "name": "环江毛南族自治县", "parentId": 319, "level": 3 }, { "id": 2528, "name": "巴马瑶族自治县", "parentId": 319, "level": 3 }, { "id": 2529, "name": "都安瑶族自治县", "parentId": 319, "level": 3 }, { "id": 2530, "name": "大化瑶族自治县", "parentId": 319, "level": 3 }, { "id": 2531, "name": "宜州市", "parentId": 319, "level": 3 }, { "id": 2532, "name": "海城区", "parentId": 320, "level": 3 }, { "id": 2533, "name": "银海区", "parentId": 320, "level": 3 }, { "id": 2534, "name": "铁山港区", "parentId": 320, "level": 3 }, { "id": 2535, "name": "合浦县", "parentId": 320, "level": 3 }, { "id": 2536, "name": "城关区", "parentId": 321, "level": 3 }, { "id": 2537, "name": "林周县", "parentId": 321, "level": 3 }, { "id": 2538, "name": "当雄县", "parentId": 321, "level": 3 }, { "id": 2539, "name": "尼木县", "parentId": 321, "level": 3 }, { "id": 2540, "name": "曲水县", "parentId": 321, "level": 3 }, { "id": 2541, "name": "堆龙德庆县", "parentId": 321, "level": 3 }, { "id": 2542, "name": "达孜县", "parentId": 321, "level": 3 }, { "id": 2543, "name": "墨竹工卡县", "parentId": 321, "level": 3 }, { "id": 2544, "name": "日喀则市", "parentId": 322, "level": 3 }, { "id": 2545, "name": "南木林县", "parentId": 322, "level": 3 }, { "id": 2546, "name": "江孜县", "parentId": 322, "level": 3 }, { "id": 2547, "name": "定日县", "parentId": 322, "level": 3 }, { "id": 2548, "name": "萨迦县", "parentId": 322, "level": 3 }, { "id": 2549, "name": "拉孜县", "parentId": 322, "level": 3 }, { "id": 2550, "name": "昂仁县", "parentId": 322, "level": 3 }, { "id": 2551, "name": "谢通门县", "parentId": 322, "level": 3 }, { "id": 2552, "name": "白朗县", "parentId": 322, "level": 3 }, { "id": 2553, "name": "仁布县", "parentId": 322, "level": 3 }, { "id": 2554, "name": "康马县", "parentId": 322, "level": 3 }, { "id": 2555, "name": "定结县", "parentId": 322, "level": 3 }, { "id": 2556, "name": "仲巴县", "parentId": 322, "level": 3 }, { "id": 2557, "name": "亚东县", "parentId": 322, "level": 3 }, { "id": 2558, "name": "吉隆县", "parentId": 322, "level": 3 }, { "id": 2559, "name": "聂拉木县", "parentId": 322, "level": 3 }, { "id": 2560, "name": "萨嘎县", "parentId": 322, "level": 3 }, { "id": 2561, "name": "岗巴县", "parentId": 322, "level": 3 }, { "id": 2562, "name": "乃东县", "parentId": 323, "level": 3 }, { "id": 2563, "name": "扎囊县", "parentId": 323, "level": 3 }, { "id": 2564, "name": "贡嘎县", "parentId": 323, "level": 3 }, { "id": 2565, "name": "桑日县", "parentId": 323, "level": 3 }, { "id": 2566, "name": "琼结县", "parentId": 323, "level": 3 }, { "id": 2567, "name": "曲松县", "parentId": 323, "level": 3 }, { "id": 2568, "name": "措美县", "parentId": 323, "level": 3 }, { "id": 2569, "name": "洛扎县", "parentId": 323, "level": 3 }, { "id": 2570, "name": "加查县", "parentId": 323, "level": 3 }, { "id": 2571, "name": "隆子县", "parentId": 323, "level": 3 }, { "id": 2572, "name": "错那县", "parentId": 323, "level": 3 }, { "id": 2573, "name": "浪卡子县", "parentId": 323, "level": 3 }, { "id": 2574, "name": "林芝县", "parentId": 324, "level": 3 }, { "id": 2575, "name": "工布江达县", "parentId": 324, "level": 3 }, { "id": 2576, "name": "米林县", "parentId": 324, "level": 3 }, { "id": 2577, "name": "墨脱县", "parentId": 324, "level": 3 }, { "id": 2578, "name": "波密县", "parentId": 324, "level": 3 }, { "id": 2579, "name": "察隅县", "parentId": 324, "level": 3 }, { "id": 2580, "name": "朗县", "parentId": 324, "level": 3 }, { "id": 2581, "name": "昌都县", "parentId": 325, "level": 3 }, { "id": 2582, "name": "江达县", "parentId": 325, "level": 3 }, { "id": 2583, "name": "贡觉县", "parentId": 325, "level": 3 }, { "id": 2584, "name": "类乌齐县", "parentId": 325, "level": 3 }, { "id": 2585, "name": "丁青县", "parentId": 325, "level": 3 }, { "id": 2586, "name": "察雅县", "parentId": 325, "level": 3 }, { "id": 2587, "name": "八宿县", "parentId": 325, "level": 3 }, { "id": 2588, "name": "左贡县", "parentId": 325, "level": 3 }, { "id": 2589, "name": "芒康县", "parentId": 325, "level": 3 }, { "id": 2590, "name": "洛隆县", "parentId": 325, "level": 3 }, { "id": 2591, "name": "边坝县", "parentId": 325, "level": 3 }, { "id": 2592, "name": "那曲县", "parentId": 326, "level": 3 }, { "id": 2593, "name": "嘉黎县", "parentId": 326, "level": 3 }, { "id": 2594, "name": "比如县", "parentId": 326, "level": 3 }, { "id": 2595, "name": "聂荣县", "parentId": 326, "level": 3 }, { "id": 2596, "name": "安多县", "parentId": 326, "level": 3 }, { "id": 2597, "name": "申扎县", "parentId": 326, "level": 3 }, { "id": 2598, "name": "索县", "parentId": 326, "level": 3 }, { "id": 2599, "name": "班戈县", "parentId": 326, "level": 3 }, { "id": 2600, "name": "巴青县", "parentId": 326, "level": 3 }, { "id": 2601, "name": "尼玛县", "parentId": 326, "level": 3 }, { "id": 2602, "name": "普兰县", "parentId": 327, "level": 3 }, { "id": 2603, "name": "札达县", "parentId": 327, "level": 3 }, { "id": 2604, "name": "噶尔县", "parentId": 327, "level": 3 }, { "id": 2605, "name": "日土县", "parentId": 327, "level": 3 }, { "id": 2606, "name": "革吉县", "parentId": 327, "level": 3 }, { "id": 2607, "name": "改则县", "parentId": 327, "level": 3 }, { "id": 2608, "name": "措勤县", "parentId": 327, "level": 3 }, { "id": 2609, "name": "兴庆区", "parentId": 328, "level": 3 }, { "id": 2610, "name": "西夏区", "parentId": 328, "level": 3 }, { "id": 2611, "name": "金凤区", "parentId": 328, "level": 3 }, { "id": 2612, "name": "永宁县", "parentId": 328, "level": 3 }, { "id": 2613, "name": "贺兰县", "parentId": 328, "level": 3 }, { "id": 2614, "name": "灵武市", "parentId": 328, "level": 3 }, { "id": 2615, "name": "大武口区", "parentId": 329, "level": 3 }, { "id": 2616, "name": "惠农区", "parentId": 329, "level": 3 }, { "id": 2617, "name": "平罗县", "parentId": 329, "level": 3 }, { "id": 2618, "name": "利通区", "parentId": 330, "level": 3 }, { "id": 2619, "name": "盐池县", "parentId": 330, "level": 3 }, { "id": 2620, "name": "同心县", "parentId": 330, "level": 3 }, { "id": 2621, "name": "青铜峡市", "parentId": 330, "level": 3 }, { "id": 2622, "name": "原州区", "parentId": 331, "level": 3 }, { "id": 2623, "name": "西吉县", "parentId": 331, "level": 3 }, { "id": 2624, "name": "隆德县", "parentId": 331, "level": 3 }, { "id": 2625, "name": "泾源县", "parentId": 331, "level": 3 }, { "id": 2626, "name": "彭阳县", "parentId": 331, "level": 3 }, { "id": 2627, "name": "沙坡头区", "parentId": 332, "level": 3 }, { "id": 2628, "name": "中宁县", "parentId": 332, "level": 3 }, { "id": 2629, "name": "海原县", "parentId": 332, "level": 3 }, { "id": 2630, "name": "塔城市", "parentId": 333, "level": 3 }, { "id": 2631, "name": "乌苏市", "parentId": 333, "level": 3 }, { "id": 2632, "name": "额敏县", "parentId": 333, "level": 3 }, { "id": 2633, "name": "沙湾县", "parentId": 333, "level": 3 }, { "id": 2634, "name": "托里县", "parentId": 333, "level": 3 }, { "id": 2635, "name": "裕民县", "parentId": 333, "level": 3 }, { "id": 2636, "name": "和布克赛尔蒙古自治县", "parentId": 333, "level": 3 }, { "id": 2637, "name": "哈密市", "parentId": 334, "level": 3 }, { "id": 2638, "name": "巴里坤哈萨克自治县", "parentId": 334, "level": 3 }, { "id": 2639, "name": "伊吾县", "parentId": 334, "level": 3 }, { "id": 2640, "name": "和田市", "parentId": 335, "level": 3 }, { "id": 2641, "name": "和田县", "parentId": 335, "level": 3 }, { "id": 2642, "name": "墨玉县", "parentId": 335, "level": 3 }, { "id": 2643, "name": "皮山县", "parentId": 335, "level": 3 }, { "id": 2644, "name": "洛浦县", "parentId": 335, "level": 3 }, { "id": 2645, "name": "策勒县", "parentId": 335, "level": 3 }, { "id": 2646, "name": "于田县", "parentId": 335, "level": 3 }, { "id": 2647, "name": "民丰县", "parentId": 335, "level": 3 }, { "id": 2648, "name": "阿勒泰市", "parentId": 336, "level": 3 }, { "id": 2649, "name": "布尔津县", "parentId": 336, "level": 3 }, { "id": 2650, "name": "富蕴县", "parentId": 336, "level": 3 }, { "id": 2651, "name": "福海县", "parentId": 336, "level": 3 }, { "id": 2652, "name": "哈巴河县", "parentId": 336, "level": 3 }, { "id": 2653, "name": "青河县", "parentId": 336, "level": 3 }, { "id": 2654, "name": "吉木乃县", "parentId": 336, "level": 3 }, { "id": 2655, "name": "阿图什市", "parentId": 337, "level": 3 }, { "id": 2656, "name": "阿克陶县", "parentId": 337, "level": 3 }, { "id": 2657, "name": "阿合奇县", "parentId": 337, "level": 3 }, { "id": 2658, "name": "乌恰县", "parentId": 337, "level": 3 }, { "id": 2659, "name": "博乐市", "parentId": 338, "level": 3 }, { "id": 2660, "name": "精河县", "parentId": 338, "level": 3 }, { "id": 2661, "name": "温泉县", "parentId": 338, "level": 3 }, { "id": 2662, "name": "独山子区", "parentId": 339, "level": 3 }, { "id": 2663, "name": "克拉玛依区", "parentId": 339, "level": 3 }, { "id": 2664, "name": "白碱滩区", "parentId": 339, "level": 3 }, { "id": 2665, "name": "乌尔禾区", "parentId": 339, "level": 3 }, { "id": 2666, "name": "天山区", "parentId": 340, "level": 3 }, { "id": 2667, "name": "沙依巴克区", "parentId": 340, "level": 3 }, { "id": 2668, "name": "新市区", "parentId": 340, "level": 3 }, { "id": 2669, "name": "水磨沟区", "parentId": 340, "level": 3 }, { "id": 2670, "name": "头屯河区", "parentId": 340, "level": 3 }, { "id": 2671, "name": "达坂城区", "parentId": 340, "level": 3 }, { "id": 2672, "name": "米东区", "parentId": 340, "level": 3 }, { "id": 2673, "name": "乌鲁木齐县", "parentId": 340, "level": 3 }, { "id": 2674, "name": "昌吉市", "parentId": 342, "level": 3 }, { "id": 2675, "name": "阜康市", "parentId": 342, "level": 3 }, { "id": 2676, "name": "呼图壁县", "parentId": 342, "level": 3 }, { "id": 2677, "name": "玛纳斯县", "parentId": 342, "level": 3 }, { "id": 2678, "name": "奇台县", "parentId": 342, "level": 3 }, { "id": 2679, "name": "吉木萨尔县", "parentId": 342, "level": 3 }, { "id": 2680, "name": "木垒哈萨克自治县", "parentId": 342, "level": 3 }, { "id": 2681, "name": "吐鲁番市", "parentId": 344, "level": 3 }, { "id": 2682, "name": "鄯善县", "parentId": 344, "level": 3 }, { "id": 2683, "name": "托克逊县", "parentId": 344, "level": 3 }, { "id": 2684, "name": "库尔勒市", "parentId": 345, "level": 3 }, { "id": 2685, "name": "轮台县", "parentId": 345, "level": 3 }, { "id": 2686, "name": "尉犁县", "parentId": 345, "level": 3 }, { "id": 2687, "name": "若羌县", "parentId": 345, "level": 3 }, { "id": 2688, "name": "且末县", "parentId": 345, "level": 3 }, { "id": 2689, "name": "焉耆回族自治县", "parentId": 345, "level": 3 }, { "id": 2690, "name": "和静县", "parentId": 345, "level": 3 }, { "id": 2691, "name": "和硕县", "parentId": 345, "level": 3 }, { "id": 2692, "name": "博湖县", "parentId": 345, "level": 3 }, { "id": 2693, "name": "阿克苏市", "parentId": 346, "level": 3 }, { "id": 2694, "name": "温宿县", "parentId": 346, "level": 3 }, { "id": 2695, "name": "库车县", "parentId": 346, "level": 3 }, { "id": 2696, "name": "沙雅县", "parentId": 346, "level": 3 }, { "id": 2697, "name": "新和县", "parentId": 346, "level": 3 }, { "id": 2698, "name": "拜城县", "parentId": 346, "level": 3 }, { "id": 2699, "name": "乌什县", "parentId": 346, "level": 3 }, { "id": 2700, "name": "阿瓦提县", "parentId": 346, "level": 3 }, { "id": 2701, "name": "柯坪县", "parentId": 346, "level": 3 }, { "id": 2702, "name": "喀什市", "parentId": 348, "level": 3 }, { "id": 2703, "name": "疏附县", "parentId": 348, "level": 3 }, { "id": 2704, "name": "疏勒县", "parentId": 348, "level": 3 }, { "id": 2705, "name": "英吉沙县", "parentId": 348, "level": 3 }, { "id": 2706, "name": "泽普县", "parentId": 348, "level": 3 }, { "id": 2707, "name": "莎车县", "parentId": 348, "level": 3 }, { "id": 2708, "name": "叶城县", "parentId": 348, "level": 3 }, { "id": 2709, "name": "麦盖提县", "parentId": 348, "level": 3 }, { "id": 2710, "name": "岳普湖县", "parentId": 348, "level": 3 }, { "id": 2711, "name": "伽师县", "parentId": 348, "level": 3 }, { "id": 2712, "name": "巴楚县", "parentId": 348, "level": 3 }, { "id": 2713, "name": "塔什库尔干塔吉克自治县", "parentId": 348, "level": 3 }, { "id": 2714, "name": "伊宁市", "parentId": 350, "level": 3 }, { "id": 2715, "name": "奎屯市", "parentId": 350, "level": 3 }, { "id": 2716, "name": "伊宁县", "parentId": 350, "level": 3 }, { "id": 2717, "name": "察布查尔锡伯自治县", "parentId": 350, "level": 3 }, { "id": 2718, "name": "霍城县", "parentId": 350, "level": 3 }, { "id": 2719, "name": "巩留县", "parentId": 350, "level": 3 }, { "id": 2720, "name": "新源县", "parentId": 350, "level": 3 }, { "id": 2721, "name": "昭苏县", "parentId": 350, "level": 3 }, { "id": 2722, "name": "特克斯县", "parentId": 350, "level": 3 }, { "id": 2723, "name": "尼勒克县", "parentId": 350, "level": 3 }, { "id": 2724, "name": "海拉尔区", "parentId": 351, "level": 3 }, { "id": 2725, "name": "阿荣旗", "parentId": 351, "level": 3 }, { "id": 2726, "name": "莫力达瓦达斡尔族自治旗", "parentId": 351, "level": 3 }, { "id": 2727, "name": "鄂伦春自治旗", "parentId": 351, "level": 3 }, { "id": 2728, "name": "鄂温克族自治旗", "parentId": 351, "level": 3 }, { "id": 2729, "name": "陈巴尔虎旗", "parentId": 351, "level": 3 }, { "id": 2730, "name": "新巴尔虎左旗", "parentId": 351, "level": 3 }, { "id": 2731, "name": "新巴尔虎右旗", "parentId": 351, "level": 3 }, { "id": 2732, "name": "满洲里市", "parentId": 351, "level": 3 }, { "id": 2733, "name": "牙克石市", "parentId": 351, "level": 3 }, { "id": 2734, "name": "扎兰屯市", "parentId": 351, "level": 3 }, { "id": 2735, "name": "额尔古纳市", "parentId": 351, "level": 3 }, { "id": 2736, "name": "根河市", "parentId": 351, "level": 3 }, { "id": 2737, "name": "新城区", "parentId": 352, "level": 3 }, { "id": 2738, "name": "回民区", "parentId": 352, "level": 3 }, { "id": 2739, "name": "玉泉区", "parentId": 352, "level": 3 }, { "id": 2740, "name": "赛罕区", "parentId": 352, "level": 3 }, { "id": 2741, "name": "土默特左旗", "parentId": 352, "level": 3 }, { "id": 2742, "name": "托克托县", "parentId": 352, "level": 3 }, { "id": 2743, "name": "和林格尔县", "parentId": 352, "level": 3 }, { "id": 2744, "name": "清水河县", "parentId": 352, "level": 3 }, { "id": 2745, "name": "武川县", "parentId": 352, "level": 3 }, { "id": 2746, "name": "东河区", "parentId": 353, "level": 3 }, { "id": 2747, "name": "昆都仑区", "parentId": 353, "level": 3 }, { "id": 2748, "name": "青山区", "parentId": 353, "level": 3 }, { "id": 2749, "name": "石拐区", "parentId": 353, "level": 3 }, { "id": 2750, "name": "白云鄂博矿区", "parentId": 353, "level": 3 }, { "id": 2751, "name": "九原区", "parentId": 353, "level": 3 }, { "id": 2752, "name": "土默特右旗", "parentId": 353, "level": 3 }, { "id": 2753, "name": "固阳县", "parentId": 353, "level": 3 }, { "id": 2754, "name": "达尔罕茂明安联合旗", "parentId": 353, "level": 3 }, { "id": 2755, "name": "海勃湾区", "parentId": 354, "level": 3 }, { "id": 2756, "name": "海南区", "parentId": 354, "level": 3 }, { "id": 2757, "name": "乌达区", "parentId": 354, "level": 3 }, { "id": 2758, "name": "集宁区", "parentId": 355, "level": 3 }, { "id": 2759, "name": "卓资县", "parentId": 355, "level": 3 }, { "id": 2760, "name": "化德县", "parentId": 355, "level": 3 }, { "id": 2761, "name": "商都县", "parentId": 355, "level": 3 }, { "id": 2762, "name": "兴和县", "parentId": 355, "level": 3 }, { "id": 2763, "name": "凉城县", "parentId": 355, "level": 3 }, { "id": 2764, "name": "察哈尔右翼前旗", "parentId": 355, "level": 3 }, { "id": 2765, "name": "察哈尔右翼中旗", "parentId": 355, "level": 3 }, { "id": 2766, "name": "察哈尔右翼后旗", "parentId": 355, "level": 3 }, { "id": 2767, "name": "四子王旗", "parentId": 355, "level": 3 }, { "id": 2768, "name": "丰镇市", "parentId": 355, "level": 3 }, { "id": 2769, "name": "科尔沁区", "parentId": 356, "level": 3 }, { "id": 2770, "name": "科尔沁左翼中旗", "parentId": 356, "level": 3 }, { "id": 2771, "name": "科尔沁左翼后旗", "parentId": 356, "level": 3 }, { "id": 2772, "name": "开鲁县", "parentId": 356, "level": 3 }, { "id": 2773, "name": "库伦旗", "parentId": 356, "level": 3 }, { "id": 2774, "name": "奈曼旗", "parentId": 356, "level": 3 }, { "id": 2775, "name": "扎鲁特旗", "parentId": 356, "level": 3 }, { "id": 2776, "name": "霍林郭勒市", "parentId": 356, "level": 3 }, { "id": 2777, "name": "红山区", "parentId": 357, "level": 3 }, { "id": 2778, "name": "元宝山区", "parentId": 357, "level": 3 }, { "id": 2779, "name": "松山区", "parentId": 357, "level": 3 }, { "id": 2780, "name": "阿鲁科尔沁旗", "parentId": 357, "level": 3 }, { "id": 2781, "name": "巴林左旗", "parentId": 357, "level": 3 }, { "id": 2782, "name": "巴林右旗", "parentId": 357, "level": 3 }, { "id": 2783, "name": "林西县", "parentId": 357, "level": 3 }, { "id": 2784, "name": "克什克腾旗", "parentId": 357, "level": 3 }, { "id": 2785, "name": "翁牛特旗", "parentId": 357, "level": 3 }, { "id": 2786, "name": "喀喇沁旗", "parentId": 357, "level": 3 }, { "id": 2787, "name": "宁城县", "parentId": 357, "level": 3 }, { "id": 2788, "name": "敖汉旗", "parentId": 357, "level": 3 }, { "id": 2789, "name": "东胜区", "parentId": 358, "level": 3 }, { "id": 2790, "name": "达拉特旗", "parentId": 358, "level": 3 }, { "id": 2791, "name": "准格尔旗", "parentId": 358, "level": 3 }, { "id": 2792, "name": "鄂托克前旗", "parentId": 358, "level": 3 }, { "id": 2793, "name": "鄂托克旗", "parentId": 358, "level": 3 }, { "id": 2794, "name": "杭锦旗", "parentId": 358, "level": 3 }, { "id": 2795, "name": "乌审旗", "parentId": 358, "level": 3 }, { "id": 2796, "name": "伊金霍洛旗", "parentId": 358, "level": 3 }, { "id": 2797, "name": "临河区", "parentId": 359, "level": 3 }, { "id": 2798, "name": "五原县", "parentId": 359, "level": 3 }, { "id": 2799, "name": "磴口县", "parentId": 359, "level": 3 }, { "id": 2800, "name": "乌拉特前旗", "parentId": 359, "level": 3 }, { "id": 2801, "name": "乌拉特中旗", "parentId": 359, "level": 3 }, { "id": 2802, "name": "乌拉特后旗", "parentId": 359, "level": 3 }, { "id": 2803, "name": "杭锦后旗", "parentId": 359, "level": 3 }, { "id": 2804, "name": "二连浩特市", "parentId": 360, "level": 3 }, { "id": 2805, "name": "锡林浩特市", "parentId": 360, "level": 3 }, { "id": 2806, "name": "阿巴嘎旗", "parentId": 360, "level": 3 }, { "id": 2807, "name": "苏尼特左旗", "parentId": 360, "level": 3 }, { "id": 2808, "name": "苏尼特右旗", "parentId": 360, "level": 3 }, { "id": 2809, "name": "东乌珠穆沁旗", "parentId": 360, "level": 3 }, { "id": 2810, "name": "西乌珠穆沁旗", "parentId": 360, "level": 3 }, { "id": 2811, "name": "太仆寺旗", "parentId": 360, "level": 3 }, { "id": 2812, "name": "镶黄旗", "parentId": 360, "level": 3 }, { "id": 2813, "name": "正镶白旗", "parentId": 360, "level": 3 }, { "id": 2814, "name": "正蓝旗", "parentId": 360, "level": 3 }, { "id": 2815, "name": "多伦县", "parentId": 360, "level": 3 }, { "id": 2816, "name": "乌兰浩特市", "parentId": 361, "level": 3 }, { "id": 2817, "name": "阿尔山市", "parentId": 361, "level": 3 }, { "id": 2818, "name": "科尔沁右翼前旗", "parentId": 361, "level": 3 }, { "id": 2819, "name": "科尔沁右翼中旗", "parentId": 361, "level": 3 }, { "id": 2820, "name": "扎赉特旗", "parentId": 361, "level": 3 }, { "id": 2821, "name": "突泉县", "parentId": 361, "level": 3 }, { "id": 2822, "name": "阿拉善左旗", "parentId": 362, "level": 3 }, { "id": 2823, "name": "阿拉善右旗", "parentId": 362, "level": 3 }, { "id": 2824, "name": "额济纳旗", "parentId": 362, "level": 3 }] } };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/grades', (req, res, next) => {
    const data = {
        "data": {
            hotelGrades: ['S', 'A', 'B', 'C', 'D']
        },
        "code": 0,
        "message": "操作成功",
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/pictures/tags', (req, res, next) => {
    const data = {
        "data": {
            name: ['缩略图', '海报', '剧照', '标题图', '广告图', '背景图', '频道图片', '开机图片', '介绍图片'],
        },
        "code": 0,
        "message": "操作成功",
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/pictures', (req, res, next) => {
    const items = [];
    const total = Math.random().toString().slice(-2);
    const count = req.query.limit || 10;
    const begin = 0;
    for (let i = begin; i < count; ++i) {
        items.push({
            id: `${i}`,
            pictureId: `${i}`,
            url: `https://avatars3.githubusercontent.com/u/17545551?v=3&s=40${i}`,
            resizeUrl: 'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40',
            name: `图片${i}`,
            height: 100,
            width: 400,
            md5: Math.random().toString().slice(-5),
            tags: i ? ['背景图', '剧照', '广告图'] : ['背景图', '广告图'],
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        });
    }

    const data = {
        code: 0,
        message: 'success',
        data: {
            total,
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            docs: items,
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/pictures/batchDelete', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {},
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/picture/upload', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            url: 'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40',
            md5: '786878623234',
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/pictures', (req, res, next) => {
    const i = Math.random().toString().slice(-5);
    const data = {
        code: 0,
        message: 'success',
        data: {
            id: i,
            url: 'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40',
            resizeUrl: 'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40',
            name: `图片${i}`,
            height: 100,
            width: 400,
            md5: Math.random().toString().slice(-5),
            tags: i ? ['背景图', '剧照', '广告图'] : ['背景图', '广告图'],
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        },
    };
    res.writeHead(201, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

//获取栏目列表
app.get('/shineblue/api/pictures/:id', (req, res, next) => {
    const i = Math.random().toString().slice(-5);
    const data = {
        code: 0,
        message: 'success',
        data: {
            id: `${i}`,
            url: 'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40',
            resizeUrl: 'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40',
            name: `图片${i}`,
            height: 100,
            width: 400,
            tags: i ? ['背景图', '剧照', '广告图'] : ['背景图', '广告图'],
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/pictures/:id', (req, res, next) => {
    const i = Math.random().toString().slice(-5);
    const data = {
        code: 0,
        message: 'success',
        data: {
            id: `${i}`,
            url: 'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40',
            resizeUrl: 'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40',
            name: `图片${i}`,
            height: 100,
            width: 400,
            tags: i ? ['背景图', '剧照', '广告图'] : ['背景图', '广告图'],
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/epgs', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            epgs: ['1.0', '1.2', '2.0', '2.1', '2.3']
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/column/language', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: [{
            code: 'chi',
            name: '中文',
        }, {
            code: 'en',
            name: '英文',
        }]
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/service/method', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: [{
            value: 'chi',
            name: '播放广告',
        }, {
            value: 'sd',
            name: '洗衣服',
        }, {
            value: 'news_list',
            name: '新闻',
        }]
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
})


app.post('/shineblue/api/column', (req, res, next) => {
    const url = 'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40';
    const md5 = Math.random().toString().slice(-6);
    const data = {
        code: 0,
        message: 'success',
        data: {
            columnId: Math.random().toString().slice(-6),
            name: `栏目项目`,
            language: [{
                languageType: 'chi',
                name: '酒店服务',
            }],
            style: [{
                styleName: '1.0',
                content: [{
                    languageType: 'chi',
                    highlightIcon: { url, md5 },
                    icon: { url, md5 },
                    pic: [{ url, md5 }],
                }],
            }],
            action: {
                fun: 'testFun',
                parameters: 'nice good',
            },
            isEditEnabled: false,
            isLeafNode: true,
            userId: 'sdfs',
            userName: 'zz',
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        },
    };
    res.writeHead(201, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/column/:id', (req, res, next) => {
    const url = 'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40';
    const md5 = Math.random().toString().slice(-6);
    const data = {
        code: 0,
        message: 'success',
        data: {
            columnId: req.params.id,
            name: `栏目项目`,
            language: req.body.language,
            style: [{
                styleName: '1.0',
                content: [{
                    languageType: 'chi',
                    pics: [
                        { url, md5, type: 3 },
                        { url, md5, type: 14 },
                        { url, md5, type: 15 },
                        { url, md5, type: 15 },
                    ],
                }],
            }],
            action: {
                fun: 'testFun',
                parameters: 'nice good',
            },
            isEditEnabled: false,
            isLeafNode: true,
            userId: 'sdfs',
            userName: 'zz',
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/column', (req, res, next) => {
    const items = [];
    const total = 10;
    const url = 'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40';
    const md5 = Math.random().toString().slice(-6);
    for (let i = 0; i < total; ++i) {
        items.push({
            columnId: Math.random().toString().slice(-6),
            name: `${i}栏目项目`,
            description: 'fsresf',
            language: [{
                languageType: 'chi',
                name: `${i}酒店服务`,
            }],
            style: [{
                styleName: '1.0',
                content: [{
                    languageType: 'chi',
                    pics: [
                        { url, md5, type: 3 },
                        { url, md5, type: 14 },
                        { url, md5, type: 13 },
                        { url, md5, type: 13 },
                    ],
                }],
            }],
            action: {
                fun: 'testFun',
                parameters: 'nice good',
            },
            isEditEnabled: false,
            isLeafNode: i % 2,
            userId: 'dsf',
            userName: 'zz',
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        });
    }
    const data = {
        code: 0,
        message: 'success',
        data: {
            total,
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            docs: items,
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/column/type', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: [{
            name: '电影频道',
        }]
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/column/:id', (req, res, next) => {
    const url = 'https://avatars3.githubusercontent.com/u/17545551?v=3&s=40';
    const md5 = Math.random().toString().slice(-6);
    const data = {
        code: 0,
        message: 'success',
        data: {
            columnId: req.params.id,
            name: `栏目项目`,
            description: 'adfasdfsadfdsfdas',
            language: [{
                languageType: 'chi',
                name: '酒店服务',
            }],
            style: [{
                styleName: '2.0',
                content: [{
                    languageType: 'chi',
                    pics: [
                        { url, md5, type: 3 },
                        { url, md5, type: 14 },
                        { url, md5, type: 13 },
                        { url, md5, type: 13 },
                    ],
                }],
            }, {
                styleName: '2.1',
                content: [{
                    languageType: 'en',
                    pics: [
                        { url, md5, type: 3 },
                        { url, md5, type: 14 },
                        { url, md5, type: 13 },
                        { url, md5, type: 13 },
                    ],
                }],
            }],
            action: {
                fun: 'testFun',
                parameters: 'nice good',
            },
            isEditEnabled: false,
            isLeafNode: true,
            userId: 'sdfsf',
            userName: 'zz',
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

//发布历史
app.get('/shineblue/api/columnTree/release', (req, res, next) => {
    const items = [];
    const total = 10;
    for (let i = 0; i < total; ++i) {
        items.push({
            releaseId: i,
            account: `${i}`,
            name: `栏目${i}`,
            type: `类型${i}`,
            belongEPG: `EPG${i}`,
            position: `位置${i}`,
            status: i % 2 === 0 ? 'APPROVED' : 'UNAPPROVED',
            hotel: [{ status: '' }],
            hotelStatus: [{ name: 'RELEASED', count: 3 }, { name: 'TRELEASEERROR', count: 3 }],
            updatedAt: 1493136000,
            onlineTime: 1493136000,
            offlineTime: 1493136000,
        });
    }
    const data = {
        code: 0,
        message: 'success',
        data: {
            total,
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            docs: items,
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/columnTree/release/:id', (req, res, next) => {

    const data = {

    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/column/batchDelete', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {},
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});
app.get('/shineblue/api/stars', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            stars: ['S', 'A', 'B', 'C', 'D']
        },
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

//栏目树的发布详情
app.get('/shineblue/api/columnTree/release/:releaseId', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            releaseId: '',
            name: '父级栏目get',
            onlineTime: 1493136000,
            offlineTime: 1493136000,
            targetParent: { targetParentId: '222', name: 'uuuu', language: [{ languageType: 'cn', name: '酒店服务' }] },
            column: { columnId: '222', name: '0000', language: [{ languageType: 'cn', name: '酒店服务' }], style: [{ styleName: '1.2' }, { styleName: '2.0' }] },
            position: 2,
            isColumnTree: false,
            hotels: [{
                hostId: 1,
                status: 'UNRELEASED',
            }],
            description: 'ttt',
            createdAt: 1493136000,
            status: 'RELEASED',
            hotelStatus: [{ name: 'RELEASED', count: 3 }, { name: 'TRELEASEERROR', count: 3 }],
        }
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/columnTree/release', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            releaseId: '',
            name: '父级栏目get',
            onlineTime: 1493136000,
            offlineTime: 1493136000,
            targetParentId: "1",
            columnId: '2',
            position: 2,
            isTree: false,
            hotels: [{
                hostId: 0,
            }],
            description: '',
            createAt: '2012',
        },
    };
    res.writeHead(201, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

//栏目树列表
app.get('/shineblue/api/columnTree', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            page: 1,
            limit: 15,
            total: 100,
            docs: [{
                columnTreeId: Math.random().toString().slice(-5),
                name: '树',
                style: '1.0',
                description: '没有描述',
                userId: '',
                userName: 'jw',
                createdAt: moment().unix(),
                updatedAt: moment().unix(),
                children: [{
                    columnId: Math.random().toString().slice(-5),
                    name: Math.random().toString().slice(-5),
                }],
            }],
        },
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/columnTree/batchDelete', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {},
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/columnTree', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            columnTreeId: Math.random().toString().slice(-5),
            name: req.body.name,
            style: '1.0',
            description: req.body.description,
            userId: '',
            userName: 'jw',
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
            children: [{
                columnId: Math.random().toString().slice(-5),
                name: Math.random().toString().slice(-5),
            }],
        },
    };
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

app.post('/shineblue/api/columnTree/:id', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            columnTreeId: req.params.id,
            name: req.body.name,
            style: '1.0',
            description: req.body.description,
            userId: '',
            userName: 'jw',
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
            children: [{
                columnId: Math.random().toString().slice(-5),
                name: Math.random().toString().slice(-5),
            }],

        },
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

//获取商户信息
app.get(`/shineblue/api/lifecircle/merchants/:merchantId`, (reg, res, next) => {

    const data = {
        code: 0,
        message: 'success',
        data: {
            chargetype: 0,
            category: '吃货榜',
            label: ['美食', '特色'],
            phone: ['12345678900', '0755-586523358'],
            biztime: ['工作日 08:00-22:00', '全天 10:00-12:00', '周末 12:00-14:00'],
            language: [{
                lang: 'chi',
                name: '商户XXX',
                address: {
                    province: {
                        id: 1,
                        name: '广东省',
                    },
                    city: {
                        id: 1,
                        name: '深圳市',
                    },
                    dist: {
                        id: null,
                        name: '南山区',
                    },
                    street: '深圳市南山区虚拟科技园区13栋1楼'
                },
                description: '商户描述信息',
                pictures: [{
                    type: 13,
                    url: 'http://imgsrc.baidu.com/imgad/pic/item/caef76094b36acaf0accebde76d98d1001e99ce7.jpg',
                    md5: 'xxxx',
                    name: '美食1',
                }, {
                    type: 14,
                    url: 'http://imgsrc.baidu.com/imgad/pic/item/caef76094b36acaf0accebde76d98d1001e99ce7.jpg',
                    md5: 'xxx1x',
                    name: '美食2',
                }, {
                    type: 15,
                    url: 'http://imgsrc.baidu.com/imgad/pic/item/caef76094b36acaf0accebde76d98d1001e99ce7.jpg',
                    md5: 'xxx1x',
                    name: '美食2',
                }, {
                    type: 14,
                    url: 'http://imgsrc.baidu.com/imgad/pic/item/caef76094b36acaf0accebde76d98d1001e99ce7.jpg',
                    md5: 'xxx1x',
                    name: '美食2',
                }],
                customCategory: [{
                    name: '特色美食',
                    pictures: [{
                        type: '',
                        url: 'http://imgsrc.baidu.com/imgad/pic/item/caef76094b36acaf0accebde76d98d1001e99ce7.jpg',
                        md5: '',
                        name: '美食1',
                    }],
                }, ],
                routepic: {
                    type: 13,
                    url: 'http://imgsrc.baidu.com/imgad/pic/item/caef76094b36acaf0accebde76d98d1001e99ce7.jpg',
                    md5: 'xxxx',
                    name: '美食1',
                },
                routeinfo: '公交, 地铁',
            }, ],
            status: 0, // 0: 待审核 1：已通过 2：驳回 3: 末发布 4：待上线 5：已上线 6：已下线
            upload: {
                operatorId: '上传人用户id',
                uploadTime: 1494323920, // 上传时间戳, 单位S
            },
            auditHistory: [{
                status: 1, // 审核状态, 1: 通过, 2: 驳回
                detail: '图片海报质量差', // 审核结果信息，驳回原因
                operatorId: '审核人用户id',
                auditTime: 1494323920, // 审核时间戳, 单位S
            }, ],
        }

    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});


app.get(`/shineblue/api/lifecircle/merchants?status=0`, (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            docs: [{
                id: "593e55883a593b00233c281uncheck",
                chargetype: 0,
                phone: [
                    "123456"
                ],
                biztime: [
                    "工作日 16:48-17:48"
                ],
                language: [{
                    lang: "chi",
                    name: "待审核商品名称",
                    description: "111",
                    routepic: {
                        url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891089.png",
                        md5: "864e98cb4127f108e7fcbc140729fc62",
                        id: "593e55883a593b00233c281d"
                    },
                    routeinfo: "aaa",
                    customCategory: [{
                        updatedAt: "2017-06-12T08:49:12.411Z",
                        createdAt: "2017-06-12T08:49:12.411Z",
                        name: "cat1",
                        pictures: [{
                            url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891800.png",
                            md5: "3a4082b06cd475b709837f14b6fbd2b1",
                            id: "593e55883a593b00233c2822"
                        }],
                        id: "593e55883a593b00233c2821"
                    }, {
                        updatedAt: "2017-06-12T08:49:12.411Z",
                        createdAt: "2017-06-12T08:49:12.411Z",
                        name: "cat2",
                        pictures: [{
                            url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891089.png",
                            md5: "864e98cb4127f108e7fcbc140729fc62",
                            id: "593e55883a593b00233c2820"
                        }, {
                            url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891435.png",
                            md5: "efa489b403826c06016bd10bc74a0893",
                            id: "593e55883a593b00233c281f"
                        }],
                        id: "593e55883a593b00233c281e"
                    }],
                    pictures: [{
                        url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891089.png",
                        md5: "864e98cb4127f108e7fcbc140729fc62",
                        id: "593e55883a593b00233c2824"
                    }, {
                        url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761893548.png",
                        md5: "2578141caf9ed9a216e11b1b87ba0df4",
                        id: "593e55883a593b00233c2823"
                    }],
                    address: {
                        province: "北京市",
                        city: "北京市",
                        district: "东城区",
                        street: "111"
                    },
                    id: "593e55883a593b00233c281c"
                }],
                status: 0,
                upload: {
                    uploadTime: 1497257352,
                    operatorId: "58edef3c1cd4bec8aa8eddd5"
                },
                auditHistory: [],
                category: "精选美食",
                label: [
                    "特色小吃",
                    "酒店周边"
                ]
            }],
        },

    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});


app.get(`/shineblue/api/lifecircle/merchants?status=1`, (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            docs: [{
                id: "593e55883a593b00233c281passed",
                chargetype: 0,
                phone: [
                    "123456"
                ],
                biztime: [
                    "工作日 16:48-17:48"
                ],
                language: [{
                    lang: "chi",
                    name: "待审核商品名称",
                    description: "111",
                    routepic: {
                        url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891089.png",
                        md5: "864e98cb4127f108e7fcbc140729fc62",
                        id: "593e55883a593b00233c281d"
                    },
                    routeinfo: "aaa",
                    customCategory: [{
                        updatedAt: "2017-06-12T08:49:12.411Z",
                        createdAt: "2017-06-12T08:49:12.411Z",
                        name: "cat1",
                        pictures: [{
                            url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891800.png",
                            md5: "3a4082b06cd475b709837f14b6fbd2b1",
                            id: "593e55883a593b00233c2822"
                        }],
                        id: "593e55883a593b00233c2821"
                    }, {
                        updatedAt: "2017-06-12T08:49:12.411Z",
                        createdAt: "2017-06-12T08:49:12.411Z",
                        name: "cat2",
                        pictures: [{
                            url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891089.png",
                            md5: "864e98cb4127f108e7fcbc140729fc62",
                            id: "593e55883a593b00233c2820"
                        }, {
                            url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891435.png",
                            md5: "efa489b403826c06016bd10bc74a0893",
                            id: "593e55883a593b00233c281f"
                        }],
                        id: "593e55883a593b00233c281e"
                    }],
                    pictures: [{
                        url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891089.png",
                        md5: "864e98cb4127f108e7fcbc140729fc62",
                        id: "593e55883a593b00233c2824"
                    }, {
                        url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761893548.png",
                        md5: "2578141caf9ed9a216e11b1b87ba0df4",
                        id: "593e55883a593b00233c2823"
                    }],
                    address: {
                        province: "北京市",
                        city: "北京市",
                        district: "东城区",
                        street: "111"
                    },
                    id: "593e55883a593b00233c281c"
                }],
                status: 0,
                upload: {
                    uploadTime: 1497257352,
                    operatorId: "58edef3c1cd4bec8aa8eddd5"
                },
                auditHistory: [{
                    auditTime: 1498201398,
                    operatorId: "58edef3c1cd4bec8aa8eddd5",
                    detail: "商家名称错误或不明确 ",
                    status: 2,
                    id: "594cbd36b2fee800219ef9fb"
                }, ],
                category: "精选美食",
                label: [
                    "特色小吃",
                    "酒店周边"
                ]
            }],
        },

    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

app.get(`/shineblue/api/lifecircle/merchants?status=2`, (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            docs: [{
                id: "593e55883a593b00233c281passed",
                chargetype: 0,
                phone: [
                    "123456"
                ],
                biztime: [
                    "工作日 16:48-17:48"
                ],
                language: [{
                    lang: "chi",
                    name: "待审核商品名称",
                    description: "111",
                    routepic: {
                        url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891089.png",
                        md5: "864e98cb4127f108e7fcbc140729fc62",
                        id: "593e55883a593b00233c281d"
                    },
                    routeinfo: "aaa",
                    customCategory: [{
                        updatedAt: "2017-06-12T08:49:12.411Z",
                        createdAt: "2017-06-12T08:49:12.411Z",
                        name: "cat1",
                        pictures: [{
                            url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891800.png",
                            md5: "3a4082b06cd475b709837f14b6fbd2b1",
                            id: "593e55883a593b00233c2822"
                        }],
                        id: "593e55883a593b00233c2821"
                    }, {
                        updatedAt: "2017-06-12T08:49:12.411Z",
                        createdAt: "2017-06-12T08:49:12.411Z",
                        name: "cat2",
                        pictures: [{
                            url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891089.png",
                            md5: "864e98cb4127f108e7fcbc140729fc62",
                            id: "593e55883a593b00233c2820"
                        }, {
                            url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891435.png",
                            md5: "efa489b403826c06016bd10bc74a0893",
                            id: "593e55883a593b00233c281f"
                        }],
                        id: "593e55883a593b00233c281e"
                    }],
                    pictures: [{
                        url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891089.png",
                        md5: "864e98cb4127f108e7fcbc140729fc62",
                        id: "593e55883a593b00233c2824"
                    }, {
                        url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761893548.png",
                        md5: "2578141caf9ed9a216e11b1b87ba0df4",
                        id: "593e55883a593b00233c2823"
                    }],
                    address: {
                        province: "北京市",
                        city: "北京市",
                        district: "东城区",
                        street: "111"
                    },
                    id: "593e55883a593b00233c281c"
                }],
                status: 0,
                upload: {
                    uploadTime: 1497257352,
                    operatorId: "58edef3c1cd4bec8aa8eddd5"
                },
                auditHistory: [{
                    auditTime: 1498201398,
                    operatorId: "58edef3c1cd4bec8aa8eddd5",
                    detail: "商家名称错误或不明确 ",
                    status: 2,
                    id: "594cbd36b2fee800219ef9fb"
                }, ],
                category: "精选美食",
                label: [
                    "特色小吃",
                    "酒店周边"
                ]
            }],
        },

    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

//创建商户信息
app.post('/shineblue/api/lifecircle/merchants', (req, res, next) => {
    const data = {
        code: 0,
        message: 'SUCCESS',
        data: {
            id: '58f572bbc76d5f0022b3d764',
            chargetype: '0',
            category: '吃货榜',
            label: ['美食', '特色'],
            phone: ['12345678900', '0755-28767787'],
            biztime: ['工作日 08:00 - 22:00', '全天 08:00 - 12:00', '周末 9:00 - 14:00', '全天 18:00 - 21:00'],
            language: [{
                lang: 'chi',
                name: '商户XXX',
                address: {
                    province: {
                        id: 1,
                        name: '广东省',
                    },
                    city: {
                        id: 1,
                        name: '深圳市',
                    },
                    dist: {
                        id: 1,
                        name: '南山区',
                    },
                    street: '深圳市南山区虚拟科技园区13栋1楼'
                },
                description: '商户描述信息',
                pictures: [{
                    type: 24, // 图片类型:24: logo 25:大横版海报, 26:小横版海报, 27:二维码
                    url: 'http://xxx/uploads/shineblue/file-1492078426470.jpg',
                    md5: 'xxxx',
                    name: '美食1',
                }, {
                    type: 25,
                    url: 'http://xxx/uploads/shineblue/file-1492078426471.jpg',
                    md5: 'xxx1x',
                    name: '美食2',
                }],
                customCategory: [{
                    name: '特色美食',
                    pictures: [{
                        type: '',
                        url: 'http://xxx/uploads/shineblue/file-1492078426470.jpg',
                        md5: '',
                        name: '美食1',
                    }],
                }, ],
                routepic: {
                    type: 28, // 图片类型 28:地图
                    url: 'http://xxx/uploads/shineblue/file-1492078426470.jpg',
                    md5: 'xxxx',
                    name: '美食1',
                },
                routeinfo: '公交, 地铁',
            }, ],
            status: 0, // 0: 待审核 1：已通过 2：驳回 3: 末发布 4：待上线 5：已上线 6：已下线
            upload: {
                operatorId: '上传人用户id',
                uploadTime: 1494323920, // 上传时间戳, 单位S
            },
            auditHistory: [{
                status: 1, // 审核状态, 1: 通过, 2: 驳回
                detail: '', // 审核结果信息，驳回原因
                operatorId: '审核人用户id',
                auditTime: 1494323920, // 审核时间戳, 单位S
            }, ],
        }
    }
    res.writeHead(201, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get(`/shineblue/api/lifecircle/merchants`, (reg, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            docs: [{
                id: "593e55883a593b00233c281b",
                chargetype: 0,
                phone: [
                    "123456"
                ],
                biztime: [
                    "工作日 16:48-17:48"
                ],
                language: [{
                    lang: "chi",
                    name: "aaa",
                    description: "111",
                    routepic: {
                        url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891089.png",
                        md5: "864e98cb4127f108e7fcbc140729fc62",
                        id: "593e55883a593b00233c281d"
                    },
                    routeinfo: "aaa",
                    customCategory: [{
                        updatedAt: "2017-06-12T08:49:12.411Z",
                        createdAt: "2017-06-12T08:49:12.411Z",
                        name: "cat1",
                        pictures: [{
                            url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891800.png",
                            md5: "3a4082b06cd475b709837f14b6fbd2b1",
                            id: "593e55883a593b00233c2822"
                        }],
                        id: "593e55883a593b00233c2821"
                    }, {
                        updatedAt: "2017-06-12T08:49:12.411Z",
                        createdAt: "2017-06-12T08:49:12.411Z",
                        name: "cat2",
                        pictures: [{
                            url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891089.png",
                            md5: "864e98cb4127f108e7fcbc140729fc62",
                            id: "593e55883a593b00233c2820"
                        }, {
                            url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891435.png",
                            md5: "efa489b403826c06016bd10bc74a0893",
                            id: "593e55883a593b00233c281f"
                        }],
                        id: "593e55883a593b00233c281e"
                    }],
                    pictures: [{
                        url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761891089.png",
                        md5: "864e98cb4127f108e7fcbc140729fc62",
                        id: "593e55883a593b00233c2824"
                    }, {
                        url: "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1495761893548.png",
                        md5: "2578141caf9ed9a216e11b1b87ba0df4",
                        id: "593e55883a593b00233c2823"
                    }],
                    address: {
                        province: {
                            id: 1,
                            name: '广东省',
                        },
                        city: {
                            id: 1,
                            name: '深圳市',
                        },
                        dist: {
                            id: 1,
                            name: '南山区',
                        },
                        street: '深圳市南山区虚拟科技园区13栋1楼'
                    },
                    id: "593e55883a593b00233c281c"
                }],
                status: 0,
                upload: {
                    uploadTime: 1497257352,
                    operatorId: "58edef3c1cd4bec8aa8eddd5"
                },
                auditHistory: [],
                category: "精选美食",
                label: [
                    "特色小吃",
                    "酒店周边"
                ]
            }],
        },

    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});


//查询商户的最新发布信息
app.get(`/shineblue/api/lifecircle/release/merchant`, (reg, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            docs: [{
                "releaseId": "594a28d62e7af30023d744ba",
                "merchantId": "594386e50b369d0021e2f5ab",
                "merchantName": "UUU",
                "onlineTime": 1498032247,
                "offlineTime": 1498032247,
                "city": {
                    "name": "北京市",
                    "id": 1
                },
                "province": {
                    "name": "北京市",
                    "id": 1
                },
                "category": "精选美食",
                "merchantType": 0,
                "sumOfHotels": 0,
                "status": 5
            }, {
                "merchantId": "594c8e57c80b1800238835bd",
                "merchantName": "test1",
                "city": {
                    "name": "北京市",
                    "id": 1
                },
                "province": {
                    "name": "北京市",
                    "id": 1
                },
                "category": "精选美食",
                "merchantType": 0,
                "sumOfHotels": 0,
                "status": 3
            }],
        },

    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});


//获取商户发布的日志信息
app.get(`/shineblue/api/lifecircle/release/log`, (reg, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            docs: [{
                logId: '58f572bbc76d5f0022b3d764',
                operatingTime: 1494323920,
                userName: '张三三',
                modification: ['HOTELS', 'TIME'],
                merchantId: '58f572bbc76d5f0022b3d764',
                merchantName: '赖恩堡国际酒庄',
                category: '吃货榜',
                tags: ['特色', '餐饮'],
                onlineTime: 1494323920,
                offlineTime: 1494323920,
                hotels: [{
                    hostId: 600,
                    hotelName: '深圳景田酒店',
                    hotelAddress: '深圳市南山区高科技三道18号1楼',
                    posOfList: 1,
                    posOfPicture: 1,
                    posOfMenu: 2,
                    editType: 'DELETED',
                }, ]
            }],
        },

    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});


//获取指定发布的日志详情
app.get(`/shineblue/api/lifecircle/release/log/:logId`, (reg, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            logId: '58f572bbc76d5f0022b3d764',
            operatingTime: 1494323920,
            userName: '张三',
            modification: ['HOTELS', 'TIME'],
            merchantId: '58f572bbc76d5f0022b3d764',
            merchantName: '赖恩堡国际酒庄',
            category: '吃货榜',
            tags: ['特色', '餐饮'],
            onlineTime: 1494323920,
            offlineTime: 1494323920,
            hotels: [{
                hostId: 600,
                hotelName: '深圳景田酒店',
                hotelAddress: '深圳市南山区高科技三道18号1楼',
                posOfList: 1,
                posOfPicture: 1,
                posOfMenu: 2,
                editType: 'DELETED',
            }, {
                hostId: 800,
                hotelName: '深圳景田酒店',
                hotelAddress: '深圳市南山区高科技三道18号1楼',
                posOfList: 1,
                posOfPicture: 1,
                posOfMenu: 2,
                editType: 'DELETED',
            }, ]

        },

    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

//查询酒店的商户发布信息
app.get(`/shineblue/api/lifecircle/release/hotel`, (reg, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            docs: [{
                hostId: 600,
                hotelName: '深圳景田酒店',
                province: '广东省',
                city: '深圳市',
                address: '深圳市南山区高科技三道18号1楼',
                grade: 'S级',
                sumOfMerchants: 20,
                merchants: [{
                    merchantId: '58f572bbc76d5f0022b3d764',
                    merchantName: '新元素餐厅(丽都店)',
                    merchantAddress: '深圳市南山区高科技三道18号1楼',
                    tags: ['特色', '餐饮'],
                    onlineTime: 1494323920,
                    offlineTime: 1494323920,
                    posOfList: 1,
                    posOfPicture: 1,
                    posOfMenu: 2,
                    status: 4,
                }, ]
            }],
        },

    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

//查询指定酒店的商户发布信息
app.get('/shineblue/api/lifecircle/release/hotel/:hostId', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            hostId: '',
            hotelName: '深圳景田酒店',
            province: '广东省',
            city: '深圳市',
            address: '深圳市南山区高科技三道18号1楼',
            grade: 'S级',
            sumOfMerchants: 20,
            merchants: [{
                merchantId: '58f572bbc76d5f0022b3d764',
                merchantName: '新元素餐厅(丽都店)',
                merchantAddress: '深圳市南山区高科技三道18号1楼',
                tags: ['特色', '餐饮'],
                onlineTime: 1494323920,
                offlineTime: 1494323920,
                posOfList: 1,
                posOfPicture: 1,
                posOfMenu: 2,
                status: 4,
            }, {
                merchantId: '58f572bbc76d5f0022b3d765',
                merchantName: '新元素餐厅(丽都店)',
                merchantAddress: '深圳市南山区高科技三道18号2楼',
                tags: ['高端', '餐饮'],
                onlineTime: 1494323920,
                offlineTime: 1494323920,
                posOfList: 1,
                posOfPicture: 1,
                posOfMenu: 2,
                status: 4,
            }, ]
        }
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});


//获取商户分类列表
app.get('/shineblue/api/lifecircle/category', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            docs: [{
                id: 1112,
                name: '吃货榜',
                childs: [{
                    id: 1111,
                    name: '美食'
                }, {
                    id: 1111,
                    name: '特色'
                }, ],
            }, {
                id: 444,
                name: '出游榜',
                childs: [{
                    id: 222,
                    name: '深圳大梅沙'
                }, {
                    id: 222,
                    name: '厦门'
                }, ],
            }, ]
        },
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

app.get('/shineblue/api/columnTree/:id', (req, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        data: {
            columnTreeId: req.params.id,
            name: '树',
            style: '1.0',
            description: '没有描述',
            userId: '',
            userName: 'jw',
            children: [{
                columnId: Math.random().toString().slice(-5),
                name: Math.random().toString().slice(-5),
            }],
            createdAt: moment().unix(),
            updatedAt: moment().unix(),
        },
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});

//查询指定商户的发布信息
app.get(`/shineblue/api/lifecircle/release/:releaseId`, (reg, res, next) => {
    const data = {
        code: 0,
        message: 'success',
        "data": {
            "merchantId": "59507aaa35b0220022c3735e",
            "offlineTime": 1498793620,
            "onlineTime": 1498448008,
            "hotels": [{
                "hostId": 0,
                "posOfList": 2,
                "posOfPicture": 0,
                "posOfMenu": 0,
                "hotelName": "TTT",
                "hotelAddress": "fds"
            }, {
                "hostId": 6,
                "posOfList": 2,
                "posOfPicture": 0,
                "posOfMenu": 0,
                "hotelName": "不搜了",
                "hotelAddress": "山东"
            }, {
                "hostId": 109998,
                "posOfList": 2,
                "posOfPicture": 0,
                "posOfMenu": 0,
                "hotelName": "酒店665",
                "hotelAddress": "fdsfds"
            }],
            "releaseId": "5950be4bd0709d002218f076",
            "sumOfHotels": 3,
            "tag": [
                "必游景点",
                "一日观光团"
            ],
            "releaseId": "595080d6acb3ad0024f55e82",
            "sumOfHotels": 0,
            "tag": [
                "购物广场",
                "便利生活"
            ],
            "category": "购物攻略",
            "merchantType": 0,
            "merchantName": "001",
            "province": {
                "name": "天津市",
                "id": 2
            },
            "city": {
                "name": "天津市",
                "id": 2
            },
            "merchant": {
                "id": "59507aaa35b0220022c3735e",
                "chargetype": 0,
                "phone": [
                    "122132132"
                ],
                "biztime": [
                    "周末 11:06-12:06"
                ],
                "language": [{
                    "lang": "chi",
                    "name": "001",
                    "address": {
                        "street": "dfsfds",
                        "dist": {
                            "id": 21,
                            "name": "河西区"
                        },
                        "city": {
                            "id": 2,
                            "name": "天津市"
                        },
                        "province": {
                            "id": 2,
                            "name": "天津市"
                        },
                        "id": "59507aaa35b0220022c37368"
                    },
                    "description": "1231",
                    "routepic": {
                        "name": "911--407",
                        "url": "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1498113794750.jpg",
                        "md5": "DB93C47AC875713DD364248DADAB1388",
                        "type": 28,
                        "id": "59507aaa35b0220022c37360"
                    },
                    "routeinfo": "fdsfds",
                    "customCategory": [{
                        "updatedAt": "2017-06-26T03:08:26.483Z",
                        "createdAt": "2017-06-26T03:08:26.483Z",
                        "name": "fdsfdsf",
                        "pictures": [{
                            "name": "274--206",
                            "url": "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1498033033662.jpg",
                            "md5": "828F2F168B31939ADDAE269D081FFAFB",
                            "id": "59507aaa35b0220022c37362"
                        }],
                        "id": "59507aaa35b0220022c37361"
                    }],
                    "pictures": [{
                        "name": "274--432",
                        "url": "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1497852329829.jpg",
                        "md5": "A0D46DA618B0E9BDEA5B4D5C712A79AF",
                        "type": 29,
                        "id": "59507aaa35b0220022c37367"
                    }, {
                        "name": "274--206",
                        "url": "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1498033033662.jpg",
                        "md5": "828F2F168B31939ADDAE269D081FFAFB",
                        "type": 26,
                        "id": "59507aaa35b0220022c37366"
                    }, {
                        "name": "324--343",
                        "url": "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1498033109583.jpg",
                        "md5": "594BDC54F1E1CF93233BC106764F186D",
                        "type": 27,
                        "id": "59507aaa35b0220022c37365"
                    }, {
                        "name": "109--109",
                        "url": "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1498033156821.jpg",
                        "md5": "4B1C87829EC9DFB955E6562AF6A4616A",
                        "type": 24,
                        "id": "59507aaa35b0220022c37364"
                    }, {
                        "name": "430--280",
                        "url": "http://ias.oss-cn-hangzhou.aliyuncs.com/uploads/shineblue/file-1498113777698.jpg",
                        "md5": "6DC55938AF40F70C566646EE03F47B87",
                        "type": 25,
                        "id": "59507aaa35b0220022c37363"
                    }],
                    "id": "59507aaa35b0220022c3735f"
                }],
                "status": 5,
                "upload": {
                    "operatorId": "58edef3c1cd4bec8aa8eddd5",
                    "uploadTime": 1498446506
                },
                "auditHistory": [{
                    "auditTime": 1498447990,
                    "operatorId": "58edef3c1cd4bec8aa8eddd5",
                    "status": 1,
                    "id": "59508076acb3ad0024f55e6a"
                }],
                "offlineTime": 1498793620,
                "onlineTime": 1498448008,
                "category": "购物攻略",
                "label": [
                    "购物广场",
                    "便利生活"
                ]
            }
        }

    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(data));
    res.end();
});


//更新商户信息
app.post('/shineblue/api/lifecircle/merchants/:id', (req, res, next) => {
    const data = {
        code: 0,
        message: 'SUCCESS',
        data: {
            id: '58f572bbc76d5f0022b3d764',
            chargetype: '0',
            category: '吃货榜',
            label: ['美食', '特色'],
            phone: ['12345678900', '0755-28767787'],
            biztime: ['工作日 08:00 - 22:00', '全天 08:00 - 12:00', '周末 9:00 - 14:00', '全天 18:00 - 21:00'],
            language: [{
                lang: 'chi',
                name: '商户XXX',
                address: {
                    province: {
                        id: 1,
                        name: '广东省',
                    },
                    city: {
                        id: 1,
                        name: '深圳市',
                    },
                    dist: {
                        id: 1,
                        name: '南山区',
                    },
                    street: '深圳市南山区虚拟科技园区13栋1楼'
                },
                description: '商户描述信息',
                pictures: [{
                    type: 24, // 图片类型:24: logo 25:大横版海报, 26:小横版海报, 27:二维码
                    url: 'http://xxx/uploads/shineblue/file-1492078426470.jpg',
                    md5: 'xxxx',
                    name: '美食1',
                }, {
                    type: 25,
                    url: 'http://xxx/uploads/shineblue/file-1492078426471.jpg',
                    md5: 'xxx1x',
                    name: '美食2',
                }],
                customCategory: [{
                    name: '特色美食',
                    pictures: [{
                        type: '',
                        url: 'http://xxx/uploads/shineblue/file-1492078426470.jpg',
                        md5: '',
                        name: '美食1',
                    }],
                }, ],
                routepic: {
                    type: 28, // 图片类型 28:地图
                    url: 'http://xxx/uploads/shineblue/file-1492078426470.jpg',
                    md5: 'xxxx',
                    name: '美食1',
                },
                routeinfo: '公交, 地铁',
            }, ],
            status: 0, // 0: 待审核 1：已通过 2：驳回 3: 末发布 4：待上线 5：已上线 6：已下线
            upload: {
                operatorId: '上传人用户id',
                uploadTime: 1494323920, // 上传时间戳, 单位S
            },
            auditHistory: [{
                status: 1, // 审核状态, 1: 通过, 2: 驳回
                detail: '', // 审核结果信息，驳回原因
                operatorId: '审核人用户id',
                auditTime: 1494323920, // 审核时间戳, 单位S
            }, ],
        }
    }
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

//发布商户信息
app.post('/shineblue/api/lifecircle/release', (req, res, next) => {
    const data = {
        code: 0,
        message: 'SUCCESS',
        data: {}
    }
    res.writeHead(201, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

//更新商户发布信息
app.post('/shineblue/api/lifecircle/release/:releaseId', (req, res, next) => {
    const data = {
        code: 0,
        message: 'SUCCESS',
        data: {}
    }
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});

//修改单个商户状态
app.post('/shineblue/api/lifecircle/merchants/:id/status', (req, res, next) => {
    const data = {
        code: 0,
        message: 'SUCCESS',
        data: {}
    }
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();
});



//删除商户信息
app.delete('/shineblue/api/lifecircle/merchants/:id', (req, res, next) => {
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




router.delete('/test', function(req, res, next) {
    const data = {
        code: 0,
        message: 'success',
    };
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end();
});


app.use('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(`${compiler.outputPath}index.html`,
        (err, rst) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.end(rst);
        });
});

app.listen(3001, () => {
    console.log('listen 3001');
});
