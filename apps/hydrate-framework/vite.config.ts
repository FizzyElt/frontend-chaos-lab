import { svelte } from "@sveltejs/vite-plugin-svelte";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({ exclude: ["src/**/*.solid.tsx"] }),
    svelte(),
    solid({ include: ["src/**/*.solid.tsx"] }),
    tsconfigPaths({ root: "./" }),
  ],
});
