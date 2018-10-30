### 数据

#### dd.$watch( expOrFn, callback )

- 参数：

  - `{string | Function} expOrFn`
  - `{Function | Object} callback`

- 返回值： `{Function} unwatch`

- 描述：

  观察 DD 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代。

- 示例：

  ```js
  // 键路径
  dd.$watch("a.b.c", function(newVal, oldVal) {
    /* ... */
  });

  // 函数
  dd.$watch(
    function() {
      return this.a + this.b;
    },
    function(newVal, oldVal) {
      /* ... */
    }
  );
  ```

  `dd.$watch` 返回一个取消观察函数，用来停止触发回调：

  ```js
  var unwatch = dd.$watch("a", cb);
  // 之后取消观察
  unwatch();
  ```

#### dd.$addChild( Sub, propsData )

- 参数：

  - `{DD} Sub`
  - `{Object} propsData`

  > propsData 的键名前加`:`表示该属性是动态属性（父实例的属性值变化时也会改变该属性的值），不加表示静态属性

- 返回值： `DD instance`

- 描述：

  为父实例添加子实例，父实例通过 propsData 向子实例传数据。子实例根据 props 属性决定接收哪些数据。

- 示例：
  ```js
  // sub.js
  import DD from 'data-dirver'

  export default DD.extend({
    props: {
      fatherName: {
        default: 'fatherName'
      },
      dynamicA: {
        default: 0
      }
    },
    watch: {
      dynamicA(val, oldVal) {
        console.log(`sub.dynamicA 从 ${oldVal} 变更为 ${val}`);
      }
    },
  });
  ```
  ```js
  // main.js
  import DD from 'data-dirver'
  import Sub from './sub.js'

  var main = new DD({
    data () {
      return {
        A: {
          a: 1
        }
      }
    },
    watch: {
      'A.a': function (val, oldVal) {
        console.log(`main.A.a 从 ${oldVal} 变更为 ${val}`)
      }
    },
  })

  // 键名前加 ‘:’ 表示该属性是动态属性，不加表示静态属性
  var sub = main.$addChild(Sub,  {
    fatherName : 'main',
    ':dynamicA': 'A.a' // 动态属性的值为父实例属性的表达式
  })
  console.log(main.$children.length) // => 1
  console.log(sub.fatherName) // => main
  main.A.a++
  // A.a 从 1 变更为 2
  // sub.dynamicA 从 0 变更为 2
  main.A.a++
  // A.a 从 2 变更为 3
  // sub.dynamicA 从 2 变更为 3
  sub.$destroy() // 销毁子实例
  main.A.a++
  // A.a 从 3 变更为 4
  console.log(main.$children.length) // => 0
  ```

### 事件

#### dd.$on( event, callback )

- 参数：

- `{string | Array<string>} event`
- `{Function} callback`

- 描述：

  监听当前实例上的自定义事件。事件可以由`dd.$emit`触发。回调函数会接收所有传入事件触发函数的额外参数。

- 示例：

  ```js
  // 自定义一个名为 test 的事件
  dd.$on("test", function(msg) {
    console.log(msg);
  });
  // 触发 test 事件
  dd.$emit("test", "hi"); // => "hi"
  ```

#### dd.$once( event, callback )

- 参数：

- `{string} event`
- `{Function} callback`

- 描述：

  监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。

#### dd.$off( [event, callback] )

- 参数：

- `{string | Array<string>} event`
- `{Function} [callback]`

- 描述：

  移除自定义事件监听器。

  - 如果没有提供参数，则移除所有的事件监听器；

  - 如果只提供了事件，则移除该事件所有的监听器；

  - 如果同时提供了事件与回调，则只移除这个回调的监听器。

#### dd.$emit( eventName, […args] )

- 参数：

- `{string} eventName`
- `[...args]`

- 描述：

  触发当前实例上的事件。附加参数都会传给监听器回调。

  > 子实例调用这个方法时，如果父实例上有同名函数，会优先触发父实例上的函数。

### 生命周期

#### dd.$destroy()

- 描述：

  完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
  触发 `beforeDestroy` 和 `destroyed` 的钩子。
