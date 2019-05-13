const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const base_config = require('./webpack.base.js');
const public_config = require('../../config.js');

const host = public_config['production'].host;
const port = public_config['production'].server_port;

module.exports = merge(base_config, {
  mode: 'production',

  devtool: 'cheap-module-source-map',

  output: {
    publicPath: `${host}:${port}/`,
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader?modules', {
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
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css'
    }),
    new CopyWebpackPlugin([{
      from: 'node_modules/@babel/polyfill/dist/polyfill.min.js',
      to: 'lib/'
    }]),
    new HtmlWebpackTagsPlugin({ 
      scripts: [`${host}:${port}/lib/polyfill.min.js`],
      publicPath: false,
      append: false
    }),
    new CleanWebpackPlugin()
  ]
});