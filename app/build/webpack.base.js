const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const srcResolve = function(file) {
  return path.join(__dirname, '..', 'src', file);
};

module.exports = {
  entry: {
    index: srcResolve('index.js')
  },

  output: {
    path: path.join(__dirname, '../../dist'),
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

  optimization: {
    runtimeChunk: {
      name: 'mainfest'
    },
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 5,
      minSize: 0,
      cacheGroups: {
        vendor: { //node_modules内的依赖库
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          minChunks: 1, //被不同entry引用次数(import)
          priority: 100
        }
      }
    }
  },

  resolve: {
    modules: [
      "node_modules",
      srcResolve('')
    ],
    extensions: [".js", ".jsx", ".json", ".scss", ".css"]
  },

  plugins: [
    new HtmlwebpackPlugin({
      template: srcResolve('index.ejs'),
      title: '基于TPM模型的自动文本摘要在线演示',
      favicon: srcResolve('assets/images/favicon.ico')
    })
  ]
};