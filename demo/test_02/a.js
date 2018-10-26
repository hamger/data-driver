import DD from '@'

var a = new DD({
  data () {
    return {
      text: 'apple',
    }
  },
  props: {
    num1: {
      type: Number,
      default: 123
    }
  },
  created() {
    console.log('created a has num1: ' + this.num1)
  }
})

a.$watch(
  function () {
    return this.num1
  },
  (val, oldVal) => {
    console.log(`num1 从 ${oldVal} 变更为 ${val}`)
  }
)

export default a