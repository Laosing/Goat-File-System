import "./style.scss"

import tree from "./tree.json"

import iconFolder from "./images/icon-folder.svg?raw"
import iconImage from "./images/icon-image.svg?raw"
import iconText from "./images/icon-text.svg?raw"
import iconFile from "./images/icon-file.svg?raw"

const sidebar = document.getElementById("sidebar")
const app = document.getElementById("app")
const main = document.getElementById("main")

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
      const icon = createSvgElement(iconFolder)

      const linkAttributes = hasChildren && {
        "aria-owns": path,
        "aria-expanded":
          getUrlHash().split("/").includes(el.name) || getUrlHash() === path
      }
      const link = createElement(
        "a",
        el.name,
        {
          href: `/#/${path}`,
          class: clsx("menu__link", getUrlHash() === path && "active"),
          role: "treeitem",
          ...linkAttributes
        },
        [],
        [icon, dropdown]
      )

      const ul =
        hasChildren &&
        createSidebarView(
          el.children,
          createElement("ul", "", {
            id: path,
            role: "group"
          }),
          [path]
        )
      const li = createElement("li", "", { role: "none" }, [link, ul])

      return li
    })
    .forEach((el) => {
      parentNode.appendChild(el)
    })

  return parentNode
}

app.addEventListener("click", addClickEvents)
app.addEventListener("keydown", addKeyboardEvents)

function addClickEvents(e) {
  const dropdown = e.target.closest(".icon")
  if (dropdown) {
    toggleFolder(e.target.parentNode)
    e.preventDefault()
    e.stopPropagation()
  }
}

function addKeyboardEvents(e) {
  switch (e.key) {
    case "ArrowLeft":
      closeFolder(e.target)
      break
    case "ArrowRight":
      openFolder(e.target)
      break
    default:
      break
  }
}

function updateActiveMenu() {
  sidebar
    .querySelectorAll(".menu__link")
    .forEach((el) => el.classList.remove("active"))

  const el = sidebar.querySelector(`[href='/#/${getUrlHash()}'`)
  if (el) {
    el.classList.add("active")
    openFolder(el.closest(".menu__link"))
  }
}

window.addEventListener("hashchange", () => {
  updateActiveMenu()
  renderFolderView()
})
renderFolderView()
renderSidebarView()

function renderSidebarView() {
  const items = createSidebarView(
    tree,
    createElement("ul", "", { role: "tree" })
  )
  sidebar.appendChild(items)
}

function renderFolderView() {
  main.replaceChildren()

  folderViewer
    .get(getUrlHash())
    .reduce(createTableFiles, [createTable()])
    .forEach((el) => main.appendChild(el))
}

function createSvgElement(svgString = "", attributes = {}) {
  const svg = document.createRange().createContextualFragment(svgString)
  Object.entries(attributes).forEach(([key, val]) => svg.setAttribute(key, val))
  return svg
}

function getFileType(el) {
  return isFolder(el) ? "folder" : el.name.split(".").at(1)
}

function getIcon(type) {
  let svg
  switch (type) {
    case "png":
    case "jpg":
    case "jpeg":
      svg = iconImage
      break

    case "txt":
    case "json":
      svg = iconText
      break

    case "folder":
      svg = iconFolder
      break

    default:
      svg = iconFile
      break
  }

  return createSvgElement(svg)
}

function isFolder(el) {
  return el.type === "folder"
}

function createTable() {
  const th = ["Name", "Date Modified", "File Size"].map((heading) =>
    createElement("th", heading)
  )
  const tr = createElement("tr", "", {}, [...th])
  const table = createElement("table", "", { class: "table" }, [tr])
  return table
}

function createTableFiles([accum], el) {
  const icon = getIcon(getFileType(el))
  const headers = ["name", "modified", "size"]
  const td = headers.map((type, ind) => {
    const a = createElement(
      "a",
      el[type],
      {
        href: `/#/${el.path}`,
        tabindex: isFolder(el) ? (ind === 0 ? 0 : -1) : -1,
        disabled: isFolder(el) === false
      },
      [],
      [ind === 0 && icon]
    )
    return createElement("td", "", {}, [a])
  })

  const tr = createElement("tr", "", {}, [...td])
  accum.appendChild(tr)
  return [accum]
}

function clsx(...classes) {
  return [...classes].filter(Boolean).join(" ")
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
