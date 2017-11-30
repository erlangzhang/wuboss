# 云BOSS--用户模块

	提供云BOSS--用户模块的接口描述，包含用户，角度，权限等。


## 0x00 <span id = "main">目录</span>

|路径|方法|描述|
|:---|:---|:---|
|[/app/api/accounts](#account-post)|post|新建管理员|
|[/app/api/accounts/:id](#account-get)|get|获取管理员信息|
|[/app/api/accounts](#account-list)|get|管理员信息列表|
|[/app/api/accounts/:id](#account-update)|post|修改管理员信息|
|[/app/api/accounts/batchDelete](#account-delete)|post|删除管理员信息|
|[/app/api/accountStatus](#account-update-status)|post|修改管理员状态|
|[/app/api/accounts/:id/password](#account-update-pwd)|post|修改管理员密码|
|[/app/api/roles](#role-post)|post|新建角色|
|[/app/api/roles](#role-list)|get|角色列表|
|[/app/api/roles/:id](#role-get)|get|获取角色|
|[/app/api/roles/:id](#role-update)|post|修改角色信息|
|[/app/api/roleStatus](#role-update-status)|post|修改角色状态|
|[/app/api/roles/batchDelete](#role-delete)|post|删除角色信息|
|[/app/api/permissions](#permission-list)|get|所有权限列表|
|[/app/api/logs](#log-list)|get|用户日志列表|


## 0x01 请求方式
###### HTTP请求

|环境|HTTP 请求地址|
|:---|:---|
|环境|http://127.0.0.1/app

##  <span id = "account-post">post /app/api/accounts</span>
####  [返回目录](#main)

######  描述:  新建管理员

###### body请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|account|string|Y|管理员账号|-|
|name|string|Y|姓名|-|
|department|string|Y|部门|-|
|password|string|Y|密码|-|
|telephone|string|Y|手机号码|-|
|status|number|N|状态<br>0:不正常<br>1:正常<br><font color=green>default: 1</font>|1|
|roles|array|Y|角色列表|-|
|hotelGroups|array|Y|操作酒店组列表|-|

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|[用户结构](#account-structure)| 详细见下面请求示例|

######<span id="account-structure">用户结构</span>
|字段名|类型|描述|
|:---|:---|:---|
|id|string|唯一标识|
|account|string|管理员账号|
|name|string|姓名|
|department|string|部门|
|password|string|密码|
|telephone|string|手机号码|
|status|number|状态|
|lastLoginTime|string|最后登录时间|
|lastLoginIP|string|最后登录IP|
|roles|array|角色|
|hotelGroups|array|操作酒店组|

###### 响应示例:

```
{
	code: 0,
	message: 'success',
	data: {
	    id: '',
	    account: '',
		name: '',
        department: '',
        telephone: '',
        status: 1,
        lastLoginTime: '',
        lastLoginIP: '',
        roles: [],
	    hotelGroups: [],
	},
}
```

##  <span id = "account-get">get /app/api/accounts/:id</span>
####  [返回目录](#main)

######  描述: 获取管理员信息

###### query请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|[用户结构](#account-structure)| 详细见下面请求示例|

###### 响应示例:

```
{
    code: 0,
	message: 'success',
	data: {
	    id: '',
	    account: '',
		name: '',
        department: '',
        telephone: '',
        status: 1,
        lastLoginTime: '',
        lastLoginIP: '',
        roles: [],
	    hotelGroups: [],
	},
}
```

##  <span id = "account-list">get /app/api/accounts</span>
####  [返回目录](#main)

######  描述:  管理员信息列表

###### query请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|page|number|N|default: 1|-|
|limit|number|N|default: 15|-|
|sort|string|N|排序|-title,name|
|search|string|N|帐号、名称或部门||

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|[用户结构](#account-structure)| 详细见下面请求示例|

###### 响应示例:

```
{
	code: 0,
	message: 'success',
	data: {
		total: 10,
		limit: 15,
		page: 1,
		pages: 1,
		docs: [
			{
			  id: '',
			  account: '',
			  name: '',
			  department: '',
			  telephone: '',
			  status: 1,
			  lastLoginTime: '',
			  lastLoginIP: '',
			  roles: [],
			  hotelGroups: [],
			},
			...
		],
	},
}
```

##  <span id = "account-update">post /app/api/accounts/:id</span>
####  [返回目录](#main)

######  描述:  修改管理员

###### body请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|name|string|Y|姓名|-|
|department|string|Y|部门|-|
|telephone|string|Y|手机号码|-|
|roles|array|Y|角色列表|-|
|hotelGroups|array|Y|操作酒店组列表|-|
|password|string|N|原密码<br>(为空时不更新密码)|-|
|newPwd|string|N|新密码|-|

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|[用户结构](#account-structure)| 详细见下面请求示例|
###### 响应示例:

```
{
    code: 0,
	message: 'success',
	data: {
	    id: '',
	    account: '',
		name: '',
        department: '',
        telephone: '',
        status: 1,
        lastLoginTime: '',
        lastLoginIP: '',
        roles: [],
	    hotelGroups: [],
	},
}
```

##  <span id = "account-delete">post /app/api/accounts/batchDelete</span>
####  [返回目录](#main)

######  描述:  删除管理员信息

###### body请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|id|array|Y|id|[id1,id2,id3]|

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|

##  <span id = "account-update-status">post /app/api/accountStatus</span>
####  [返回目录](#main)

######  描述:  修改管理员状态

###### body请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|id|string/array|Y|id|[id1,id2,id3]|
|status|number|Y|状态|-|

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|无|{}|

##  <span id = "account-update-pwd">post /app/api/accounts/:id/password</span>
####  [返回目录](#main)

######  描述:  修改管理员密码

###### body请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|password|string|Y|原密码|-|
|newPwd|string|Y|新密码|-|

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|[用户结构](#account-structure)| 详细见下面请求示例|

###### 响应示例:

```
{
    code: 0,
	message: 'success',
	data: {
	    id: '',
	    account: '',
		name: '',
        department: '',
        telephone: '',
        status: 1,
        lastLoginTime: '',
        lastLoginIP: '',
        roles: [],
	    hotelGroups: [],
	},
}
```


##  <span id = "role-post">post /app/api/roles</span>
####  [返回目录](#main)

######  描述:  新建角色

###### body请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|name|string|Y|角色名称|-|
|permissions|array|Y|权限列表|-|
|status|number|N|状态<br>0:不正常<br>1:正常<br><font color=green>default: 1</font>|1|

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|[角色结构](#role-structure)| 详细见下面请求示例|

######<span id="role-structure">角色结构</span>
|字段名|类型|描述|
|:---|:---|:---|
|id|string|唯一标识|
|name|string|角色名称|
|permissions|array|权限列表|
|status|number|状态|

###### 响应示例:

```
{
	code: 0,
	message: 'success',
	data: {
		id: '',
	    name: '',
	    permissions: [],
	    status: 1,
	},
}
```

##  <span id = "role-get">get /app/api/roles/:id</span>
####  [返回目录](#main)

######  描述: 获取角色信息

###### query请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|[角色结构](#role-structure)| 详细见下面请求示例|

##  <span id = "role-update">post /app/api/roles/:id</span>
####  [返回目录](#main)

######  描述:  修改角色

###### body请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|name|string|Y|角色名称|-|
|permissions|array|Y|权限列表|-|

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|[角色结构](#role-structure)| 详细见下面请求示例|

###### 响应示例:

```
{
    code: 0,
	message: 'success',
	data: {
		id: '',
	    name: '',
	    permissions: [],
	    status: 1,
	},
}
```

##  <span id = "role-update-status">post /app/api/roleStatus</span>
####  [返回目录](#main)

######  描述:  修改单个或多个角色

###### body请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|id|string/array|Y|角色id|[id1,id2,id3]|
|status|number|Y|状态|-|

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|无|{}|

##  <span id = "role-list">get /app/api/roles</span>
####  [返回目录](#main)

######  描述: 角色列表

###### query请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|page|number|N|default: 1|0: 获取所有列表|
|limit|number|N|default: 15|-|
|search|string|N|名称或权限名称||

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|角色结构| 详细见下面请求示例|

###### 响应示例:

```
{
	code: 0,
	message: 'success',
	data: {
		total: 10,
		limit: 15,
		page: 1,
		pages: 1,
		docs: [
			{
				id: '',
				name: '',
				permissions: [],
				status: 1,
			},
			...
		]
	},
}
```

##  <span id = "role-delete">post /app/api/roles/batchDelete</span>
####  [返回目录](#main)

######  描述:  删除角色信息

###### body请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|id|array|Y|id|[id1,id2,id3]|

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|

##  <span id = "permission-list">get /app/api/permissions</span>
####  [返回目录](#main)

######  描述: 所有权限列表

###### query请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|[权限结构](#permission-structure)| 详细见下面请求示例|

######<span id="permission-structure">权限结构</span>
|字段名|类型|描述|
|:---|:---|:---|
|id|string|权限id|
|name|string|权限名称|

###### 响应示例:

```
{
	code: 0,
	message: 'success',
	data: {
		docs: [
			{
			    id: '111',
			    name: 'xxx',
			    category: {
			    },
			},
			{
				id: '',
				name: '',
				category: {
					id: '111',
					name: 'xxx',
				},
			},
			...
		]
	},
}
```

##  <span id = "log-list">get /app/api/logs</span>
####  [返回目录](#main)

######  描述:  用户日志列表

###### query请求参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|page|number|N|default: 1|-|
|limit|number|N|default: 15|-|
|select|string|N|返回的参数|title id|
|sort|string|N|排序|-title,name|
|accountId|string|N|账号ID|-|
|method|string|N|-|-|
|name|string|N|-|-|
|code|number|N|-|-|
|search|string|N|操作人||

###### 响应参数:

|参数|类型|是否必填|描述|示例值|
|:---|:---:|:---:|:---|:---|
|code|int|Y|返回码|0 = 正常<br>其他值表示错误或者异常|
|message|int|Y|返回错误信息|-|
|data|object|Y|[日志结构](#log-structure)| 详细见下面请求示例|

######<span id="log-structure">日志结构</span>
|字段名|类型|描述|
|:---|:---|:---|
|id|string|唯一标识|
|accountId|string|操作员id|
|name|string|操作员名称|
|url|string|url|
|method|string|操作方法：post, delete|
|params|json|参数|
|code|number|操作结果 0：表示成功|
|message|string|描述|
|createdAt|int|创建时间戳|

###### 响应示例:

```
{
	code: 0,
	message: 'success',
	data: {
		total: 10,
		limit: 15,
		page: 1,
		pages: 1,
		docs: [
			{
			  id: '',
			  accountId: '',
			  name: '',
			  url: '',
			  method: '',
			  params: {},
			  code: '',
			  message: '',
			  createdAt: 11,
			},
			...
		],
	},
}
```