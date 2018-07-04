var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'datar.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}
