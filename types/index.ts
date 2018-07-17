import * as Util from './util'
import * as Options from './options'
import * as DataDirver from './data-dirver'

// `DD` in `export = DD` must be a namespace
// All available types are exported via this namespace
export type GeneralObj = Util.generalObj

export type Component = Options.Component
export type PropOptions = Options.PropOptions
export type ComputedOptions = Options.ComputedOptions
export type WatchOptions = Options.WatchOptions

export type dr = DataDirver.dr
export type Dr = DataDirver.Dr
