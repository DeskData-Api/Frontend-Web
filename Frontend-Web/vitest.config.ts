import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      provider: "v8", // Usa o V8 para cobertura
      reporter: ["text", "json", "lcov"], // Relatórios compatíveis com SonarQube
    },
  },
});
