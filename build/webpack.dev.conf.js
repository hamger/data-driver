var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
const path = require('path')
const utils = require('./utils')
const resolve = utils.resolve

var webpackConfig = {
  entry: utils.getEntry('demo/**/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name]-[hash:5].js'
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loaders: ['babel-loader'],
        include: [resolve('src'), resolve('demo')]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [resolve('src')]
      },
      {
        test: /.s[c|a]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  },
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    compress: true,
    stats: {
      hash: false,
      assets: false,
      version: false,
      modules: false,
      timings: false
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

// 在不同的页面中插入对应的js文件
var htmls = utils.getEntry('demo/**/index.html')
var pages = Object.keys(htmls)
pages.forEach(filename => {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${filename}/index.html`,
      template: htmls[filename],
      inject: true,
      chunks: [filename]
    })
  )
})

module.exports = webpackConfig