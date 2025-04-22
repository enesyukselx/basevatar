import { describe, it, expect, vi, beforeEach } from "vitest";
import * as imageService from "../../services/imageService";
import { createMockSlackContext } from "../__mocks__/slackClient";
import { mockApp, mockCommandFn } from "../__mocks__/index";
import { reviewCommand } from "../reviewCommand";

vi.mock("../../index", () => ({
    app: mockApp,
}));

describe("reviewCommand", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should approve image when input is valid", async () => {
        const mockContext = createMockSlackContext({
            text: "approve 605c72d6f9ad3b0015e1b9a0",
        });

        const reviewImageSpy = vi.spyOn(imageService, "reviewImage").mockResolvedValue({
            id: "605c72d6f9ad3b0015e1b9a0",
            day: 1,
            address: "0x123",
            url: "https://example.com/image.png",
            isReviewed: true,
            isSelected: false,
            created_at: new Date(),
            isDeleted: false,
        });

        await reviewCommand();

        const callback = mockCommandFn.mock.calls[0][1];

        await callback(mockContext);

        expect(mockContext.ack).toHaveBeenCalled();
        expect(mockContext.say).toHaveBeenCalledWith("Image reviewed.");
        expect(reviewImageSpy).toHaveBeenCalledWith("605c72d6f9ad3b0015e1b9a0", "approve");
    });

    it("should say invalid review if review type is wrong", async () => {
        const mockContext = createMockSlackContext({
            text: "wrongtype 605c72d6f9ad3b0015e1b9a0",
        });

        await reviewCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.say).toHaveBeenCalledWith("Invalid review.");
        expect(mockContext.ack).toHaveBeenCalled();
    });

    it("should say invalid id if id format is wrong", async () => {
        const mockContext = createMockSlackContext({
            text: "approve notavalidid",
        });

        await reviewCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.say).toHaveBeenCalledWith("Invalid id.");
        expect(mockContext.ack).toHaveBeenCalled();
    });
});
