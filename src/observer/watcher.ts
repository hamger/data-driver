import Dep, { pushTarget, popTarget } from './dep'

const bailRE = /[^\w.$]/
export function parsePath(path: string) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function(obj?: any) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

let uid = 0

export default class Watcher {
  id: number
  dd: Object
  callback: Function
  lazy: boolean
  dirty: boolean
  deps: Array<Dep>
  getter: Function
  value: any

  constructor(
    dd: Object,
    expOrFn: string | Function,
    callback: Function,
    options?: any
  ) {
    this.id = uid++
    this.dd = dd
    this.callback = callback
    this.deps = []

    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = function() {}
      }
    }
    this.value = this.get()
    if (options) {
      this.lazy = !!options.lazy
    } else {
      this.lazy = false
    }
    this.dirty = this.lazy
  }

  get() {
    pushTarget(this)
    const value = this.getter.call(this.dd, this.dd)
    popTarget()
    return value
  }

  update() {
    if (this.lazy) {
      this.dirty = true
      return
    }
    const value = this.getter.call(this.dd, this.dd)
    const oldValue = this.value
    this.value = value
    this.callback.call(this, value, oldValue)
  }

  /**
   * 脏检查机制手动触发更新函数
   */
  evaluate() {
    this.value = this.getter.call(this.dd)
    this.dirty = false
  }

  addDep(dep: Dep) {
    this.deps.push(dep)
    dep.addSub(this)
  }

  teardown() {
    let i = this.deps.length
    while (i--) this.deps[i].removeSub(this)
    this.deps = []
  }

  // 重新监听
  reset() {
    this.get()
  }
}
