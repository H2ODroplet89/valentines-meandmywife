import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-headers",
      closeBundle() {
        try {
          copyFileSync("_headers", "dist/_headers");
        } catch (e) {
          console.warn("Could not copy _headers file:", e.message);
        }
      },
    },
  ],
});
