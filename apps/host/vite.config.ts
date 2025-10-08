import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        // host 尋找 remote 的路徑
        remote: {
          type: "module",
          name: "remote",
          entry: "http://localhost:4174/remoteEntry.js",
          entryGlobalName: "remote",
          shareScope: "default",
        },
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
