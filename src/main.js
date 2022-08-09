import "./style.scss"

import tree from "./tree.json"

const sidebar = document.getElementById("sidebar")

function createElement(
  tag = "div",
  content = "",
  attributes = {},
  children = [],
  prepend = []
) {
  const el = document.createElement(tag)
  el.innerText = content
  Object.entries(attributes).forEach(([key, val]) => el.setAttribute(key, val))
  children.filter(Boolean).forEach((child) => el.appendChild(child))
  prepend.filter(Boolean).forEach((child) => el.prepend(child))
  return el
}

function createSidebarView(tree, parentNode) {
  tree
    .filter(isFolder)
    .map((el) => {
      const hasChildren = el.children.length > 0 && el.children.some(isFolder)
      const link = createElement("a", el.name)
      const ul =
        hasChildren && createSidebarView(el.children, createElement("ul"))
      const li = createElement("li", "", {}, [link, ul])

      return li
    })
    .forEach((el) => {
      parentNode.appendChild(el)
    })

  return parentNode
}

renderSidebarView()

function renderSidebarView() {
  const items = createSidebarView(tree, createElement("ul"))
  sidebar.appendChild(items)
}

function isFolder(el) {
  return el.type === "folder"
}
