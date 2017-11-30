import moment from 'moment';

export default function (app) {

    /**
     * 获取vod首页发布信息列表
     */
    app.get('/shineblue/api/vod/portalconf', (req, res, next) => {
        const items = [];
        const total = 10;
        for (let i = 0; i < total; ++i) {
            items.push({
                "id": `${i}`,
                "name": `发布名称${i}`,
                hotels: [{}, {}, {}],
                "updatedAt": moment().unix(),
                operatorName: `操作人${i}`
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
     * 获取以酒店维度发布信息列表
     */
    app.get('/shineblue/api/vod/hotelportal', (req, res, next) => {
        const items = [];
        const total = 10;
        for (let i = 0; i < total; ++i) {
            items.push({
                "hostid": `${i}`,
                "hotelName": `发布名称${i}`,
                cityName: `城市${i}`,
                hotelGrade: 'S',
                recommendcount: `${i}`,
                "updatedAt": moment().unix(),
                operatorName: `操作人${i}`
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
     * 获取vod首页发布信息log
     */
    app.get('/shineblue/api/vod/portalconf/log', (req, res, next) => {
        const items = [];
        const total = 10;
        for (let i = 0; i < total; ++i) {
            items.push({
                "id": `${i}`,
                "name": `发布名称${i}`,
                hotels: [{hostid: 123, hotelName: "深圳福田大酒店"}, {hostid: 124, hotelName: "深圳南山大酒店"}, {hostid: 125, hotelName: "深圳罗湖大酒店"}],
                "updatedAt": moment().unix(),
                operatorName: `操作人${i}`
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

}