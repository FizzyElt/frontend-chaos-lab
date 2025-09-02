import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import lime from "@park-ui/panda-preset/colors/lime";
import sand from "@park-ui/panda-preset/colors/sand";

export default defineConfig({
  preflight: true,
  presets: [createPreset({ accentColor: lime, grayColor: sand, radius: "sm" })],
  include: ["./src/**/*.{js,jsx,ts,tsx,vue,svelte}"],
  jsxFramework: "react", // or 'solid' or 'vue'
  outdir: "styled-system",
});
