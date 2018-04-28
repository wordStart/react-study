const React = {
  createElement
}
function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  }
}
// render方法接受俩个参数，一个是虚拟dom，一个是实际挂载的对象
function render(vnode, container) {
  // vnode = {tag, attrs, children}
  if (typeof vnode === 'string') {
    const TextNode = document.createTextNode(vnode)
    return container.appendChild(TextNode)
  }
  const dom = document.createElement(vnode.tag)
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key]
      setAttribute(dom, key, value)
    })
  }
  vnode.children.forEach(chlid => render(chlid, dom));
  return container.appendChild(dom)
}
function setAttribute(dom, name, value) {
  // 如果是className，就切成class
  if (name === 'className') name = 'class';
  // 如果是onXXX，事件绑定，就添加事件
  if (/on\w+/.test(name)) {
    name = name.toLowerCase()
    dom[name] = value || ''
  } else if (name === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || ''
    } else if (value || typeof value === 'object') {
      for (let name in value) {
        dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name]
      }
    }
  } else {
    dom.setAttribute(name, value)
  }
}
const ReactDOM = {
  render: (vnode, container) => {
    container.innerHTML = '';
    return render(vnode, container)
  }
}
ReactDOM.render('aaa', document.getElementById('root'))