import { empty, noop, isPlainObject } from './util'
import { LIFECYCLE_HOOK } from '../instance/lifecycle'

export function mergeOptions(parent: any = {}, child: any = {}) {
  
  // 标准化部分特殊属性
  normalizeComputed(parent)
  normalizeComputed(child)
  normalizeProp(child)
  normalizeInject(child)

  // 直接合并 parent 和 child ，避免
  // 除 data/methods/watch/computed/LIFECYCLE_HOOK 之外的属性丢失
  let options = Object.assign({}, parent, child)

  LIFECYCLE_HOOK.forEach(name => {
    normalizeLifecycle(child, name)
    normalizeLifecycle(parent, name)
    options[name] = parent[name].concat(child[name])
  })

  // 合并 data ，一个函数
  options.data = mergeData(parent.data, child.data)

  // 合并 methods 同名覆盖
  options.methods = Object.assign(parent.methods || {}, child.methods || {})

  // 合并 watcher 同名合并成一个数组
  options.watch = mergeWatch(parent.watch, child.watch)

  // 合并 computed 同名覆盖
  options.computed = Object.assign(parent.computed || {}, child.computed || {})
  
  return options
}

function mergeData(parentValue: any = empty, childValue: any = empty) {
  return function() {
    // parentValue / childValue 是函数
    return Object.assign(parentValue.call(this), childValue.call(this))
  }
}

function mergeWatch(parentVal: any = {}, childVal: any = {}) {
  let ret = Object.assign({}, parentVal)
  for (let key in childVal) {
    let parent = ret[key]
    let child = childVal[key]
    if (parent && !Array.isArray(parent)) {
      parent = [parent]
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child)
        ? child
        : [child]
  }
  return ret
}

/**
 * 标准化 computed 结构
 * @param option
 * return {
 *   key: {
 *     get: Function,
 *     set: Function
 *   }
 * }
 */
function normalizeComputed(option: any) {
  let computed = option.computed
  for (let key in computed) {
    // 支持 option.computed[key] 为函数
    if (typeof computed[key] === 'function') {
      option.computed[key] = {
        get: computed[key],
        set: noop
      }
    }
  }
}

/**
 * 标准化 prop 结构
 * @param option
 * return {
 *   key: {
 *     type: String|Number|...,
 *     ...
 *   }
 * }
 */

function normalizeProp(option: any) {
  if (!option.prop) return

  let prop = option.prop
  let normalProps: any = {}
  // 支持 props 为数组
  if (Array.isArray(prop)) {
    prop.forEach(item => {
      normalProps[item] = {
        type: null
      }
    })
  } else {
    for (let key in prop) {
      normalProps[key] = Object.assign({ type: null }, prop[key])
    }
  }
  option.prop = normalProps
}

/**
 * 标准化 inject 结构
 * @param option
 * returns {
 *   key: {
 *     from: xxx,
 *     ...
 *   }
 * }
 */

function normalizeInject(option: any) {
  let inject = option.inject
  let normalInject: any = {}
  if (Array.isArray(inject)) {
    inject.forEach(key => {
      normalInject[key] = {
        from: key
      }
    })
  }
  if (isPlainObject(inject)) {
    for (let key in inject) {
      if (!('from' in inject[key])) {
        inject[key].from = key
      }
    }
  }
}

function normalizeLifecycle(option: any, name: string) {
  if (option[name] === undefined) {
    option[name] = []
    return
  }
  if (!Array.isArray(option[name])) {
    option[name] = [option[name]]
  }
}
