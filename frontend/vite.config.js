import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // Enable Terser minification for production builds
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove all console.log statements in production
        drop_debugger: true, // Remove debugger statements
      },
    },
  },
});
