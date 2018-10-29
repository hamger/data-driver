### 数据

#### data

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

#### props

- 类型：`Array<string> | Object`

- 描述：

  props 可以是数组或对象，用于接收来自父实例的数据。props 可以是简单的数组，或者使用对象作为替代，对象支持设置默认值。

- 示例：

  ```js
  export default DD.extend({
    props: {
      fatherName: {
        default: 'main'
      }
    }
  });
  ```
  ```js
  export default DD.extend({
    props: ['fatherName']
  });
  ```

#### computed

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

#### methods

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

#### watch

- 类型：`{ [key: string]: Function | Array<Function> }`

* 描述：

  一个对象，键是需要观察的属性名称（或者表示键路径的字符串），值是对应回调函数（或者包含多个回调函数的数组）。DD 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。

> 不应该使用箭头函数来定义 method 函数，箭头函数绑定了父级作用域的上下文，使 `this` 无法绑定为 DD 实例

- 示例：

  ```js
  var dd = new DD({
    data: {
      a: 1,
      e: {
        f: 2
      }
    },
    watch: {
      a: function(val, oldVal) {
        console.log("new: %s, old: %s", val, oldVal);
      },
      e: [
        function handle1(val, oldVal) {
          /* ... */
        },
        function handle2(val, oldVal) {
          /* ... */
        }
      ],
      "e.f": function(val, oldVal) {
        /* ... */
      }
    }
  });
  dd.a = 2; // => new: 2, old: 1
  ```

### 生命周期

#### beforeCreate

- 类型：`Function`

- 描述：

  在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

#### created

- 类型：`Function`

- 描述：

  在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。

#### beforeDestroy

- 类型：`Function`

- 描述：

  实例销毁之前调用。在这一步，实例仍然完全可用。

#### destroy

- 类型：`Function`

- 描述：

  DD 实例销毁后调用。调用后，DD 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
