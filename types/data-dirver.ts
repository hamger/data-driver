import { generalObj } from './util'

export interface dr {
  $options: generalObj
  $parent: generalObj
  $root: generalObj
  $children: Array<any>
  _watch: Array<any>
  [key: string]: any
}
