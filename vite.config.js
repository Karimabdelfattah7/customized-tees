// Vite config.
// We use vite-plugin-singlefile so that "npm run build" produces ONE
// self-contained index.html file (all CSS + JS inlined) — that's the
// only way a built React app actually works when you DOUBLE-CLICK it
// from Windows Explorer. Modern browsers block external modules over
// file://, but inlined scripts run fine.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  build: {
    // Inline absolutely everything — no external asset files.
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    rollupOptions: { output: { inlineDynamicImports: true } }
  },
  server: { port: 5173, open: true }
})
