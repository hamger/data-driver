import DD from '../src/index'
// import DD from '../dist/data-dirver.js'
import dom from './dom/index'

// 为DD添加操作dom的插件（在DD的原型上添加一些方法）
DD.use(dom, DD)

export default DD
