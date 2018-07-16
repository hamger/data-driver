import { initExtend } from './extend'
import { initUse } from './use'

export function initClassApi (DD) {
  // 设置初始 options
  DD.options = {
    components: {},
    _base: DD
  }

  // 子类生成方法
  initExtend(DD)

  // 扩展
  initUse(DD)
}
