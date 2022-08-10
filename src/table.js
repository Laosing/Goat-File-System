import {
  createElement,
  createSvgElement,
  formatTableItem,
  getFileType,
  getIcon,
  getUrlHash,
  isFolder
} from "./helpers"
import iconLost from "./images/icon-lost.svg?raw"

export function renderFolderView(main, tree) {
  main.replaceChildren()

  const items = createFolderView(tree).get(getUrlHash()) || []

  if (items.length) {
    items
      .reduce(createTableFiles, [createTable()])
      .forEach((el) => main.appendChild(el))
  } else {
    main.appendChild(createEmptyFolder())
  }
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
      formatTableItem(el, type),
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

function buildFolderPaths(tree, parentPath = "") {
  return tree.map((el) => ({
    ...el,
    path: parentPath ? [parentPath, el.name].join("/") : el.name
  }))
}

export function createFolderView(tree, parentPath = [], dictionary) {
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

export function createEmptyFolder() {
  const h1 = createElement("h1", "You found a goat!")
  const p = createElement(
    "p",
    "If it wasn't what you were looking for try another folder!"
  )
  const icon = createSvgElement(iconLost)
  const back = createElement("button", "Go back", { class: "button go-back" })

  back.addEventListener("click", () => window.history.back())

  const folder = createElement("div", "", { class: "folder-empty" }, [
    icon,
    h1,
    p,
    back
  ])
  return folder
}
