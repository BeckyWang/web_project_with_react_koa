const thrift = require('thrift');
const SummarizationModel = require('../gen-nodejs/SummarizationModel');
const ttypes = require('../gen-nodejs/summarization_types');
const public_config = require('../../config.js');

const host = public_config['rpc'].host;
const port = public_config['rpc'].port;

module.exports = {
  generateSummary: originalText => new Promise(async (resolve, reject) => {
    const result = {
      summary: '',
      info: ''
    };
    try {
      const connection = thrift.createConnection(host, port, {
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