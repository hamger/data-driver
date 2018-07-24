import { DD as DDClass } from '../instance/index'

export function initMixin(DD: typeof DDClass) {
  DD.mixin = function (mixin: any) {
    this.options = Object.assign({}, this.option, mixin)
    return this
  }
}
