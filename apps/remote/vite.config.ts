import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote",
      // remote 提供 host 引入的路徑
      exposes: {
        // host 引入名稱 ： 實際對應程式位置
        "./remote-app": "./src/remote-app.tsx",
      },
      filename: "remoteEntry.js",
      // 需共享的程式
      shared: {
        react: {
          singleton: true,
        },
      },
    }),
  ],
  server: {
    port: 5173,
  },
});
