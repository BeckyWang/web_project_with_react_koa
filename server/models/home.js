const thrift = require('thrift');
const SummarizationModel = require('../gen-nodejs/SummarizationModel');
const ttypes = require('../gen-nodejs/summarization_types');

let rpc_host = null;
let rpc_port = null;

if (process.env.NODE_ENV === 'development') {
  const public_config = require('../../config.js')['development'];
  rpc_host = public_config.rpc_host;
  rpc_port = public_config.rpc_port;
} else if (process.env.NODE_ENV === 'production') {
  const args = process.argv.splice(2);
  if(args.length !== 2) {
    throw new Error('缺少远程服务器地址或端口参数！');
  }
  rpc_host =  args[0];
  rpc_port = +args[1];
} else {
  throw new Error('NODE_ENV is error!');
}

module.exports = {
  generateSummary: originalText => new Promise(async (resolve, reject) => {
    const result = {
      summary: '',
      info: ''
    };
    try {
      const connection = thrift.createConnection(rpc_host, rpc_port, {
        transport: thrift.TBufferedTransport,
        protocol: thrift.TBinaryProtocol
      });

      connection.on('error', e => {
        result.info = '服务器连接异常，请稍候再试！';
        reject(result);
      });

      // Create a SummarizationModel client with the connection
      const client = thrift.createClient(SummarizationModel, connection);

      const predict_text = new ttypes.Article({
        id: new Date().getTime() + '',
        text: originalText
      });

      result.summary = await client.predict([predict_text]);

      connection.end();
      resolve(result);
    } catch (e) {
      result.info = e.message || '未知错误，请稍候再试！';
      reject(result);
    }
  })
}