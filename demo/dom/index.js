import { create, diff, patch } from 'virtual-dom'
import createElement from './createElement'
import getTree from './getTree'
// import VD from '../virtual-dom-h'
// let { create, diff, patch } = VD

export default {
  install (DD) {
    DD.$mount = function (el, dd) {
      let template = dd.$createVNode(dd.propData)
      dd.$patch(template)
      el.appendChild(dd.$el)
    }

    DD.prototype.$h = function (tag, properties, ...children) {
      // console.log(tag, properties, children)
      // console.log(createElement(this, tag, properties, ...children))
      return createElement(this, tag, properties, ...children)
    }

    DD.prototype.render = function () {
      return this.$options.render.call(this, this.$h.bind(this))
    }

    DD.prototype.$createVNode = function (prop) {
      let template = null
      this.$initProp(prop)
      this.$watch(
        () => {
          template = this.render.call(this)
          return template
        },
        newTemplate => {
          this.$patch(newTemplate)
        }
      )
      return template
    }

    DD.prototype.$patch = function (newTemplate) {
      let newTree = getTree(newTemplate, this.$vnode)
      if (!this._vnode) {
        this.$el = create(newTree)
      } else {
        this.$el = patch(this.$el, diff(this._vnode, newTree))
      }
      // 保存老的虚拟模板
      this.$vnode = newTemplate
      this._vnode = newTree
      this.$initDOMBind(this.$el, newTemplate)
      // console.log(newTemplate)
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
