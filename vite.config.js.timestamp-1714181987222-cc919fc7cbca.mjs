// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/wamp/www/PiketplaceFront/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/wamp/www/PiketplaceFront/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/wamp/www/PiketplaceFront/vite.config.js";
var hash = Math.floor(Math.random() * 9e4) + 1e4;
var vite_config_default = defineConfig({
  plugins: [
    vue()
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3YW1wXFxcXHd3d1xcXFxQaWtldHBsYWNlRnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHdhbXBcXFxcd3d3XFxcXFBpa2V0cGxhY2VGcm9udFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovd2FtcC93d3cvUGlrZXRwbGFjZUZyb250L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuY29uc3QgaGFzaCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkwMDAwKSArIDEwMDAwO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogYGFzc2V0cy9gICsgYFtuYW1lXWAgKyBoYXNoICsgYC5qc2AsXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiBgYXNzZXRzL2AgKyBgW25hbWVdYCArIGhhc2ggKyBgLmpzYCxcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IGBhc3NldHMvYCArIGBbbmFtZV1gICsgaGFzaCArIGAuW2V4dF1gXG4gICAgICB9XG4gICAgfSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gIH1cbiAgLypidWlsZDoge1xuICAgIG91dERpcjogJ2Rpc3QnLCAvLyBTcGVjaWZ5IHRoZSBvdXRwdXQgZGlyZWN0b3J5IGZvciBwcm9kdWN0aW9uIGJ1aWxkc1xuICAgIHNvdXJjZW1hcDogZmFsc2UsIC8vIERpc2FibGUgc291cmNlIG1hcHMgaW4gcHJvZHVjdGlvblxuICAgIGFzc2V0c0lubGluZUxpbWl0OiAwLCAvLyBEaXNhYmxlIGFzc2V0IGlubGluZSBsaW1pdFxuICAgIG1pbmlmeTogJ3RlcnNlcicsIC8vIE1pbmlmeSBKYXZhU2NyaXB0IHdpdGggVGVyc2VyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDAwLFxuICB9LCovXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUSxTQUFTLGVBQWUsV0FBVztBQUU5UyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFIcUosSUFBTSwyQ0FBMkM7QUFLdE4sSUFBTSxPQUFPLEtBQUssTUFBTSxLQUFLLE9BQU8sSUFBSSxHQUFLLElBQUk7QUFHakQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLEVBQ047QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixnQkFBZ0Isa0JBQXVCLE9BQU87QUFBQSxRQUM5QyxnQkFBZ0Isa0JBQXVCLE9BQU87QUFBQSxRQUM5QyxnQkFBZ0Isa0JBQXVCLE9BQU87QUFBQSxNQUNoRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
