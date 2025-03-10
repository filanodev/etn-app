// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/wamp/www/PiketplaceFront/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/wamp/www/PiketplaceFront/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/wamp/www/PiketplaceFront/vite.config.js";
var hash = Math.floor(Math.random() * 9e4) + 1e4;
var vite_config_default = defineConfig({
  plugins: [
    //vue(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["marquee"].includes(tag)
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]` + hash + `.js`,
        chunkFileNames: `assets/[name]` + hash + `.js`,
        assetFileNames: `assets/[name]` + hash + `.[ext]`
      }
    },
    chunkSizeWarningLimit: 2e3
  }
  /*build: {
    outDir: 'dist', // Specify the output directory for production builds
    sourcemap: false, // Disable source maps in production
    assetsInlineLimit: 0, // Disable asset inline limit
    minify: 'terser', // Minify JavaScript with Terser
    chunkSizeWarningLimit: 2000,
  },*/
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3YW1wXFxcXHd3d1xcXFxQaWtldHBsYWNlRnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHdhbXBcXFxcd3d3XFxcXFBpa2V0cGxhY2VGcm9udFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovd2FtcC93d3cvUGlrZXRwbGFjZUZyb250L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuY29uc3QgaGFzaCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkwMDAwKSArIDEwMDAwO1xuLy9jb25zdCBoYXNoID0gMTAwMDA7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgLy92dWUoKSxcbiAgICB2dWUoe1xuICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICAgICAgaXNDdXN0b21FbGVtZW50OiAodGFnKSA9PiBbJ21hcnF1ZWUnXS5pbmNsdWRlcyh0YWcpLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBgYXNzZXRzL2AgKyBgW25hbWVdYCArIGhhc2ggKyBgLmpzYCxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGBhc3NldHMvYCArIGBbbmFtZV1gICsgaGFzaCArIGAuanNgLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogYGFzc2V0cy9gICsgYFtuYW1lXWAgKyBoYXNoICsgYC5bZXh0XWBcbiAgICAgIH1cbiAgICB9LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMjAwMCxcbiAgfVxuICAvKmJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCcsIC8vIFNwZWNpZnkgdGhlIG91dHB1dCBkaXJlY3RvcnkgZm9yIHByb2R1Y3Rpb24gYnVpbGRzXG4gICAgc291cmNlbWFwOiBmYWxzZSwgLy8gRGlzYWJsZSBzb3VyY2UgbWFwcyBpbiBwcm9kdWN0aW9uXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDAsIC8vIERpc2FibGUgYXNzZXQgaW5saW5lIGxpbWl0XG4gICAgbWluaWZ5OiAndGVyc2VyJywgLy8gTWluaWZ5IEphdmFTY3JpcHQgd2l0aCBUZXJzZXJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gIH0sKi9cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJRLFNBQVMsZUFBZSxXQUFXO0FBRTlTLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUhxSixJQUFNLDJDQUEyQztBQUt0TixJQUFNLE9BQU8sS0FBSyxNQUFNLEtBQUssT0FBTyxJQUFJLEdBQUssSUFBSTtBQUlqRCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUE7QUFBQSxJQUVQLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxRQUNSLGlCQUFpQjtBQUFBLFVBQ2YsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxTQUFTLEdBQUc7QUFBQSxRQUNwRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCLGtCQUF1QixPQUFPO0FBQUEsUUFDOUMsZ0JBQWdCLGtCQUF1QixPQUFPO0FBQUEsUUFDOUMsZ0JBQWdCLGtCQUF1QixPQUFPO0FBQUEsTUFDaEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxFQUN6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
