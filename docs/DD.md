### 使用函数
最简单的方式实现对数据变更的监听
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

### 使用构造器
使用构造器的方式具有更强的能力处理复杂情况。
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

demo.$watch(
  function() {
    return this.num1 + this.num2;
  },
  (val, oldVal) => {
    console.log(`num1 与 num2 的和从 ${oldVal} 变更为 ${val}`);
  }
);

demo.num1++; // num1 与 num2 的和从 5 变更为 6
demo.num2--; // num1 与 num2 的和从 6 变更为 5
demo.$cancelWatch(); // 取消对所有的监听
demo.num1++;
demo.num2--;
```
