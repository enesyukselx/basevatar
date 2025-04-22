import { describe, it, expect, vi, beforeEach } from "vitest";
import * as imageService from "../../services/imageService";
import { createMockSlackContext } from "../__mocks__/slackClient";
import { mockApp, mockCommandFn } from "../__mocks__/index";
import { imageCommand } from "../imageCommand";

vi.mock("../../index", () => ({
    app: mockApp,
}));

describe("imageCommand", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should send image info if image exists", async () => {
        const mockContext = createMockSlackContext({
            text: "605c72d6f9ad3b0015e1b9a0", // ID
        });

        const mockImage = {
            id: "605c72d6f9ad3b0015e1b9a0",
            day: 5,
            url: "https://example.com/image.png",
            address: "0xabc123",
            isReviewed: true,
            isApproved: false,
            isDeleted: false,
        };

        const getImageSpy = vi.spyOn(imageService, "getImageById").mockResolvedValue(mockImage);

        await imageCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.ack).toHaveBeenCalled();
        expect(getImageSpy).toHaveBeenCalledWith("605c72d6f9ad3b0015e1b9a0");

        const sayMessage = mockContext.say.mock.calls[0][0];

        expect(sayMessage).toContain("Image: 605c72d6f9ad3b0015e1b9a0");
        expect(sayMessage).toContain("*Day:* 5");
        expect(sayMessage).toContain("*URL:* https://example.com/image.png");
        expect(sayMessage).toContain("*Address:* 0xabc123");
        expect(sayMessage).toContain("*Reviewed:* true");
        expect(sayMessage).toContain("*Approved:* false");
        expect(sayMessage).toContain("*Deleted:* false");
    });

    it("should say error message if image not found", async () => {
        const mockContext = createMockSlackContext({
            text: "605c72d6f9ad3b0015e1b9a0", // ID
        });

        const getImageSpy = vi.spyOn(imageService, "getImageById").mockResolvedValue(null);
        await imageCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.ack).toHaveBeenCalled();
        expect(getImageSpy).toHaveBeenCalledWith("605c72d6f9ad3b0015e1b9a0");
        expect(mockContext.say).toHaveBeenCalledWith("Unable to retrieve image information.");
    });
});
