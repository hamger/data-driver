import DD from '@'
import a from './a.js'

var home = new DD({
  data () {
    return {
      text: 'hello world',
      num1: 5,
      num2: 15,
      obj: {
        subObj: {
          content: 'hide'
        }
      }
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
    },
    'obj.subObj.content': function (val, oldVal) {
      console.log(`obj.subObj.content 从 ${oldVal} 变更为 ${val}`)
    }
  },
  created() {
    this.say('home is created')
  }
})

home.$addChild(a)

home.$watch(
  function () {
    return this.num1 + this.num2
  },
  (val, oldVal) => {
    console.log(`num1 与 num2 的和从 ${oldVal} 变更为 ${val}`)
  }
)

home.num1++ // num1 与 num2 的和从 5 变更为 6
home.num2-- // num1 与 num2 的和从 6 变更为 5
home.num1 += 2 // num1 与 num2 的和从 5 变更为 7
home.num1 += 2
home.obj.subObj.content = 'show'