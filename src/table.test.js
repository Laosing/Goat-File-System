import { expect, test } from "vitest"
import { createFolderView } from "./table"

test("One folder should create a map of 2 elements", () => {
  const tree = [
    {
      type: "folder",
      name: "a",
      modified: 1660018217506,
      size: 0,
      children: []
    }
  ]

  const map = createFolderView(tree)

  expect(map.size).toBe(2)
  expect(map.has("")).toBe(true)
  expect(map.has("a")).toBe(true)
  expect(map.get("").at(0).name).toBe("a")
  expect(JSON.stringify(map.get("a"))).eq("[]")
})

test("Nested folders should create a map of n+1 elements", () => {
  const tree = [
    {
      type: "folder",
      name: "a",
      modified: 1660018217506,
      size: 0,
      children: [
        {
          type: "folder",
          name: "b",
          modified: 1660018217506,
          size: 0,
          children: [
            {
              type: "folder",
              name: "c",
              modified: 1660018217506,
              size: 0,
              children: []
            }
          ]
        }
      ]
    }
  ]

  const map = createFolderView(tree)

  expect(map.size).toBe(4)
  expect(map.has("")).toBe(true)
  expect(map.has("a")).toBe(true)
  expect(map.has("a/b")).toBe(true)
  expect(map.has("a/b/c")).toBe(true)
})

test("Files shouldn't show in the map", () => {
  const tree = [
    {
      type: "folder",
      name: "a",
      modified: 1660018217506,
      size: 0,
      children: [
        {
          type: "file",
          name: "b",
          modified: 1660018217506,
          size: 0,
          children: []
        }
      ]
    },
    {
      type: "file",
      name: "c",
      modified: 1660018217506,
      size: 0,
      children: []
    }
  ]

  const map = createFolderView(tree)

  expect(map.size).toBe(2)
  expect(map.has("")).toBe(true)
  expect(map.has("a")).toBe(true)
  expect(map.has("b")).toBe(false)
  expect(map.has("c")).toBe(false)
})
