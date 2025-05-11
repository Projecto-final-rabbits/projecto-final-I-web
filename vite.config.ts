import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/types/**",
        "**/interfaces/**",
        "**/core/domain/interfaces/**",
        "**/index.ts",
        "**/*.d.ts",
        "**/__mocks__/**",
        "src/main.tsx",
        "src/theme.ts",
        "src/utils/countries.ts",
        "src/utils/styles.ts",
        "*.js",
        "*.config.*",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@state": path.resolve(__dirname, "./src/state-management"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@services": path.resolve(__dirname, "./src/services"),
    },
  },
});
