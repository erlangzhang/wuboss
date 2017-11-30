import moment from 'moment';

export default function (app) {

    /**
     * 获取影片列表
     */
    app.get('/shineblue/api/media/films', (req, res, next) => {
        const items = [];
        const total = 10;
        for (let i = 0; i < total; ++i) {
            items.push({
                "id": `${i}`,
                "globalId": `99${i}`,
                "name": `美人鱼${i}`,
                "duration": 1280,
                "fileSize": 2560,
                "createdAt": 1494323920,
                "status": 1,  // 0：待入库 1：待审核 2：审核通过 3：审核1 4：审核2 5：驳回 6：上线 7：下线 8：待上线
                "price": 30,
                "isfree": 0, // 0:付费，1:免费
                "caflag": 0, // 是否监管 0:否 1:是
                "sequence": `${i}`, // 排序
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
     * 删除影片
     */
    app.post('/shineblue/api/media/films/batchDelete', (req, res, next) => {
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
     * 获取专题列表
     */
    app.get('/shineblue/api/media/subjects', (req, res, next) => {
        const items = [];
        const total = 10;
        for (let i = 0; i < total; ++i) {
            items.push({
                "id": `${i}`,
                "globalId": `99${i}`,
                "language": [{
                        langCode: 'chi',
                        name: '六一专题',
                        description: '欢庆六一',
                        pics: [{
                            type: 11,
                            name: '',
                            md5: '',
                            url: '',
                        }],
                    },{
                        langCode: 'chi',
                        name: '六一专题',
                        description: '欢庆六一',
                        pics: [{
                            type: 11,
                            name: '',
                            md5: '',
                            url: '',
                        }],
                    }
                ],
                "films": [{
                        filmId: '58f572bbc76d5f0022b3d764',
                        filmName: '泰坦尼克号',
                        vodrank: 1,
                        status: 3,
                        isfree: 0,
                    },{
                        filmId: '58f572bbc76d5f0022b3d764',
                        filmName: '泰坦尼克号',
                        vodrank: 1,
                        status: 3,
                        isfree: 0,
                    }
                ],
                "operatorInfo": {
                    langs: ['chi'],
                    isfree: 0,
                },
                "status": 0,
                "upload": {
                    operatorId: '',
                    operatorName: '张三',
                    uploadTime: 1494323920,
                },
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
     * 删除专题
     */
    app.delete('/shineblue/api/media/subjects/:id', (req, res, next) => {
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