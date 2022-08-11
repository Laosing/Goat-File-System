import { defineConfig } from "vite"
import eslint from "vite-plugin-eslint"

export default defineConfig({
  base: "/goat-file-system/",
  server: {
    open: "/index.html"
  },
  plugins: [eslint()]
})
