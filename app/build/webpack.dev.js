const path = require('path');
const merge = require('webpack-merge');
const base_config = require('./webpack.base.js');

const port = 8088;
const host = `http://localhost:${port}`;

module.exports = merge(base_config, {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    open: true,
    port: port,
    hot: true,
    proxy: {
      '/api': 'http://localhost:8087'
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