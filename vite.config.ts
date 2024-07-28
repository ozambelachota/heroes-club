import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/page": path.resolve(__dirname, "./src/page"),
      "@/query": path.resolve(__dirname, "./src/query"),
      "@/store": path.resolve(__dirname, "./src/store"),
    },
  },
});
