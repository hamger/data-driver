function TestPlugin (options) {
  this.options = options
}

TestPlugin.prototype.apply = function (compiler) {
  var self = this

  compiler.plugin('emit', function (compilation, callback) {
    var annotation = '\/**'
    if (self.options) {
      Object.keys(self.options).forEach(function (key) {
        annotation += '\n * ' + key + ': ' + self.options[key]
      })
      if (!self.options.update) {
        var now = new Date()
        var year = now.getFullYear()
        var month = now.getMonth() + 1
        var day = now.getDate();
        annotation += '\n * update: ' + year + '/' + month + '/' + day 
      }
    }
    annotation += '\n *\/\n'

    // 遍历所有编译过的资源文件，加入自定义注释
    for (var filename in compilation.assets) {
      compilation.assets[filename]['_value'] = annotation + compilation.assets[filename]['_value']
    }

    callback()
  })
}

module.exports = TestPlugin