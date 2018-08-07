let _ = {}

_.type = obj => {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
}

_.isArray = list => {
  return _.type(list) === 'Array'
}

_.slice = (arrayLike, index) => {
  return Array.prototype.slice.call(arrayLike, index)
}

_.isString = list => {
  return _.type(list) === 'String'
}

_.isPrimitive = list => {
  return _.type(list) === 'String' || _.type(list) === 'Number'
}

_.each = (array, fn) => {
  for (var i = 0, len = array.length; i < len; i++) {
    fn(array[i], i)
  }
}

_.toArray = listLike => {
  if (!listLike) return []
  var list = []
  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i])
  }
  return list
}

_.setAttr = (node, key, value) => {
  if (value === undefined) {
    if (isClassName(key)) {
      node.removeAttribute('class')
    } else {
      node.removeAttribute(key)
    }
  } else if (key === 'style') {
    node.style.cssText = value
  } else if (key === 'value') {
    var tagName = node.tagName || ''
    tagName = tagName.toLowerCase()
    if (tagName === 'input' || tagName === 'textarea') {
      node.value = value
    } else {
      node.setAttribute(key, value)
    }
  } else if (isClassName(key)) {
    let arr = value.trim().split(' ')
    emptyClass(node)
    arr.forEach(className => {
      node.classList.add(className)
    })
  } else if (isEventProp(key)) {
    // 这里需要使用 node.onclick = func，而不使用 node.addEventListener('click', func)
    // 因为使用后者会仍然保留旧元素的事件监听，这不是希望的，所以使用前者覆盖事件监听
    node[key] = value
    // node.addEventListener(extractEventName(key), value)
  } else {
    node.setAttribute(key, value)
  }
}

// 清空类名
function emptyClass (node) {
  var arr = []
  for (var i = 0; i < node.classList.length; i++) {
    arr.push(node.classList.item(i))
  }
  arr.forEach(item => {
    node.classList.remove(item)
  })
}

function isClassName (name) {
  return /^className$/.test(name)
}

function isEventProp (name) {
  return /^on[A-Za-z]/.test(name)
}

// function extractEventName (name) {
//   return name.slice(2).toLowerCase()
// }

_.isVNode = x => {
  return x && x.type === 'VirtualNode'
}

_.isVText = x => {
  return x && x.type === 'VirtualText'
}

export default _
