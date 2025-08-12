import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote",
      exposes: {
        "./remote-app": "./src/remote-app.tsx",
      },
      filename: "remoteEntry.js",
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
