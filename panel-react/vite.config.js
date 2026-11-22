import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" supaya hasil build bisa dibuka dari subfolder apa pun,
// termasuk /panel-react/ di GitHub Pages maupun di VPS.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: { outDir: "dist", emptyOutDir: true },
});
