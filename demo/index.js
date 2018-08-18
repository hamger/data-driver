import DD, { observe, Watcher } from '../src'

var demo = new DD({
  data () {
    return {
      text: 'hello world',
      num1: 2,
      num2: 3
    }
  }
})

demo.$watch('text', (val, oldVal) => {
  console.log(`text的值从 ${oldVal} 变更为 ${val}`)
})

demo.text = 'hello data-dirver'
// text的值从 hello world 变更为 hello data-dirver

demo.$watch(
  function () {
    return this.num1 + this.num2
  },
  (val, oldVal) => {
    console.log(`num1和num2的和从 ${oldVal} 变更为 ${val}`)
  }
)

demo.num1++
// num1和num2的和从 5 变更为 6
demo.num2--
// num1和num2的和从 5 变更为 6

var obj = { count1: 1, count2: 2 }
observe(obj)
var watch = new Watcher(
  obj,
  function () {
    return obj.count1 + obj.count2
  },
  (val, oldVal) => {
    console.log(`count1和count2的和从 ${oldVal} 变更为 ${val}`)
  }
)
obj.count1++
obj.count2--
watch.teardown()
obj.count1++
obj.count2--
