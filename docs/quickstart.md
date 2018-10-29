### 使用 DD 构造器

DD 构造器具有全局API，支持多个选项的配置。DD 实例具有丰富的属性和方法，考虑父子实例间的通信，以实现复杂情况下的数据响应。

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

### 使用 observe 和 Watcher

对于简单情况下的数据监听，data-dirver 提供了 observe 和 Watcher 两个方法，使调用更加简单直观。

```js
import { observe, Watcher } from "data-dirver";

var obj = { count1: 1, count2: 2 };
// 将 obj 转化为可监听结构
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
