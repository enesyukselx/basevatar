// apps/slack/src/__mocks__/index.ts

import { vi } from "vitest";

export const mockCommandFn = vi.fn();

export const mockApp = {
    command: mockCommandFn,
};
