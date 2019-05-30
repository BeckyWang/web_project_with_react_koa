const path = require('path');
const merge = require('webpack-merge');
const base_config = require('./webpack.base.js');
const public_config = require('../../config.js');

const client_port = public_config['development'].client_port;
const server_port = public_config['development'].server_port;

module.exports = merge(base_config, {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, '../../dist'),
    compress: true,
    open: true,
    port: client_port,
    hot: true,
    proxy: {
      '/api': `http://localhost:${server_port}`
    }
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: ['style-loader', 'css-loader?modules', {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            require('autoprefixer')({
              browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
            })
          ]
        }
      }, 'sass-loader']
    }]
  }

});