const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'data-driver.js',
    path: path.resolve(__dirname, '../dist')
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
    new UglifyJsPlugin()
  ]
}
