import observe from '../observer/observer'
import Watcher from '../observer/watcher'
import Computed from '../observer/computed'
import { proxy, getProvideForInject } from '../util/util'
import { dr, GeneralObj } from '#'

/**
 * 代理配置项
 * @param dd
 */
export function initState (dd: dr) {
  // 代理 methods 属性中方法
  for (let key in dd.$options.methods) {
    dd[key] = dd.$options.methods[key].bind(dd)
  }

  // 观察并代理 data 属性中数据
  let data = (dd._data = dd.$options.data ? dd.$options.data.call(dd) : {})
  observe(data)
  for (let key in dd._data) {
    proxy(dd, '_data', key)
  }

  // 观察并代理 props 属性中数据
  let props: GeneralObj = (dd._props = {})
  let propsData = dd.$options.propsData
  for (let key in dd.$options.props) {
    let value = propsData[key]
    if (!value) {
      value = dd.$options.props[key].default
    }
    props[key] = value
  }
  observe(props)
  for (let key in props) {
    proxy(dd, '_props', key)
  }

  // 处理 watcher 属性内容
  for (let key in dd.$options.watch) {
    new Watcher(
      dd,
      () => {
        return key.split('.').reduce((obj, name) => obj[name], dd)
      },
      (newValue: any, oldValue: any) => {
        dd.$options.watch[key].forEach((fnc: Function) => fnc(newValue, oldValue))
      }
    )
  }

  // 处理 computed 属性内容
  for (let key in dd.$options.computed) {
    new Computed(dd, key, dd.$options.computed[key])
  }

  // 处理 provide / inject 属性内容
  dd._provide = dd.$options.provide
  let inject: GeneralObj = (dd._inject = {})
  for (let key in dd.$options.inject) {
    inject[key] = getProvideForInject(dd, key, dd.$options.inject[key].default)
  }
  for (let key in inject) {
    proxy(dd, '_inject', key)
  }
}
