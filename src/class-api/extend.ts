import { mergeOptions } from '../util/options'
import { Dr, GeneralObj } from '#'

let cid = 0

export function initExtend (DD: Dr) {
  DD.cid = cid++

  /**
   * 返回一个子组件的类
   * @param {子组件配置项} extendOptions
   */
  DD.extend = function (extendOptions: GeneralObj) {
    const Super = this

    class Sub extends Super {
      constructor (options: GeneralObj) {
        super(options)
      }
    }

    Sub.options = mergeOptions(Super.options, extendOptions)

    Sub.super = Super
    Sub.extend = Super.extend
    Sub.cid = cid++

    return Sub
  }
}
