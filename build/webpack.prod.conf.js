const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const AnnotatePlugin = require('annotate-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'data-driver.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '#': path.resolve(__dirname, '../types')
    }
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../src')]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [path.resolve(__dirname, '../src')]
      },
    ]
  },
  plugins: [
    new AnnotatePlugin({
      author: 'hanger',
      create: '2018/7/4'
    }),
    new UglifyJsPlugin(),
  ]
}
