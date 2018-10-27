### data

- 类型：`Function` 返回一个初始数据对象的函数

- 描述：

DD 实例的数据对象。data-dirver 将会递归将 data 函数返回的对象的属性转换为 getter/setter，从而让数据的属性能够响应数据变化。对象必须是纯粹的对象 (含有任意个的 key/value 对)：浏览器 API 创建的原生对象，原型上的属性会被忽略。实例创建之后，通过 dd.key 访问数据。

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

### computed

- 类型：`{ [key: string]: Function | { get: Function, set: Function } }`

* 描述：

  计算属性将被混入到 DD 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 DD 实例。
  注意如果你为一个计算属性使用了箭头函数，则 this 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。

  ```js
  computed: {
    aDouble: dd => dd.a * 2;
  }
  ```

- 示例：

```js
var dd = new DD({
  data: { a: 1 },
  computed: {
    // 仅读取
    aDouble: function() {
      return this.a * 2;
    },
    // 读取和设置
    aPlus: {
      get: function() {
        return this.a + 1;
      },
      set: function(v) {
        this.a = v - 1;
      }
    }
  }
});
dd.aPlus; // => 2
dd.aPlus = 3;
dd.a; // => 2
dd.aDouble; // => 4
```

### methods

- 类型：`{ [key: string]: Function }`

* 描述：

  methods 将被混入到 DD 实例中。可以直接通过 DD 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 DD 实例。

  > 不应该使用箭头函数来定义 method 函数，箭头函数绑定了父级作用域的上下文，使 `this` 无法绑定为 DD 实例

- 示例：

```js
var dd = new DD({
  data: { a: 1 },
  methods: {
    plus: function() {
      this.a++;
    }
  }
});
dd.plus();
dd.a; // 2
```

### watch

- 类型：`{ [key: string]: string | Function | Object | Array }`

* 描述：

  一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。DD 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。

> 不应该使用箭头函数来定义 method 函数，箭头函数绑定了父级作用域的上下文，使 `this` 无法绑定为 DD 实例

- 示例：

```js
var dd = new DD({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 方法名
    b: 'someMethod',
    // 深度 watcher
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: function (val, oldVal) { /* ... */ },
      immediate: true
    },
    e: [
      function handle1 (val, oldVal) { /* ... */ },
      function handle2 (val, oldVal) { /* ... */ }
    ],
    // watch DD.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
  }
})
dd.a = 2 // => new: 2, old: 1
```
