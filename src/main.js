import "./style.scss"

import tree from "./tree.json"

const sidebar = document.getElementById("sidebar")
const app = document.getElementById("app")

function getUrlHash() {
  return window.location.hash.split("#/").at(1) || ""
}

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

const folderViewer = createFolderView(tree)
console.log(folderViewer)

function buildFolderPaths(tree, parentPath = "") {
  return tree.map((el) => ({
    ...el,
    path: parentPath ? [parentPath, el.name].join("/") : el.name
  }))
}

function createFolderView(tree, parentPath = [], dictionary) {
  const routes = dictionary || new Map([["", buildFolderPaths(tree)]])

  tree.filter(isFolder).forEach((el) => {
    const path = [...parentPath, el.name].join("/")
    const children = buildFolderPaths(el.children, path)

    routes.set(path, children)

    if (el.children.length) {
      createFolderView(el.children, [path], routes)
    }
  })

  return routes
}

function createSidebarView(tree, parentNode, parentPath = []) {
  tree
    .filter(isFolder)
    .map((el) => {
      const hasChildren = el.children.length > 0 && el.children.some(isFolder)
      const path = [...parentPath, el.name].join("/")

      const dropdown =
        hasChildren && createElement("span", "▼", { class: "icon" })

      const link = createElement(
        "a",
        el.name,
        {
          href: `/#/${path}`,
          "aria-expanded":
            getUrlHash().split("/").includes(el.name) || getUrlHash() === path
        },
        [],
        [dropdown]
      )
      const ul =
        hasChildren &&
        createSidebarView(el.children, createElement("ul"), [path])
      const li = createElement("li", "", {}, [link, ul])

      return li
    })
    .forEach((el) => {
      parentNode.appendChild(el)
    })

  return parentNode
}

app.addEventListener("click", addClickEvents)

function addClickEvents(e) {
  const dropdown = e.target.closest(".icon")
  if (dropdown) {
    toggleFolder(e.target.parentNode)
    e.preventDefault()
    e.stopPropagation()
  }
}

renderSidebarView()

function renderSidebarView() {
  const items = createSidebarView(tree, createElement("ul"))
  sidebar.appendChild(items)
}

function isFolder(el) {
  return el.type === "folder"
}

const isFolderExpanded = (el) => {
  return el.getAttribute("aria-expanded") === "true"
}

function openFolder(el) {
  el.setAttribute("aria-expanded", true)
}

function closeFolder(el) {
  el.setAttribute("aria-expanded", false)
}

function toggleFolder(el) {
  isFolderExpanded(el) ? closeFolder(el) : openFolder(el)
}
