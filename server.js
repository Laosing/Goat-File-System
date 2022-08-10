import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import express from "express"
import { createServer as createViteServer } from "vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const tree = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./src/tree.json"), "utf-8")
)

async function createServer() {
  const app = express()

  app.get("/api/v1/goat", (req, res) => {
    res.json(tree)
  })

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom"
  })

  app.use(vite.middlewares)

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      )
      template = await vite.transformIndexHtml(url, template)
      const html = template
      res.status(200).set({ "Content-Type": "text/html" }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(5173, () =>
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Listening on port 5173. Check out on http://localhost:5173"
    )
  )
}

createServer()
