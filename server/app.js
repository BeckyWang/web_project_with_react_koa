const Koa = require('koa');
const path = require('path');
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyParser');
const koaStatic = require('koa-static');
const router = require('./router.js');

const app = new Koa();
const port = 8087;

//控制台日志中间件
app.use(koaLogger());

//请求body解析中间件
app.use(bodyParser());

//静态资源加载中间件
app.use(koaStatic(path.join(__dirname, '../dist')));

//初始化路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`server is starting at port: locahost:${port}`);
});
