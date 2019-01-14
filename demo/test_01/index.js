import DD, { observe, Watcher } from "@";

var demo = new DD({
  data () {
    return {
      text: 'hello world',
      num1: 2,
      num2: 3
    }
  }
})

var unwatch2 = demo.$watch('text', (val, oldVal) => {
  console.log(`text的值从 ${oldVal} 变更为 ${val}`)
})

demo.text = 'hello data-dirver'
// text的值从 hello world 变更为 hello data-dirver

var unwatch3 = demo.$watch(
  function () {
    return this.num1 + this.num2
  },
  (val, oldVal) => {
    console.log(`num1 与 num2 的和从 ${oldVal} 变更为 ${val}`)
  }
)

demo.num1++
// num1 与 num2 的和从 5 变更为 6
demo.num2--
// num1 与 num2 的和从 6 变更为 5
unwatch2() // 取消对 text 属性的监听
demo.text = 'hi data-dirver'
demo.num1 += 2
// num1 与 num2 的和从 5 变更为 7
unwatch3() // 取消对所有属性的监听
demo.num1 += 2

// var obj = {
//   A: {
//     a: 123
//   },
//   text: "hello world",
//   count1: 1,
//   count2: 2
// };
// observe(obj);

// new Watcher(obj, "text", (val, oldVal) => {
//   console.log(`obj.text 的值从 ${oldVal} 变更为 ${val}`);
// });
// obj.text = "hello data-dirver";
// // obj.text 的值从 hello world 变更为 hello data-dirver

// new Watcher(obj, "A.a", (val, oldVal) => {
//   console.log(`obj.A.a 的值从 ${oldVal} 变更为 ${val}`);
// });
// obj.A.a *= 2
// // obj.A.a 的值从 123 变更为 246

// var watch = new Watcher(
//   obj,
//   function () {
//     return this.count1 + this.count2
//   },
//   (val, oldVal) => {
//     console.log(`count1 与 count2 的和从 ${oldVal} 变更为 ${val}`);
//   }
// );
// obj.count1++;
// // count1 与 count2 的和从 3 变更为 4
// obj.count2--;
// // count1 与 count2 的和从 4 变更为 3
// watch.teardown(); // 取消监听
// obj.count1--;
// obj.count2++;

// new Watcher(
//   obj,
//   dd => dd.count1 * dd.count2,
//   (val, oldVal) => {
//     console.log(`count1 与 count2 的积从 ${oldVal} 变更为 ${val}`);
//   }
// );
// obj.count2++;
// // count1 与 count2 的积从 2 变更为 3
