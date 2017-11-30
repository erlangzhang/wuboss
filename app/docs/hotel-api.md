#云Boss平台 酒店管理文档1.0

版本:V1.0.0

更新日期:2017-07-25

##1.接口说明
```
1.接口采用HTTP GET 、POST 请求交互方式进行
```

##  <span id = "main">======API目录=======</span>

|接口|方法|描述|
|:---|:---|:---|
|[/app/api/login/captcha](#/login/captcha)|get|获取登录验证码|
|[/app/api/login](#/login)|post|用户登录|
|[/app/api/logout](#/logout)|post|用户退出|
|[/app/api/areas/](#/areas)|get|获取省市区数据|
|[/app/api/agencys/](#/agencys)|get|获取所属办事处列表|
|[/app/api/epgs/](#/epgs)|get|获取epg版本列表|
|[/app/api/grades](#/grades)|get|获取酒店等级列表|
|[/app/api/hotel/dataSource/](#/dataSource)|get|获取酒店系统数据源|
|[/app/api/hotels](#/hotel/list)|get|酒店列表|
|[/app/api/hotels/:id](#/hotel/detail/:id)|get|酒店详情|
|[/app/api/hotels](#/hotel/create)|post|新增酒店|
|[/app/api/hotels/:id](#/hotel/edit)|post|编辑酒店|
|[/app/api/hotelStatus](#/hotel/updateStatus)|post|更新酒店状态|
|[/app/api/hotel/groups](#/hotel/group/list)|get|获取酒店分组列表|
|[/app/api/hotel/groups/:id](#/hotel/group/detail/:id)|get|获取酒店分组信息|
|[/app/api/hotel/groups](#/hotel/group/create)|post|新增酒店分组|
|[/app/api/hotel/groups/:id](#/hotel/group/edit)|post|编辑酒店分组|
|[/app/api/hotel/groupStatus](#/hotel/group/updateStatus)|post|更新酒店分组状态|


## 一.酒店管理接口

### <span id="/login/captcha">/app/api/login/captcha</span>
####  [返回目录](#main)
**接口说明**

```
获取登录验证码
请求方式： get
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|

**返回结果**

|参数名称|类型|是否必填|说明|
|---|---|---|---|

```
body返回图片二进制数据
```

### <span id="/login">/app/api/login</span>
####   [返回目录](#main)
**接口说明**

```
用户登录
请求方式： post
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|
|userName|string|y|用户邮箱|
|userPwd|string|y|用户密码|
|captcha|string|y|验证码|

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|
|token|string|y|授权token|
|user|json|y|用户信息|

```
{
  "data": {
     token: '121231313',
     user: {
        id: '',
        account: '',
        name: '',
        department: '',
        telephone: '',
        status: 1,
        lastLoginTime: '',
        lastLoginIP: '',
        type: 9999,
        roles: [],
        hotels: [],
        AllowActions: [], //用户权限
     }
   },
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/logout">/app/api/logout</span>
####   [返回目录](#main)
**接口说明**

```
用户退出
请求方式： post
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|

```
{
  "data": {},
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/areas">/app/api/areas</span>
####   [返回目录](#main)
**接口说明**

```
获取省市区数据
请求方式： get
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|
|province|array|y|省份数组|
|city|array|y|城市数组|
|county|array|y|地区数组|

```
{
  "data": {
    province: [
      {
          "id": 1,
          "name": "北京市",
          "level": 1,
      }, {
          "id": 2,
          "name": "天津市",
          "level": 1,
      }, {
          "id": 3,
          "name": "河北省",
          "level": 1,
      }
    ],
    city: [
      {
          "id": 1,
          "name": "北京市",
          "parentId": 1,
          "level": 2,
      }, {
          "id": 2,
          "name": "天津市",
          "parentId": 2,
          "level": 2,
      }, {
          "id": 3,
          "name": "上海市",
          "parentId": 9,
          "level": 2
      },
    ],
    county: [
      {
          "id": 1,
          "name": "东城区",
          "parentId": 3,
          "level": 3,
      }, {
          "id": 2,
          "name": "西城区",
          "parentId": 1,
          "level": 3
      }, {
          "id": 3,
          "name": "崇文区",
          "parentId": 1,
          "level": 3
      },
    ]
  },
  "code": 0,
  "message": "操作成功",
}
```


### <span id="/agencys">/app/api/agencys</span>
####   [返回目录](#main)
**接口说明**

```
获取所属办事处列表
请求方式： get
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|
|agencys|array|y|办事处数组|

```
{
  "data": {
    agencys: ['深圳', '珠海', '广州', '三亚', '厦门', '成都', '重庆', '长沙', 
    '武汉', '沈阳', '长春', '郑州', '背景', '上海', '南京', '青岛']
  },
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/epgs">/app/api/epgs</span>
####   [返回目录](#main)
**接口说明**

```
获取酒店epg版本列表
请求方式： get
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|
|epgs|array|y|epg数组|

```
{
  "data": {
    epgs: [ '1.2', '2.0', '2.1', '2.3' ]
  },
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/grades">/app/api/grades</span>
####   [返回目录](#main)
**接口说明**

```
获取酒店等级列表
请求方式： get
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|
|hotelGrades|array|y|酒店等级数组|

```
{
  "data": {
    hotelGrades: [ 'S', 'A', 'B', 'C', 'D' ]
  },
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/dataSource">/app/api/hotel/dataSource</span>
####   [返回目录](#main)
**接口说明**

```
获取酒店系统数据源
请求方式： get
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|
|agencys|array|y|酒店办事处数组|
|epgs|array|y|酒店epg数组|
|hotelGrades|array|y|酒店等级数组|
|stars|array|y|酒店星级json|
|ctripStars|array|y|携程星级json|

```
{
  "data": {
      agencys:
      [ '深圳',
        '珠海',
        '广州',
        '三亚',
        '厦门',
        '成都',
        '重庆',
        '长沙',
        '武汉',
        '沈阳',
        '长春',
        '郑州',
        '北京',
        '上海',
        '南京',
        '青岛' ],
      epgs: [ '1.2', '2.0', '2.1', '2.3' ],
      hotelGrades: [ 'S', 'A', 'B', 'C', 'D' ],
      stars: { '3': '三星', '4': '四星', '5': '五星', '6': '超五星', '10': '外贸' },
      ctripStars: { '2': '二星级及以下/经济', '3': '三星级/舒适', '4': '四星级/高档', '5': '超五星级/豪华' }
  },
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/hotel/list">/app/api/hotels</span>
####   [返回目录](#main)
**接口说明**

```
获取酒店列表
请求方式：get
```
**请求参数**

|参数名称|类型|是否必填|说明|示例|
|---|---|---|---|---|
|page|number|N|当前页<br><font color=green>default: 1</font>|1|
|limit|number|N|每页条数<br><font color=green>default: 15</font>|15|
|sort|string|n|排序字段|name|
|search|string|n|搜索条件(酒店名称,办事处)|
|hostIds|string|n|酒店hostIds(多个id用,号连接，如：‘111，222，333’)
|province|number|n|省份id|
|citys|string|n|城市id(多个id用,号连接，如：'2,3,4,12')|
|agency|string|n|所属办事处|
|epg|string|n|epg版本|
|hotelGrade|string|n|酒店等级|
|hotelType|int|n|酒店类型(0:单体，1：集团, 2:运营商)|
|status|int|n|酒店状态(0:禁用，1：正常)|

**返回结果说明**

|参数名称|类型|是否必填|默认|说明|  
|---|---|---|---|---|  
|id|int|y||酒店_id|
|hostId|int|y||酒店hostid|  
|name|string|y||酒店名称|
|hotelType|int|y|0|酒店类型(0:单体，1：集团, 2:运营商), 默认为0|
|stars|Number|y|0|酒店星级|
|ctripStars|Number|y|0|携程星级|
|contactName|string|y||联系人|
|phoneNumber|string|y||电话号码|
|roomsCount|int|y||房间数量|
|detailAddress|string|y||详细地址|
|description|string|y||描述信息|
|longitude|float|y|0.0|经度|
|latitude|float|y|0.0|纬度|
|province|int|y||省|
|city|int|y||市|
|county|int|y||县/区|
|pmsManufacturer|string|y||厂商|
|projectNum|string|y||立项号|
|contractNo|string|y||合同编号|
|contractName|string|y||合同名称
|enableUwifi|int|y|0|是否开通wifi(0:未开通, 1:开通)|
|enableHms|int|y|0|是否开通hms(0:未开通， 1：开通)
|agency|string|y||所属办事处|
|hotelGrade|string|y||酒店等级|
|sales|string|y||销售员|
|epgVersion|string|y||epg版本|
|tags|array|y||酒店标签|
|status|int|y|1|酒店状态(0:禁用， 1：正常)|
|createdAt|int|y||创建时间|
|updatedAt|int|y||更新时间|

```
{
  "data": {
     	total: 10,
      limit: 15,
      page: 1,
      pages: 1,
      docs: {
        [
          "id": '',
          "hostId": 123,
          "name": "酒店名称"，
          “hotelType”：，
          “stars”:,
          "ctripStars":,
          "roomsCount":,
          "detailAddress":,
          "contactName":,
          "phoneNumber":,
          "description":,
          "longitude":,
          "latitude":,
          "province":,
          "city":,
          "county":,
          "pmsManufacturer":,
          "projectNum":,
          "contractNo":,
          "contractName":,
          "enableUwifi":,
          "enableHms":,
          "agency":,
          "hotelGrade":,
          "sales":,
          "epgVersion": '',
          "tags":
          "createdAt":,
          "updatedAt":,
        ]
      }
   },
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/hotel/detail/:id">5./app/api/hotels/:id</span>
####   [返回目录](#main)
**接口说明**

```
获取酒店详情
请求方式: get
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|


**返回结果说明**  

|参数名称|类型|是否必填|默认|说明|   
|---|---|---|---|    
|id|string|y||酒店id|    
|hostId|int|y||酒店hostid|  
|name|string|y||酒店名称|
|hotelType|int|y|0|酒店类型(0:单体，1：集团, 2:运营商), 默认为0|
|stars|Number|y|0|酒店星级|
|ctripStars|Number|y|0|携程星级|
|contactName|string|y||联系人|
|phoneNumber|string|y||电话号码|
|roomsCount|int|y||房间数量|
|detailAddress|string|y||详细地址|
|description|string|y||描述信息|
|longitude|float|y|0.0|经度|
|latitude|float|y|0.0|纬度|
|province|int|y||省id|
|city|int|y||市id|
|county|int|y||县/区id|
|pmsManufacturer|string|y||厂商|
|projectNum|string|y||立项号|
|contractNo|string|y||合同编号|
|contractName|string|y||合同名称
|enableUwifi|int|y|0|是否开通wifi(0:未开通, 1:开通)|
|enableHms|int|y|0|是否开通hms(0:未开通， 1：开通)
|agency|string|y||所属办事处|
|hotelGrade|string|y||酒店等级|
|sales|string|y||销售员|
|epgVersion|string|y||epg版本|
|tags|array|y||酒店标签|
|status|int|y|1|酒店状态(0:禁用， 1：正常)|
|createdAt|int|y||创建时间|
|updatedAt|int|y||更新时间|

```
{
  "data": {
      "id": "3053859fsxxllsl"
      "hostId": 123,
      "name": "酒店名称"，
      “hotelType”：，
      “stars”:,
      "ctripStars":,
      "roomsCount":,
      "detailAddress":,
      "contactName":,
      "phoneNumber":,
      "description":,
      "longitude":,
      "latitude":,
      "province":,
      "city":,
      "county":,
      "pmsManufacturer":,
      "projectNum":,
      "contractNo":,
      "contractName":,
      "enableUwifi":,
      "enableHms":,
      "agency":,
      "hotelGrade":,
      "sales":,
      "epgVersion": '',
      "tags":
      "createdAt":,
      "updatedAt":,
   },
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/hotel/create">6./app/api/hotels</span>
####   [返回目录](#main)
**接口说明**

```
新增酒店
请求方式: post
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|
|hostId|int|y|酒店hostid|  
|name|string|y|酒店名称|
|hotelType|int|y|酒店类型(0:单体，1：集团, 2:运营商), 默认为0|
|stars|Number|y|酒店星级|
|ctripStars|Number|y|携程星级|
|contactName|string|y|联系人|
|phoneNumber|string|y|电话号码|
|roomsCount|int|y|房间数量|
|detailAddress|string|y|详细地址|
|description|string|y|描述信息|
|longitude|float|y|经度|
|latitude|float|y|纬度|
|province|int|n|省id|
|city|int|n|市id|
|county|int|n|县/区id|
|pmsManufacturer|string|y|厂商|
|projectNum|string|y|立项号|
|contractNo|string|n|合同编号|
|contractName|string|n|合同名称|
|enableUwifi|int|n|是否开通wifi(0:未开通, 1:开通)|
|enableHms|int|n|是否开通hms(0:未开通， 1：开通)
|agency|string|y|所属办事处|
|hotelGrade|string|y|酒店等级|
|sales|string|y|销售员|
|epgVersion|string|y|epg版本|
|tags|array|n|酒店标签|

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|

```
{
  "data": {},
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/hotel/create">/app/api/hotels/:id</span>
####   [返回目录](#main)
**接口说明**

```
编辑酒店
请求方式: post
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|  
|name|string|y|酒店名称|
|hotelType|int|y|酒店类型(0:单体，1：集团, 2:运营商), 默认为0|
|stars|Number|y|酒店星级|
|ctripStars|Number|y|携程星级|
|contactName|string|y|联系人|
|phoneNumber|string|y|电话号码|
|roomsCount|int|y|房间数量|
|detailAddress|string|y|详细地址|
|description|string|y|描述信息|
|longitude|float|y|经度|
|latitude|float|y|纬度|
|province|int|n|省id|
|city|int|n|市id|
|county|int|n|县/区id|
|pmsManufacturer|string|y|厂商|
|projectNum|string|y|立项号|
|contractNo|string|n|合同编号|
|contractName|string|n|合同名称|
|enableUwifi|int|n|是否开通wifi(0:未开通, 1:开通)|
|enableHms|int|n|是否开通hms(0:未开通， 1：开通)
|agency|string|y|所属办事处|
|hotelGrade|string|y|酒店等级|
|sales|string|y|销售员|
|epgVersion|string|y|epg版本|
|tags|array|n|酒店标签|

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|

```
{
  "data": {},
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/hotel/updateStatus">7./app/api/hotelStatus</span>
####   [返回目录](#main)
**接口说明**

```
更新酒店状态
请求方式: post
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|
|id|array|y|酒店id数组|
|status|int|y|状态(1:正常, 0: 禁用)

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|

```
{
  "data": {},
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/hotel/group/list">8./app/api/hotel/groups</span>
####   [返回目录](#main)
**接口说明**

```
获取酒店分组列表
请求方式: get
```
**请求参数**

|参数名称|类型|是否必填|说明|示例|
|---|---|---|---|---|
|page|number|N|当前页<br><font color=green>default: 1</font>|1|
|limit|number|N|每页条数<br><font color=green>default: 15</font>|15|
|sort|string|n|排序字段|groupName|
|search|string|n|搜索条件|酒店分组名称，酒店名称|

**返回结果说明**

|参数名称|类型|是否必填|说明|  
|---|---|---|---|  
|id|string|y|酒店分组id|  
|name|string|y|酒店分组名称|
|hotelIds|array|y|酒店id数组|
|status|int|y|酒店分组状态(0:禁用, 1:正常)
|createdAt|int|y||创建时间|
|updatedAt|int|y||更新时间|

```
{
  "data": {
     	total: 10,
      limit: 15,
      page: 1,
      pages: 1，
      docs: {
        [
          "id": '2342423524'
          "hotelIds": [123, 222],
          "name": "酒店名称",
          'status': 1,
          "createdAt": '',
          "updatedAt": '',
        ]
      }
   },
  "code": 0,
  "message": "操作成功",
}
```


### <span id="/hotel/group/detail/:id">9./app/api/hotel/groups/:id</span>
####   [返回目录](#main)
**接口说明**

```
获取酒店分组详情
请求方式： get
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|


**返回结果说明**  

|参数名称|类型|是否必填|说明|   
|---|---|---|---|        
|id|string|n|酒店分组id|    
|name|string|y|酒店分组名称|
|hotelIds|array|y|酒店id数组|
|status|int|y|酒店分组状态(0:禁用, 1:正常)
|createdAt|int|y||创建时间|
|updatedAt|int|y||更新时间|

```
{
  "data": {
      "id": '',
      "hotelIds": ['123', '123'],
      "name": "",
      "status": 1,
      "createdAt": ,
      "updatedAt": ,
   },
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/hotel/group/create">/app/api/hotel/groups</span>
####   [返回目录](#main)
**接口说明**

```
新增酒店分组
请求方式: post
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|
|name|string|y|酒店分组名称|
|hotelIds|array|y|酒店id数组|

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|

```
{
  "data": {},
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/hotel/group/edit">/app/api/hotel/groups/:id</span>
####   [返回目录](#main)
**接口说明**

```
编辑酒店分组
请求方式: post
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|
|name|string|y|酒店分组名称|
|hotelIds|array|y|酒店id数组|

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|

```
{
  "data": {},
  "code": 0,
  "message": "操作成功",
}
```

### <span id="/hotel/group/updateStatus">/app/api/hotel/groupStatus</span>
####   [返回目录](#main)
**接口说明**

```
更新酒店分组状态
请求方式: post
```
**请求参数**

|参数名称|类型|是否必填|说明|
|---|---|---|---|
|id|array|y|酒店id数组|
|status|int|y|状态(1:正常, 0: 禁用)

**返回结果说明**  

|参数名称|类型|是否必填|说明|  
|---|---|---|---|

```
{
  "data": {},
  "code": 0,
  "message": "操作成功",
}
```
