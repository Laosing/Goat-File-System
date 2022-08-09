import { defineConfig } from "vite"
import eslint from "vite-plugin-eslint"

export default defineConfig({
  server: {
    open: "/index.html"
  },
  plugins: [eslint()]
})
