import DD from '@'

export default DD.extend({
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
  },
  created() {
    console.log('a has count1: ' + this.count1)
  }
})
