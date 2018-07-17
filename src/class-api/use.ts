import { Dr } from '#'

export function initUse (DD: Dr) {
  DD.use = function (plugin: any, ...args: any[]) {
    /* 防止重复注册插件 */
    if (plugin.installed) return

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else {
      plugin.apply(null, args)
    }

    plugin.installed = true
    return this
  }
}
