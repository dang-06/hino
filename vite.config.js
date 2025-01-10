import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //   minify
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  // minify: false,
  resolve: {
    alias: {
    },
  },
  build: {
    minify: true,
    target: "esnext",
    chunkSizeWarningLimit: 15000,
  },
});
