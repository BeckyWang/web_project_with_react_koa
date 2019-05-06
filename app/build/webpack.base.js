const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const port = 8088;
const host = `http://localhost:${port}/`;

const srcResolve = function(file) {
  return path.join(__dirname, '..', 'src', file);
};

const distResolve = function(file) {
  return path.join(__dirname, '..', '..', 'dist', file);
};

module.exports = {
  entry: {
    index: srcResolve('index.js')
  },

  output: {
    publicPath: host,
    path: distResolve(''),
    filename: 'js/[name].js'
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [srcResolve('')],
      use: [{
        loader: 'babel-loader?cacheDirectory=true',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }]
    }, {
      test: /\.(?:png|jpg|gif|svg)$/,
      loader: 'url-loader?limit=8192&name=image/[hash].[ext]' //小于8k,内嵌;大于8k生成文件
    }]
  },

  resolve: {
    modules: [
      "node_modules",
      srcResolve('')
    ],
    extensions: [".js", ".jsx", ".json", ".scss", ".css"]
  },

  optimization: {
    usedExports: true
  },

  plugins: [
    new HtmlwebpackPlugin({
      template: srcResolve('index.ejs'),
      title: '基于TPM模型的自动文本摘要在线演示',
      favicon: srcResolve('assets/images/favicon.ico')
    })
  ]
};