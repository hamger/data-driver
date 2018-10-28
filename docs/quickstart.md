```js
import DD from "data-dirver";

var demo = new DD({
  data() {
    return {
      num1: 2,
      num2: 3
    };
  }
});

var unwatch = demo.$watch(
  function() {
    return this.num1 + this.num2;
  },
  (val, oldVal) => {
    console.log(`num1 与 num2 的和从 ${oldVal} 变更为 ${val}`);
  }
);

demo.num1++; // num1 与 num2 的和从 5 变更为 6
demo.num2--; // num1 与 num2 的和从 6 变更为 5
unwatch(); // 取消监听
demo.num1++;
demo.num2--;
```

以上示例是使用构造器的方式来实现数据响应，对于简单情况下的数据监听，也可以使用以下的方式：

```js
import { observe, Watcher } from "data-dirver";

var obj = { count1: 1, count2: 2 };
// 将 obj 转化为响应结构（数据响应化）
observe(obj);
// 实例化一个观察者，用来观察 this.count1 + this.count2 的变化
var watch = new Watcher(
  obj,
  function() {
    return this.count1 + this.count2;
  },
  (val, oldVal) => {
    console.log(`count1 与 count2 的和从 ${oldVal} 变更为 ${val}`);
  }
);
obj.count1++; // count1 与 count2 的和从 3 变更为 4
obj.count2--; // count1 与 count2 的和从 4 变更为 3
watch.teardown(); // 取消监听
obj.count1++;
obj.count2--;
```
