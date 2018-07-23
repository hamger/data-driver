import observe from '../observer/observer'
import Watcher from '../observer/watcher'
import Computed from '../observer/computed'
import { proxy } from '../util/util'
import { normalizeComputed, normalizeProp } from '../util/options'
import { DD } from './index'
/**
 * 代理配置项
 * @param dd
 */
export function initState(dd: DD) {
  let opt = dd.$options
  // 观察并代理 data 属性中数据
  if (opt.data) initData(dd)
  // 观察并代理 props 属性中数据
  if (opt.props) initProp(dd)
  // 处理 watch 属性内容
  if (opt.watch) initWatch(dd)
  // 处理 computed 属性内容
  if (opt.computed) initComuted(dd)
  // 代理 methods 属性中方法
  if (opt.methods) initMethod(dd)
}

function initData(dd: DD) {
  let data = (dd._data = dd.$options.data ? dd.$options.data.call(dd) : {})
  observe(data)
  for (let key in dd._data) {
    proxy(dd, '_data', key)
  }
}

function initProp(dd: DD) {
  normalizeProp(dd.$options)
  let props: any = {}
  // 根据 props 中的 key 去 propData 中取值
  let propData = dd.$options.propData || {}
  for (let key in dd.$options.props) {
    let value = propData[key]
    console.log(dd.$options.props[key].type)
    if (!value) value = dd.$options.props[key].default
    props[key] = value
  }
  dd._props = props
  observe(props)
  for (let key in dd._props) {
    proxy(dd, '_props', key)
  }
}

function initWatch(dd: DD) {
  for (let key in dd.$options.watch) {
    new Watcher(
      dd,
      () => {
        return key.split('.').reduce((obj, name) => obj[name], dd)
      },
      (newValue: any, oldValue: any) => {
        dd.$options.watch[key].forEach((fnc: Function) =>
          fnc(newValue, oldValue)
        )
      }
    )
  }
}

function initComuted(dd: DD) {
  normalizeComputed(dd.$options)
  for (let key in dd.$options.computed) {
    new Computed(dd, key, dd.$options.computed[key])
  }
}

function initMethod(dd: DD) {
  for (let key in dd.$options.methods) {
    dd[key] = dd.$options.methods[key].bind(dd)
  }
}
