import iconFolder from "./images/icon-folder.svg?raw"
import {
  isFolder,
  createElement,
  createSvgElement,
  getUrlHash,
  clsx,
  toggleFolder,
  closeFolder,
  openFolder,
  getUrlPath
} from "./helpers"

export function renderSidebarView(sidebar, tree) {
  const items = createSidebarView(
    tree,
    createElement("ul", "", { role: "tree" })
  )
  sidebar.appendChild(items)
}

export function createSidebarView(tree, parentNode, parentPath = []) {
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
          href: `${getUrlPath()}#/${path}`,
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

export function addClickEvents(e) {
  const dropdown = e.target.closest(".icon")
  if (dropdown) {
    toggleFolder(e.target.parentNode)
    e.preventDefault()
    e.stopPropagation()
  }
}

export function addKeyboardEvents(e) {
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

export function updateActiveMenu(sidebar) {
  sidebar
    .querySelectorAll(".menu__link")
    .forEach((el) => el.classList.remove("active"))

  const el = sidebar.querySelector(`[href='${getUrlPath()}#/${getUrlHash()}'`)
  if (el) {
    el.classList.add("active")
    openFolder(el.closest(".menu__link"))
  }
}
