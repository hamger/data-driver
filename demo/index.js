import Seed from './seed/index'
import App from './component/App'
import './index.scss'

// 挂载dom元素
window.onload = function () {
  Seed.$mount(document.getElementById('app'), App)
}
