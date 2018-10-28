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
