data-dirver 只暴露了三个函数，其中 observe 和 Watcher 总是一起使用的，用于监听单一数据。使用 DD 构造器可以体现数据间的父子关系，以实现复杂情况下的数据响应。
```js
import DD, { observe, Watcher } from "data-dirver";
```

### observe( obj )

- 参数：

  - `{Object} obj`

- 描述：

  将数据转化为可监听的结构。单独使用没有意义，需要配合 Watcher 一起使用。

  > 将对象的属性转换为 getter/setter，从而让数据的属性能够响应数据变化。对象必须是纯粹的对象 (含有任意个的 key/value 对)：浏览器 API 创建的原生对象，原型上的属性会被忽略。

### new Watcher( obj, expOrFn, callback )

- 参数：

  - `{Object} obj` 具有可监听的结构的数据
  - `{string | Function} expOrFn` 表达式
  - `{Function | Object} callback` 回调函数

- 返回值： `Watcher instance`

- 描述：

  实例化一个观察者，用来观察对应表达式的数据变化，改变时就触发回调。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代。
  
  > 调用实例的`teardown`方法可解除监听。

- 示例：

  ```js
  import { observe, Watcher } from "data-dirver";

  var obj = {
    A: {
      a: 123
    },
    text: "hello world",
    count1: 1,
    count2: 2
  };
  observe(obj);

  new Watcher(obj, "text", (val, oldVal) => {
    console.log(`obj.text 的值从 ${oldVal} 变更为 ${val}`);
  });
  obj.text = "hello data-dirver";
  // obj.text 的值从 hello world 变更为 hello data-dirver

  new Watcher(obj, "A.a", (val, oldVal) => {
    console.log(`obj.A.a 的值从 ${oldVal} 变更为 ${val}`);
  });
  obj.A.a *= 2;
  // obj.A.a 的值从 123 变更为 246

  var watch = new Watcher(
    obj,
    function() {
      return this.count1 + this.count2;
    },
    (val, oldVal) => {
      console.log(`count1 与 count2 的和从 ${oldVal} 变更为 ${val}`);
    }
  );
  obj.count1++;
  // count1 与 count2 的和从 3 变更为 4
  obj.count2--;
  // count1 与 count2 的和从 4 变更为 3
  watch.teardown(); // 取消监听
  obj.count1--;
  obj.count2++;

  new Watcher(
    obj,
    dd => dd.count1 * dd.count2,
    (val, oldVal) => {
      console.log(`count1 与 count2 的积从 ${oldVal} 变更为 ${val}`);
    }
  );
  obj.count2++;
  // count1 与 count2 的积从 2 变更为 3
  ```

### new DD(options)

- 参数：

  - `{Object} options` [构造器选项](/options)

- 返回值： `DD instance`

  - [实例属性](/instancePorp)
  - [实例方法](/instanceFunc)

- 描述：

  创建一个 DD 实例。
  