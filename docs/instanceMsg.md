### 父实例向子实例传参

父实例通过 $addChild() 的第二个参数向子实例传参，子实例根据 props 属性接受参数。

```js
// sub.js
import DD from "data-dirver";

export default DD.extend({
  props: {
    fatherName: {
      default: "fatherName"
    },
    dynamicA: {
      default: 0
    }
  },
  watch: {
    dynamicA(val, oldVal) {
      console.log(`sub.dynamicA 从 ${oldVal} 变更为 ${val}`);
    }
  }
});
```

```js
// main.js
import DD from "data-dirver";
import Sub from "./sub.js";

var main = new DD({
  data() {
    return {
      A: {
        a: 1
      }
    };
  },
  watch: {
    "A.a": function(val, oldVal) {
      console.log(`main.A.a 从 ${oldVal} 变更为 ${val}`);
    }
  }
});

// 键名前加 ‘:’ 表示该属性是动态属性，不加表示静态属性
var sub = main.$addChild(Sub, {
  fatherName: "main",
  ":dynamicA": "A.a" // 动态属性的值为父实例属性的表达式
});
console.log(sub.fatherName); // => main
main.A.a++;
// A.a 从 1 变更为 2
// sub.dynamicA 从 0 变更为 2
```

### 子实例向父实例传参

子实例通过 $emit() 触发父实例的方法，向父实例传参。

```js
// sub.js
import DD from "data-dirver";

export default DD.extend({
  methods: {
    setFatherCount (num) {
      this.$emit('setCount', num)
    }
  }
});
```

```js
// main.js
import DD from "data-dirver";
import Sub from './sub.js'

var main = new DD({
  data () {
    return {
      count: 0
    }
  },
  methods: {
    setCount (num) {
      this.count = num
    }
  }
})

var sub = main.$addChild(Sub)
console.log(main.count) // => 0
sub.$emit('setFatherCount', 70)
console.log(main.count) // => 70
```