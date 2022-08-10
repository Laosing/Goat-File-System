import { expect, test } from "vitest"
import { clsx, formatBytes, formatDate, getUrlHash } from "./helpers"

test("Should get hash from a url", () => {
  expect(getUrlHash("http://test.com/#/a/b/c")).toBe("a/b/c")
  expect(getUrlHash("http://test.com/#/slug?test=params")).toBe("slug")
  expect(getUrlHash("http://test.com?hi=1#/slug1/slug2")).toBe("slug1/slug2")
  expect(getUrlHash("http://localhost/#/Files")).toBe("Files")
  expect(getUrlHash("http://localhost/")).toBe("")
})

test("Should return a list of classes", () => {
  const falsey = false
  expect(clsx("a", "b", falsey && "c")).toBe("a b")
  expect(clsx(falsey && "a", falsey || "b")).toBe("b")
  expect(clsx(...[1, 2, 3])).toBe("1 2 3")
  expect(clsx("")).toBe("")
})

test("Should format the date in MM/DD/YYYY", () => {
  expect(formatDate(1660103469973)).toBe("8/9/2022")
  expect(formatDate("2016-08-25T21:34:13.111Z")).toBe("8/25/2016")
  expect(formatDate(new Date(2014, 9, 6))).toBe("10/6/2014")
  expect(formatDate(undefined)).toBe("Invalid Date")
  expect(formatDate("")).toBe("Invalid Date")
  expect(formatDate("1660103469973")).toBe("Invalid Date")
})

test("Should format binary bytes", () => {
  expect(formatBytes(0)).toBe("0 Bytes")
  expect(formatBytes(2048)).toBe("2 KB")
  expect(formatBytes(Math.pow(2, 10))).toBe("1 KB")
  expect(formatBytes(Math.pow(2, 20))).toBe("1 MB")
  expect(formatBytes(Math.pow(2, 30))).toBe("1 GB")
  expect(formatBytes(Math.pow(2, 40))).toBe("1 TB")
  expect(formatBytes(Math.pow(2, 50))).toBe("1 PB")
})
