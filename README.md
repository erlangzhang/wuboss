
## beego, mgo, vue ：云boss系统

> 技术栈：golang + beego + mgo + vue

> 预览地址： [http://59.110.212.239](http://59.110.212.239)

> 测试账号：demo, demo

### glide：Go包管理使用

```
1.安装：
  go get github.com/Masterminds/glide
  或
    linux:  curl https://glide.sh/get | sh
    Mac: brew install glide

2.初始化项目
  glide init 
3.编辑配置：
  edit glide.yaml
4.解析下载依赖:
  glide update 
5.安装包：
  glide get github.com/astaxie/beego#v1.8.3
6.安装项目依赖包
  glide install
7. 查看依赖列表:
  glide list
8. 查看帮助：
  glide help
```

### 项目运行

```
1.环境安装
  配置好GOROOT和GOPATH
  cd src
  mkdir work-codes
  git clone https://code.aliyun.com/wukc/wushu.git
  cd wushu/app
  glide install

2. 运行项目
  启动mongodb:  mongod
  启动项目： bee run  或者 go build 

  运行测试： go test

3. 访问项目：
  浏览器输入： localhost:8080

4. 测试接口：
  postman: 
    post 请求接收json数据

5. 前端编译：
  cd view
  cnpm i
  npm run build 后生成dist文件夹

6. 前后端结合： 
  将编译后的dist文件， 复制到app下， 并将名称改为public
  cd view 
  cp -R dist ../app && cd ../app && mv dist public

```

### 项目部署

```
docker + caddy

```

