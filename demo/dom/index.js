import { create, diff, patch } from 'virtual-dom'
import createElement from './createElement'
import getTree from './getTree'

export default {
  install (DD) {
    // 挂载 data-dirver 到 el 中
    DD.$mount = function (el, dd) {
      let template = dd.$createVNode(dd.propData)
      dd.$patch(template)
      el.appendChild(dd.$el)
    }

    // 将 jsx 转化为虚拟节点
    DD.prototype.$h = function (tag, properties, ...children) {
      // console.log(tag + ' : ' + properties + ' : ' + children)
      // console.log(createElement(this, tag, properties, ...children))
      // 返回一个 VirtualNode
      return createElement(this, tag, properties, ...children)
    }

    // 在实例作用域下执行实例的 render 函数
    DD.prototype.render = function () {
      return this.$options.render.call(this, this.$h.bind(this))
    }

    // 调用组件的 render 函数，创建虚拟节点
    DD.prototype.$createVNode = function (prop) {
      let template = null
      this.$initProp(prop)
      // 建一个 watcher，观察对属性的操作
      this.$watch(
        () => {
          template = this.render.call(this)
          return template
        },
        newTemplate => {
          // 依赖变更后重绘 dom
          this.$patch(newTemplate)
        }
      )
      return template
    }

    DD.prototype.$patch = function (newTemplate) {
      // 由于是新创建和更新都在同一个函数中处理了
      // 这里的 createTree 是需要条件判断调用的
      // 所以这里的 getTree 就先认为是获取虚拟节点，之后再说
      // $vnode 保存着节点模板，对于更新来说，这个就是旧模板
      let newTree = getTree(newTemplate, this.$vnode)
      if (!this._vnode) {
        this.$el = create(newTree)
      } else {
        this.$el = patch(this.$el, diff(this._vnode, newTree))
      }
      this.$vnode = newTemplate
      this._vnode = newTree
      this.$initDOMBind(this.$el, newTemplate)
    }

    DD.prototype.$initDOMBind = function (rootDom, vNodeTemplate) {
      if (!vNodeTemplate.children || vNodeTemplate.children.length === 0) return
      for (let i = 0, len = vNodeTemplate.children.length; i < len; i++) {
        if (vNodeTemplate.children[i].isComponent) {
          vNodeTemplate.children[i].component.$el = rootDom.childNodes[i]
          this.$initDOMBind(
            rootDom.childNodes[i],
            vNodeTemplate.children[i].component.$vnode
          )
        } else {
          this.$initDOMBind(rootDom.childNodes[i], vNodeTemplate.children[i])
        }
      }
    }
  }
}
