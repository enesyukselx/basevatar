import { describe, it, expect, vi, beforeEach } from "vitest";
import * as database from "@basevatar/database";
import { createMockSlackContext } from "../__mocks__/slackClient";
import { mockApp, mockCommandFn } from "../__mocks__/index";
import { userCommand } from "../userCommand";

vi.mock("../../index", () => ({
    app: mockApp,
}));

describe("userCommand", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockImages = [
        {
            id: "mockId1",
            day: 5,
            address: "user123",
            url: "image1.png",
            isReviewed: true,
            isSelected: true,
            isDeleted: false,
            created_at: new Date(),
        },
        {
            id: "mockId2",
            day: 6,
            address: "user123",
            url: "image2.png",
            isReviewed: false,
            isSelected: false,
            isDeleted: true,
            created_at: new Date(),
        },
    ];

    it("should list user images if images exist", async () => {
        const mockContext = createMockSlackContext({
            text: "user123", // User ID
        });

        vi.spyOn(database, "getUserImages").mockResolvedValue(mockImages);

        process.env.AWS_S3_URL = "s3.bucket.url";

        await userCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.ack).toHaveBeenCalled();
        expect(database.getUserImages).toHaveBeenCalledWith("user123");

        const sayMessage = mockContext.say.mock.calls[0][0];

        expect(sayMessage).toContain("User: user123");
        expect(sayMessage).toContain("*Images:* 2");
        expect(sayMessage).toContain("*Day:* 5");
        expect(sayMessage).toContain(`*URL:* https://s3.bucket.url/image1.png`);
        expect(sayMessage).toContain("*Reviewed:* true");
        expect(sayMessage).toContain("*Approved:* true");
        expect(sayMessage).toContain("*Deleted:* false");
    });

    it("should say no images if images list is empty", async () => {
        const mockContext = createMockSlackContext({
            text: "user123",
        });

        vi.spyOn(database, "getUserImages").mockResolvedValue([]);
        await userCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.ack).toHaveBeenCalled();
        expect(mockContext.say).toHaveBeenCalledWith("No images found for this user.");
    });

    it("should say unable to retrieve user information if getUserImages returns null", async () => {
        const mockContext = createMockSlackContext({
            text: "user123",
        });

        vi.spyOn(database, "getUserImages").mockResolvedValue(null); // Null dönüyor

        await userCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.ack).toHaveBeenCalled();
        expect(mockContext.say).toHaveBeenCalledWith("Unable to retrieve user information.");
    });
});
