# web_project_with_react_koa
简单的web应用：通过thrift实现TPM模型的远程调用，在线生成文本摘要。 

其中，后端使用koa2，前端使用react+webpack4搭建。

## 快速启动
### 配置项目config.js
```js
module.exports = {
  //开发环境地址及端口
  development: {
    host: 'http://localhost',
    server_port: 8087, //服务端port，用于api网络请求
    client_port: 8088, //客户端port，用于webpack-dev-server，即可在本地获取html、js等资源
    rpc_host: '192.168.101.11', //服务器地址及端口，用于thrift远程调用
    rpc_port: 8082
  },
  //生产环境地址及端口
  production: {
    server_port: 80
  },
}
```
### 启动脚本
```
//安装依赖
npm install

//开发环境下
//启动服务端
npm run dev_server

//启动客户端
npm run dev

//生产环境下
//手动传入thrift远程调用服务器的地址及端口
npm run prod -- <rpc_host> <rpc_port>
``` 

## 框架设计
### 概要
- 后端：koa2 搭建服务, thrift完成rpc功能
- 前端：使用react搭建单页面应用，webpack4打包编译

### 目录结构
```
├── server  # 后端代码目录
│   ├── controllers/  #操作层目录
│   ├── gen-nodejs/ #thrift文件目录
│   ├── mock/ #数据伪造目录
│   ├── models/ #数据模型model层目录
│   ├── app.js #后端服务入口文件
│   └── router.js #路由目录（如果项目很大，可以将路由文件拆分开来）
├── app # 前端静态代码目录
│   ├── build/   #webpack配置目录
│   └── src/ #前端源代码目录
│       ├── api/ #处理网络请求
│       ├── assets/ #存放一些静态资源文件，如图片
│       ├── components/ #公共组件
│       ├── css/ #公共css文件
│       ├── pages/ #前端页面
│       ├── index.ejs #首页模板
│       └── index.js #前端入口js文件
├── package.json 
└── config.js # 公共配置文件
```
