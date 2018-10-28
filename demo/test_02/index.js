import DD from '@'
import a from './a.js'

var home = new DD({
  data () {
    return {
      num1: 1,
      num2: 2,
    }
  },
  methods: {
    say (str) {
      console.log(str)
    }
  },
  watch: {
    num1: function (val, oldVal) {
      console.log(`num1 从 ${oldVal} 变更为 ${val}`)
    }
  },
  created() {
    this.say('home is created')
  }
})

home.$addChild(a, {
  count1: this.num1
})

home.num1++ // num1 从 1 变更为 2