import DD from '@'

var a = new DD({
  data () {
    return {
      text: 'apple',
    }
  },
  props: {
    count1: {
      type: Number,
      default: 123
    }
  },
  watch: {
    count1: function (val, oldVal) {
      console.log(`count1 从 ${oldVal} 变更为 ${val}`)
    }
  }
  // created() {
  //   console.log('created a has num1: ' + this.num1)
  // }
})

export default a