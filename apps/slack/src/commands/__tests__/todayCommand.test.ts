import { describe, it, expect, vi, beforeEach } from "vitest";
import * as imageService from "../../services/imageService";
import { createMockSlackContext } from "../__mocks__/slackClient";
import { mockApp, mockCommandFn } from "../__mocks__/index";
import { todayCommand } from "../todayCommand";

vi.mock("../../index", () => ({
    app: mockApp,
}));

describe("todayCommand", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should list images if images exist", async () => {
        const mockContext = createMockSlackContext();

        const mockImages = [
            {
                id: "123",
                isReviewed: true,
                isApproved: false,
                isDeleted: false,
                url: "https://example.com/image1.png",
                address: "123",
            },
            {
                id: "456",
                isReviewed: false,
                isApproved: false,
                isDeleted: true,
                url: "https://example.com/image2.png",
                address: "123",
            },
        ];

        const getImagesSpy = vi.spyOn(imageService, "getTodaysImages").mockResolvedValue(mockImages);

        await todayCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.ack).toHaveBeenCalled();
        expect(getImagesSpy).toHaveBeenCalled();

        // İlk 2 say mesajı:
        expect(mockContext.say).toHaveBeenNthCalledWith(1, "Here are the images for today:");
        expect(mockContext.say).toHaveBeenNthCalledWith(2, `Images count: ${mockImages.length}`);

        // Her image için say çağrısı:
        expect(mockContext.say).toHaveBeenNthCalledWith(3, expect.stringContaining(`*ID:* 123`));
        expect(mockContext.say).toHaveBeenNthCalledWith(4, expect.stringContaining(`*ID:* 456`));
    });

    it("should say no images if images list is empty", async () => {
        const mockContext = createMockSlackContext();

        const getImagesSpy = vi.spyOn(imageService, "getTodaysImages").mockResolvedValue([]);

        await todayCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.ack).toHaveBeenCalled();
        expect(getImagesSpy).toHaveBeenCalled();
        expect(mockContext.say).toHaveBeenCalledWith("No images found for today.");
    });

    it("should say no images if images is null", async () => {
        const mockContext = createMockSlackContext();

        const getImagesSpy = vi.spyOn(imageService, "getTodaysImages").mockResolvedValue(null);

        await todayCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.ack).toHaveBeenCalled();
        expect(getImagesSpy).toHaveBeenCalled();
        expect(mockContext.say).toHaveBeenCalledWith("No images found for today.");
    });
});
