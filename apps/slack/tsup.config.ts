import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
    entryPoints: ["src/index.ts", "!src/**/*.test.ts", "!src/**/__mocks__/*.ts"],
    clean: true,
    format: ["cjs"],
    ...options,
}));
