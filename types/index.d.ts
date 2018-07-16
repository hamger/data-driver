import { DD as _DD } from './dd'
import * as Options from './options'
import * as Util from './util'
import * as DataDirver from './data-dirver'

// `DD` in `export = DD` must be a namespace
// All available types are exported via this namespace
declare namespace DD {
  export type Component = Options.Component
  export type PropOptions = Options.PropOptions
  export type ComputedOptions = Options.ComputedOptions
  export type WatchHandler<D extends DD> = Options.WatchHandler<D>
  export type WatchOptions = Options.WatchOptions
  export type GeneralObj = Util.generalObj
  export type dr = DataDirver.dr
}

// TS cannot merge imported class with namespace, declare a subclass to bypass
declare class DD extends _DD {}

export = DD
