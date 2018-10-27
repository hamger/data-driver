# data-dirver

基于 defineProperties 的实现 JavaScript 数据响应的解决方案

## Usage

```js
import DD from "data-dirver";

var demo = new DD({
  data() {
    return {
      text: "hello world",
      num1: 2,
      num2: 3
    };
  }
});

var watch2 = demo.$watch("text", (val, oldVal) => {
  console.log(`text的值从 ${oldVal} 变更为 ${val}`);
});

demo.text = "hello data-dirver";
// text的值从 hello world 变更为 hello data-dirver

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
demo.$cancelWatch(watch2); // 取消对 text 属性的监听
demo.text = "hi data-dirver";
demo.num1 += 2; // num1 与 num2 的和从 5 变更为 7
demo.$cancelWatch(); // 取消对所有属性的监听
demo.num1 += 2;
```

如果你只是希望实现对数据的监听，也可以使用以下的方式:

```js
import { observe, Watcher } from "data-dirver";

var obj = { count1: 1, count2: 2 };
observe(obj);
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

## Document

[文档地址](https://hamger.github.io/data-dirver/)

## Changelog

### 2018.8.22
> v0.2.6 修改全局拓展 use 函数

### 2018.8.18
> v0.2.5 修复并增强 $cancelWatch 实例方法 

> v0.2.4 暴露 observe 和 Watcher 方法

### 2018.8.16

> v0.2.3 添加全局混入 mixin 函数

### 2018.7.23

> v0.2.2 实现子组件向父组件传参

### 2018.7.22

> v0.2.1 修复父类配置项指向的错误和未合并所有配置项的错误

### 2018.7.18

> v0.2.0 改写为 typescript 项目

### 2018.7.4

> v0.1.0 初始化项目
