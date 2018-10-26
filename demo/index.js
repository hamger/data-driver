import DD from '../src'

var demo = new DD({
  data () {
    return {
      text: 'hello world',
      num1: 5,
      num2: 6
    }
  },
  created() {
    console.log('created')
  }
})

var watch2 = demo.$watch('text', (val, oldVal) => {
  console.log(`text的值从 ${oldVal} 变更为 ${val}`)
})

demo.text = 'hello data-dirver'
// text的值从 hello world 变更为 hello data-dirver

demo.$watch(
  function () {
    return this.num1 + this.num2
  },
  (val, oldVal) => {
    console.log(`num1 与 num2 的和从 ${oldVal} 变更为 ${val}`)
  }
)

demo.num1++ // num1 与 num2 的和从 5 变更为 6
demo.num2-- // num1 与 num2 的和从 6 变更为 5
demo.$cancelWatch(watch2) // 取消对 text 属性的监听
demo.text = 'hi data-dirver'
demo.num1 += 2 // num1 与 num2 的和从 5 变更为 7
demo.$cancelWatch() // 取消对所有属性的监听
demo.num1 += 2
