import { defineConfig } from "vitest/config";
import path from "node:path";

export const baseConfig = defineConfig({
    test: {
        coverage: {
            provider: "istanbul",
            reporter: [
                "text",
                [
                    "json",
                    {
                        file: `../coverage.json`,
                    },
                ],
            ],
            enabled: true,
        },
    },
});
