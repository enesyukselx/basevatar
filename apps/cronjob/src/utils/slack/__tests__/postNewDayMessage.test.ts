import { describe, it, expect, vi, beforeEach } from "vitest";
import postNewDayMessage from "../postNewDayMessage";

const mockPostMessage = vi.fn();

vi.mock("@slack/web-api", () => {
    return {
        WebClient: vi.fn().mockImplementation(() => ({
            chat: {
                postMessage: mockPostMessage,
            },
        })),
    };
});

describe("postNewDayMessage", () => {
    beforeEach(() => {
        mockPostMessage.mockReset();
    });

    it("Slack message content should be in the correct format", async () => {
        const day = 3;
        const finishTime = new Date("2025-04-21T10:00:00Z").getTime();
        const color = "Green";
        const theme = "Neo-Classic";

        mockPostMessage.mockResolvedValue({ ts: "1234567890.000200" });

        await postNewDayMessage(day, finishTime, color, theme);

        expect(mockPostMessage).toHaveBeenCalledTimes(1);

        const sentText = mockPostMessage.mock.calls[0][0].text as string;

        // Check line by line
        expect(sentText).toContain(`*Day ${day}*`);
        expect(sentText).toContain(`*Finish Time* ${new Date(finishTime).toLocaleString()}`);
        expect(sentText).toContain(`*Colors:* ${color}`);
        expect(sentText).toContain(`*Theme:* ${theme}`);
    });

    it("Does not throw when Slack fails", async () => {
        mockPostMessage.mockRejectedValue(new Error("Slack fail"));

        await expect(postNewDayMessage(8, Date.now(), "Red", "Noir")).resolves.not.toThrow();
    });
});
