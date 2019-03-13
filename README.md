# data-dirver

实现 JavaScript 数据响应的解决方案

## Usage

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

## Document

[文档地址](https://hamger.github.io/data-dirver/)

## Changelog

### 2018.3.14
> v0.2.9 修复打包错误

### 2018.10.29
> v0.2.8 添加 $addChild 实例方法，创建完整的使用文档

### 2018.10.27
> v0.2.7 放弃 $cancelWatch 实例方法，采用 dd.$watch 返回一个取消观察的函数

### 2018.8.22
> v0.2.6 修改全局拓展 use 函数

### 2018.8.18
> v0.2.5 修复并增强 $cancelWatch 实例方法 

> v0.2.4 暴露 observe 和 Watcher 方法

### 2018.8.16

> v0.2.3 添加全局混入 mixin 函数

### 2018.7.23

> v0.2.2 实现子实例向父实例传参

### 2018.7.22

> v0.2.1 修复父类配置项指向的错误和未合并所有配置项的错误

### 2018.7.18

> v0.2.0 改写为 typescript 项目

### 2018.7.4

> v0.1.0 初始化项目
