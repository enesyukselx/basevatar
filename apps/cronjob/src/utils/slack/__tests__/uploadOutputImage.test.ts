import { describe, it, expect, vi, beforeEach } from "vitest";
import uploadOutputImage from "../uploadOutputImage";

const mockFilesUploadV2 = vi.fn();

vi.mock("fs", () => {
    return {
        default: {
            createReadStream: vi.fn(() => ({ dummy: "stream" })),
        },
    };
});

vi.mock("@slack/web-api", () => ({
    WebClient: vi.fn().mockImplementation(() => ({
        filesUploadV2: mockFilesUploadV2,
    })),
}));

describe("uploadOutputImage", () => {
    beforeEach(() => {
        mockFilesUploadV2.mockReset();
    });

    it("Uploads a file to Slack with the correct format", async () => {
        const outputPath = "/fake/path/to/image.jpg";
        const day = 9;

        await uploadOutputImage(outputPath, day);

        expect(mockFilesUploadV2).toHaveBeenCalledWith({
            channel_id: expect.any(String),
            initial_comment: "Today's output image.",
            file: { dummy: "stream" },
            filename: `day-${day}-output.jpg`,
        });
    });

    it("Does not throw when Slack upload fails", async () => {
        mockFilesUploadV2.mockRejectedValue(new Error("Slack fail"));

        await expect(uploadOutputImage("/path/image.jpg", 5)).resolves.not.toThrow();
    });
});
