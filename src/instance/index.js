import {
  Event
} from '../observer/event'
import Watcher from '../observer/watcher'
import {
  isEmpty,
  equals
} from '../util/util'
import {
  mergeOptions
} from '../util/options'
import {initProps} from './props'
import {initState} from './state'
import {callHook} from './lifecycle'

let uid = 0

export class DD extends Event {
  constructor (options) {
    super()
    this.uid = uid++
    this._init(options)
  }

  _init (options) {
    let vm = this

    // 合并配置项
    vm.$options = mergeOptions(
      this.constructor.options,
      options,
      vm
    )

    initProps(vm)

    // 触发 beforeCreate 事件
    callHook(vm, 'beforeCreate')
    initState(vm)

    // 触发 created 事件
    callHook(vm, 'created')
  }

  // 处理传入的 prop ，当传入的组件的 prop 有更新时
  // 需要调用该方法触发子组件状态更新
  $initProp (prop) {
    if (isEmpty(prop)) return
    // TODO 有效性验证
    let vm = this
    for (let key in vm.$options.prop) {
      let value = prop[key]
      if (!value) {
        value = vm.$options.prop[key].default
      }
      if (!equals(vm[key], value)) vm[key] = value
    }
  }

  // 创建一个观察者，观察者会观察在 getter 中对属性的 get 的操作
  // 当对应属性发生 set 动作时，会触发 callback
  // 新生成的观察者对象会保存在实例的 _watch 属性下
  $watch (getter, callback, option) {
    let watch = new Watcher(this, getter, callback, option)
    this._watch.push(watch)
    return watch
  }
}
