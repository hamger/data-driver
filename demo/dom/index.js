import { create, diff, patch } from 'virtual-dom'
import createElement from './createElement'
import getTree from './getTree'

export default {
  install (DD) {
    DD.$mount = function (el, dd) {
      let template = null
      dd.$initProp(dd.propData)
      dd.$renderWatch = dd.$watch(
        () => {
          template = dd.render.call(dd)
          return template
        },
        newTemplate => {
          dd.$patch(newTemplate)
        }
      )
      dd.$patch(template)
      el.appendChild(dd.$el)
    }

    DD.prototype.$createElement = function (tag, properties, ...children) {
      return createElement(this, tag, properties, ...children)
    }

    DD.prototype.render = function () {
      return this.$options.render.call(this, this.$createElement.bind(this))
    }

    DD.prototype.$createComponentVNode = function (prop) {
      let template = null
      this.$initProp(prop)
      this.$renderWatch = this.$watch(
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
