import Dep, { pushTarget, popTarget } from './dep'

// 解析链式引用，parsePath(a.b.c) 返回一个函数: obj => obj.a.b.c
const bailRE = /[^\w.$]/
function parsePath(path: string) {
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

// 判断某项是否在数组中
function isHas (arr: Array<any>, item: any) {
  if (arr.some((element) => {
    if (item.id === element.id) return true
  })) {
    return true
  } else {
    return false
  }
}

let id = 0

export default class Watcher {
  id: number
  dd: Object
  callback: Function
  deps: Array<Dep>
  newDeps: Array<Dep>
  getter: Function
  value: any

  constructor(dd: Object, expOrFn: string | Function, callback: Function) {
    this.id = id++
    this.dd = dd
    this.callback = callback
    this.deps = []
    this.newDeps = []

    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) this.getter = function() {}
    }
    this.value = this.get()
  }

  // 添加监听，并取值
  get() {
    pushTarget(this)
    const value = this.getter.call(this.dd, this.dd)
    popTarget()
    this.cleanupDeps()
    return value
  }

  // 更新值，并触发监听
  update() {
    const value = this.get()
    if (value !== this.value) {
      const oldValue = this.value
      this.value = value
      this.callback.call(this.dd, value, oldValue)
    }
  }

  // 添加一个依赖
  addDep(dep: Dep) {
    if (!isHas(this.newDeps, dep)) {
      this.newDeps.push(dep)
      if (!isHas(this.deps, dep)) dep.addWatcher(this)
    }
  }

  /**
   * 清除遗留 dep
   * 更新 deps ，清空 newDeps
   */
  cleanupDeps() {
    this.deps.forEach(dep => {
      if (!isHas(this.newDeps, dep)) dep.removeWatcher(this)
    })
    let tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  // watcher 拆卸自己：通知 dep 移除我，dep 调用 dep.removeWatcher(watcher) 移除之
  teardown() {
    let i = this.deps.length
    while (i--) this.deps[i].removeWatcher(this)
    this.deps = []
  }
}
