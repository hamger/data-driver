import DD from '.'

export const LIFECYCLE_HOOK = [
  'beforeCreate',
  'created',
  'beforeDestroy',
  'destroyed'
]

/**
 * 触发实例的生命周期钩子
 * @param dd
 * @param hook
 */
export function callHook (dd: DD, hook: string): void {
  const handler = dd.$options[hook]
  if (handler) {
    for (let i = 0, j = handler.length; i < j; i++) {
      handler[i].call(dd)
    }
  }
}
