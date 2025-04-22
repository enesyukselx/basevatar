import { vi } from "vitest";

export const createMockSlackContext = ({ text = "" } = {}) => {
    return {
        ack: vi.fn(),
        say: vi.fn(),
        command: {
            text,
        },
    };
};
