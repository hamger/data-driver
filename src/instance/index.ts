import { Event } from './event'
import Watcher from '../observer/watcher'
import { isEmpty, looseEqual } from '../util/util'
import { mergeOptions } from '../util/options'
import { initProps } from './props'
import { initState } from './state'
import { callHook } from './lifecycle'

let uid = 0
export class DD extends Event {
  uid: number
  $options?: any
  $parent: any
  $root: any
  $children?: Array<any>
  _watch?: Array<any>
  [key: string]: any
  static cid: number
  static options: any
  static use: any
  static extend: any
  static mixin: any

  constructor (options: any) {
    super()
    this.uid = uid++
    this._init(options)
  }

  _init (options: any) {
    let dd: DD = this

    // 合并配置项
    dd.$options = mergeOptions(DD.options, options, dd)

    initProps(dd)

    // 触发 beforeCreate 事件
    callHook(dd, 'beforeCreate')
    initState(dd)
    // 触发 created 事件
    callHook(dd, 'created')
  }

  // 处理传入的 prop ，当传入的组件的 prop 有更新时
  // 需要调用该方法触发子组件状态更新
  $initProp (prop: any) {
    if (isEmpty(prop)) return
    // TODO 有效性验证
    let dd: DD = this
    for (let key in dd.$options.prop) {
      let value = prop[key]
      if (!value) {
        value = dd.$options.prop[key].default
      }
      if (!looseEqual(dd[key], value)) dd[key] = value
    }
  }

  // 创建一个观察者，观察者会观察在 getter 中对属性的 get 的操作
  // 当对应属性发生 set 动作时，会触发 callback
  // 新生成的观察者对象会保存在实例的 _watch 属性下
  $watch (getter: string | Function, callback: Function, option?: any) {
    let dd: DD = this
    let watch = new Watcher(dd, getter, callback, option)
    dd._watch.push(watch)
    return watch
  }
}
