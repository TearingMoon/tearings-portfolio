import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { templateCompilerOptions } from "@tresjs/core";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
