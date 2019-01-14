import Watcher from './watcher'
import { remove } from '../util/util'

let id = 0

export default class Dep {
  static target?: Watcher
  id: number
  watchers: Array<Watcher>

  constructor() {
    this.id = id++
    this.watchers = []
  }

  addWatcher(watcher: Watcher) {
    this.watchers.push(watcher)
  }

  removeWatcher(watcher: Watcher) {
    remove(this.watchers, watcher)
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify() {
    this.watchers.forEach(watcher => {
      watcher.update()
    })
  }
}

// targetStack 是为了防止监听嵌套结构时，丢失父辈 watcher
const targetStack: Array<Watcher> = []

// Dep.target 赋值为当前的渲染 watcher 并压栈（给之后的 popTarget() 消费 ）
export function pushTarget(_target: Watcher) {
  // 在一次依赖收集期间，如果有其他依赖收集任务开始（比如：当前 computed 计算属性嵌套其他 computed 计算属性），
  // 那么将会把当前 target 暂存到 targetStack，先进行其他 target 的依赖收集
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget() {
  // 当嵌套的依赖收集任务完成后，将 target 恢复为上一层的 Watcher，并继续做依赖收集
  Dep.target = targetStack.pop()
}
