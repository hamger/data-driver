import { mergeOptions } from '../util/options'
import { DD as DDClass } from '../instance/index'

export function initMixin(DD: typeof DDClass) {
  DD.mixin = function (mixin: any) {
    this.option = mergeOptions(this.option, mixin)
    return this
  }
}
