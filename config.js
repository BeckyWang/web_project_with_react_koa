module.exports = {
  //开发环境端口
  development: {
    server_port: 8087, //服务端port，用于api网络请求
    client_port: 8088, //客户端port，用于webpack-dev-server，即可在本地获取html、js等资源
    rpc_host: '192.168.101.11', //服务器地址及端口，用于thrift远程调用
    rpc_port: 8082
  },
  //生产环境端口
  production: {
    server_port: 80
  },
}