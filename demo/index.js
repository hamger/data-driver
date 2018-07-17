import DD from '../src/index'
// import DD from '../dist/data-dirver'
import dom from './dom/index'
import App from './component/App'
import './index.scss'

// 为DD添加操作dom的插件（在DD的原型上添加一些方法）
DD.use(dom, DD)

// 挂载dom元素
window.onload = function () {
  DD.$mount(document.getElementById('app'), App)
}

// // 使用基础 Amus 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
// let childConstructor = DD.extend({
//     data() {
//         return {
//             dataTest: 1
//         }
//     },
//     methods: {
//         methodTest() {
//             console.log('methodTest')
//         }
//     },
//     watch: {
//         'dataTest'(newValue, oldValue) {
//             console.log('watchTest newValue = ' + newValue)
//         }
//     },
//     computed: {
//         'computedTest': {
//             get() {
//                 return this.dataTest + 1
//             }
//         }
//     }
// })

// // 实例化一个子组件
// let child = new childConstructor({
//     data() {
//         return {
//             subData: 11
//         }
//     },
//     methods: {
//         subMethod() {
//             console.log('subMethodTest')
//         }
//     },
//     watch: {
//         'subData'(newValue, oldValue) {
//             console.log('subWatch newValue = ' + newValue)
//         }
//     },
//     computed: {
//         'subComputed': {
//             get() {
//                 return this.subData + 1
//             }
//         }
//     }
// })

// console.log(child.dataTest)
// // 1
// console.log(child.subData)
// // 11

// console.log(child.computedTest)
// // 2
// console.log(child.subComputed)
// // 12

// child.methodTest()
// // methodTest
// child.subMethod()
// // subMethodTest

// child.dataTest = 2
// // watchTest newValue = 2
// child.subData = 12
// // subWatch newValue = 12

// console.log(child.constructor === childConstructor)
// // true
// console.log(childConstructor.super === DD)
// // true
