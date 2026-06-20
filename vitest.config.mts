import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// Unit-test configuration for the front-end (Vitest + React Testing Library).
// - Uses the `.mts` extension so the ESM-only `@vitejs/plugin-react` loads correctly
//   in this (CommonJS-default) project without forcing "type": "module" everywhere.
// - `jsdom` provides a browser-like DOM so React components can render in Node.
// - `setupFiles` loads jest-dom matchers once for every test.
// - The `@` alias mirrors tsconfig (`@/* -> ./src/*`) so imports resolve as in Next.js.
export default defineConfig({
  plugins: [react()],
  // tsconfig uses `jsx: "preserve"`, which makes esbuild fall back to the classic
  // runtime (requires a React import). Force the automatic runtime for tests.
  esbuild: { jsx: "automatic" },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
