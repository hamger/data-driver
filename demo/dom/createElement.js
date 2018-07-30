import { h, VNode } from 'virtual-dom'
import DD from '../../src/index'
// import VD from '../virtual-dom-h'
// let { h } = VD

export default function createElement (ctx, tag, properties, ...children) {
  // console.log(children)

  if (typeof tag === 'function' || typeof tag === 'object') {
    let node = new VNode()
    node.tagName = `component-${tag.cid}`
    node.properties = properties
    node.children = children
    node.parent = ctx
    node.isComponent = true
    if (typeof tag === 'function') {
      node.componentClass = tag
    } else {
      node.componentClass = DD.extend(tag)
    }
    return node
  }
  return h(tag, properties, children)
}
