import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: "https://uat-vision.alvisual.xyz",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/api", "/"),
      },
      "/scan-image": {
        target: "https://vision-dev-db.sgp1.digitaloceanspaces.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/scan-image", "/"),
      },
    },
  },
});
