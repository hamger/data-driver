import { h, VNode } from 'virtual-dom'
import DD from '../../src/index'

export default function createElement (ctx, tag, properties, ...children) {
  // 如果 tag 是自定义的标签，例如 <Title></Title>, 返回该虚拟节点
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
