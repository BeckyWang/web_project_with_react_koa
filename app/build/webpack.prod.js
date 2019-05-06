const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const base_config = require('./webpack.base.js');

module.exports = merge(base_config, {
  mode: 'production',

  devtool: 'cheap-module-source-map',

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
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css'
    }),
    new CleanWebpackPlugin()
  ]
});