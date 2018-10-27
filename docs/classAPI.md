### DD.extend(options)

- 描述：

  使用基础 DD 构造器，创建一个“子类”。

- 参数：

  - `{Object} options` 一个包含实例选项的对象

- 示例：

```js
DD.extend({
  data() {
    return {
      name: "hanger"
    };
  },
  methods: {
    save() {
      console.log("hello" + this.name);
    }
  }
});
```

### DD.use(plugin)

- 描述：

通过向 DD 构造器植入插件来进行功能拓展。该方法需要在调用 `new DD()` 之前被调用。

- 参数：

  - `{Object | Function} plugin`

  > 如果 plugin 是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 DD 作为参数传入。当 install 方法被同一个插件多次调用，插件将只会被安装一次。

### DD.mixin(mixin)

- 描述：

全局注册一个混入。

- 参数：

  - `{Object} mixin`

  > 混入的内容，可以通过实例的 `$options` 属性找到

- 示例：

```js
DD.mixin({ version: "0.2.7" });
var m = new DD();
console.log(m.$options.version); // '0.2.7'
```
