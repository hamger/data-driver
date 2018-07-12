var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './demo/index.js',
  output: './dist/',
  devtool: "eval-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
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
    compress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'demo/index.html',
      inject: true
    })
  ]
};