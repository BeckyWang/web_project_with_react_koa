const Koa = require('koa');
const path = require('path');
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyParser');
const koaStatic = require('koa-static');
const router = require('./router.js');
const public_config = require('../config.js')[process.env.NODE_ENV];

const host = public_config.host;
const port = public_config.server_port;

const app = new Koa();

//控制台日志中间件
app.use(koaLogger());

//请求body解析中间件
app.use(bodyParser());

//静态资源加载中间件
app.use(koaStatic(path.join(__dirname, '../dist')));

//初始化路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`server is starting at port: ${host}:${port}`);
});