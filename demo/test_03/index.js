import DD, {Watcher} from '@'
import Sub from './sub.js'
import SubSub from './subSub.js'

var main = new DD({
  data () {
    return {
      count: 0,
      A: {
        a: 1
      }
    }
  },
  methods: {
    setCount (num) {
      this.count = num
    }
  },
  watch: {
    'A.a': function (val, oldVal) {
      console.log(`main.A.a 从 ${oldVal} 变更为 ${val}`)
    }
  },
})

// 键名前加 ‘:’ 表示该属性是动态属性，不加表示静态属性
var sub = main.$addChild(Sub,  {
  fatherName : 'main',
  ':dynamicA': 'A.a' // 动态属性的值为父实例属性的表达式
})
var subSub = sub.$addChild(SubSub, {
  fatherName : 'sub',
  ':dynamicB': 'dynamicA'
})
console.log(main.$children.length) // => 1
console.log(sub.fatherName) // => main
console.log(subSub.fatherName) // => sub
main.A.a++
// A.a 从 1 变更为 2
// sub.dynamicA 从 0 变更为 2
// subSub.dynamicB 从 0 变更为 2
main.A.a++
// A.a 从 2 变更为 3
// sub.dynamicA 从 2 变更为 3
// subSub.dynamicB 从 2 变更为 3
console.log(main.count)
sub.$emit('setFatherCount', 70)
console.log(main.count)
// sub.$destroy() // 销毁子实例
// main.A.a++
// // A.a 从 3 变更为 4
// console.log(main.$children.length) // => 0

// let main = new DD({
//     data() {
//         return {
//             A: {
//                 a: 1
//             }
//         }
//     },
//     components: {
//         sub: {
//             props: {
//                 fatherName: {
//                     default: 'DefaultfatherName'
//                 },
//                 dynamicA: {
//                     default: 'defaultDynamicA'
//                 }
//             },
//             watch: {
//                 'dynamicA'(newValue, oldValue) {
//                     console.log('dynamicA newValue = ' + newValue)
//                 }
//             }
//         }
//     }
// })

// // 假设这是模板解析出来的数据
// // 比如模板是这样 <sub fatherName="propsStaticValue" :dynamicA="A.a"></sub>
// // 在 vue 中使用 :/v-bind 就是动态绑定
// let propsOption = [{
//     A: 'fatherName',
//     value: 'propsStaticValue',
//     isDynamic: false
// }, {
//     A: 'dynamicA',
//     value: 'A.a',
//     isDynamic: true
// }]

// let propsData = {}
// propsOption.forEach(item => {
//     if (item.isDynamic) {
//         propsData[item.A] = item.value.split('.').reduce((obj, name) => obj[name], main)
//     } else {
//         propsData[item.A] = item.value
//     }
// })

// // 配置是静态的所以应该是扩展的时候传入
// let testSubClass = DD.extend(main.$options.components.sub)
// // props 数据是动态所以应该是生成实例的时候传入
// let sub = new testSubClass({parent: main, propsData})

// // 添加监听，将父实例的变化映射到子实例中
// propsOption.forEach(item => {
//     if (item.isDynamic) {
//         new Watcher({}, () => {
//             return item.value.split('.').reduce((obj, name) => obj[name], main)
//         }, (newValue, oldValue) => {
//             sub[item.A] = newValue
//         })
//     }
// })

// console.log(sub.fatherName)
// // propsStaticValue
// console.log(sub.dynamicA)
// // 1

// main.A.a = 2
// // dynamicA newValue = 2

// console.log(sub.dynamicA)
// // 2
