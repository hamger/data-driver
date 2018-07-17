import { generalObj } from './util'

export interface dr {
  $options: generalObj
  $parent: generalObj
  $root: generalObj
  $children: Array<any>
  _watch: Array<any>
  [key: string]: any
}

export interface Dr {
  cid?: number
  options: generalObj
  use(plugin: any, ...args: any[]): any
  extend(extendOptions: generalObj): any
}
