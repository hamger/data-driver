## 数据

### dd.$watch( expOrFn, callback )

- 参数：

  - `{string | Function} expOrFn`
  - `{Function | Object} callback`

- 返回值： `{Function} unwatch`

- 描述：

  观察 DD 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代。

- 示例：

  ```js
  // 键路径
  vm.$watch("a.b.c", function(newVal, oldVal) {
    /* ... */
  });

  // 函数
  vm.$watch(
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
  var unwatch = vm.$watch("a", cb);
  // 之后取消观察
  unwatch();
  ```

## 事件

### vm.$on( event, callback )

- 参数：

- `{string | Array<string>} event`
- `{Function} callback`

- 描述：

监听当前实例上的自定义事件。事件可以由`vm.$emit`触发。回调函数会接收所有传入事件触发函数的额外参数。

- 示例：

  ```js
  // 自定义一个名为 test 的事件
  vm.$on("test", function(msg) {
    console.log(msg);
  });
  // 触发 test 事件
  vm.$emit("test", "hi"); // => "hi"
  ```

### vm.$once( event, callback )

- 参数：

- `{string} event`
- `{Function} callback`

- 描述：

监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。

### vm.$off( [event, callback] )

- 参数：

- `{string | Array<string>} event`
- `{Function} [callback]`

- 描述：

移除自定义事件监听器。

- 如果没有提供参数，则移除所有的事件监听器；

- 如果只提供了事件，则移除该事件所有的监听器；

- 如果同时提供了事件与回调，则只移除这个回调的监听器。

### vm.$emit( eventName, […args] )

- 参数：

- `{string} eventName`
- `[...args]`

- 描述：

触发当前实例上的事件。附加参数都会传给监听器回调。

## 生命周期

### vm.$destroy()

完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
触发 `beforeDestroy` 和 `destroyed` 的钩子。

