import DD from '.'
import { defineReactive } from '../observer/observer'

export function initProvide (dd: DD) {
  const provide = dd.$options.provide
  if (provide) {
    dd._provided = typeof provide === 'function'
      ? provide.call(dd)
      : provide
  }
}

export function initInjections (dd: DD) {
  const result: any = resolveInject(dd.$options.inject, dd)
  if (result) {
    Object.keys(result).forEach(key => {
      defineReactive(dd, key, result[key])
    })
  }
}

export function resolveInject (inject: any, dd: DD) {
  if (inject) {
    const result = Object.create(null)
    const keys = Object.keys(inject)
    for (var i = 0; i < keys.length; i++) {
      const key = keys[i]
      const provideKey = inject[key].from
      let source = dd
      // 向上查找最近的 _provided
      while (source) {
        if (source._provided && source._provided.hasOwnProperty(provideKey)) {
          result[key] = source._provided[provideKey]
          break
        }
        source = source.$parent
      }
      if (!source) {
        if ('default' in inject[key]) {
          const provideDefault = inject[key].default
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(dd)
            : provideDefault
        }
      }
    }
  }
}
