const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../config')

module.exports = {
  entry: {
    vendor: ['vue-router']
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: '/dist/',
    filename: 'dll/[name].js',
    library: '[name]'               // 必填项，将此dll包暴露到window上，给app.js调用
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,                // 必填项，用来标志manifest中的路径
      path: './config/manifest.json',    // 必填项，存放manifest的路径
      name: '[name]'                     // 必填项，manifest的name
    }),
    new HtmlWebpackPlugin({              // 利用该插件实现vendor被插入到html中
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
};
