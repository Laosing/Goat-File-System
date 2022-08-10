import "./style.scss"

import tree from "./tree.json"

import {
  addClickEvents,
  addKeyboardEvents,
  updateActiveMenu,
  renderSidebarView
} from "./sidebar"
import { renderFolderView } from "./table"

const sidebar = document.getElementById("sidebar")
const app = document.getElementById("app")
const main = document.getElementById("main")

app.addEventListener("click", addClickEvents)
app.addEventListener("keydown", addKeyboardEvents)

window.addEventListener("hashchange", () => {
  updateActiveMenu(sidebar)
  renderFolderView(main, tree)
})

renderFolderView(main, tree)
renderSidebarView(sidebar, tree)
