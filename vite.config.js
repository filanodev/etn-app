import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const hash = Math.floor(Math.random() * 90000) + 10000;
//const hash = 10000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //vue(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['marquee'].includes(tag),
        }
      }
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/` + `[name]` + hash + `.js`,
        chunkFileNames: `assets/` + `[name]` + hash + `.js`,
        assetFileNames: `assets/` + `[name]` + hash + `.[ext]`
      }
    },
    chunkSizeWarningLimit: 2000,
  }
  /*build: {
    outDir: 'dist', // Specify the output directory for production builds
    sourcemap: false, // Disable source maps in production
    assetsInlineLimit: 0, // Disable asset inline limit
    minify: 'terser', // Minify JavaScript with Terser
    chunkSizeWarningLimit: 2000,
  },*/
})
