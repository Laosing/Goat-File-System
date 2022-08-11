import iconFolder from "./images/icon-folder.svg?raw"
import iconImage from "./images/icon-image.svg?raw"
import iconText from "./images/icon-text.svg?raw"
import iconFile from "./images/icon-file.svg?raw"

export function getUrlHash(url) {
  return (url || window.location.hash).split("#/").at(1)?.split("?").at(0) || ""
}

export function getUrlPath() {
  return `${window.location.origin}${window.location.pathname}`
}

export function createElement(
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

export function createSvgElement(svgString = "", attributes = {}) {
  const svg = document.createRange().createContextualFragment(svgString)
  Object.entries(attributes).forEach(([key, val]) => svg.setAttribute(key, val))
  return svg
}

export function getFileType(el) {
  return isFolder(el) ? "folder" : el.name.split(".").at(1)
}

export function getIcon(type) {
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

export function formatTableItem(el, type) {
  switch (type) {
    case "modified":
      return formatDate(el[type])
    case "size":
      return formatBytes(el[type])
    default:
      return el[type]
  }
}

export function clsx(...classes) {
  return [...classes].filter(Boolean).join(" ")
}

export function isFolder(el) {
  return el.type === "folder"
}

export function isFolderExpanded(el) {
  return el.getAttribute("aria-expanded") === "true"
}

export function openFolder(el) {
  el.setAttribute("aria-expanded", true)
}

export function closeFolder(el) {
  el.setAttribute("aria-expanded", false)
}

export function toggleFolder(el) {
  isFolderExpanded(el) ? closeFolder(el) : openFolder(el)
}

export function formatDate(str) {
  return new Date(str).toLocaleDateString("en-US")
}

/**
 * Formats bytes into a more readable form
 * taken from: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 * @param {number} bytes in binary
 * @param {number} decimals
 * @returns string
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}
