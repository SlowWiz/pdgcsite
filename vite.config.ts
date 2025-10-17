import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config for GitHub Pages + cache-busting
export default defineConfig({
  plugins: [react()],
  base: "/", // 👈 repo name
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        // Add content hashes to assets (images, fonts, etc.)
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp|ico)$/i.test(name ?? "")) {
            return "assets/[name]-[hash][extname]";
          }
          if (/\.(css)$/i.test(name ?? "")) {
            return "assets/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
