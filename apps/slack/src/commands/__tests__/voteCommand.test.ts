import { describe, it, expect, vi, beforeEach } from "vitest";
import * as database from "@basevatar/database";
import { createMockSlackContext } from "../__mocks__/slackClient";
import { mockApp, mockCommandFn } from "../__mocks__/index";
import { voteCommand } from "../voteCommand";

vi.mock("../../index", () => ({
    app: mockApp,
}));

const mockSettings = {
    day: "5",
    finish_time: "18:00",
    theme: "Cyberpunk",
    color: "Neon Pink",
};

const mockVote = {
    id: "vote123",
    type: "theme" as const,
    value: ["cyberpunk"],
    day: 7,
    isDeleted: false,
    count: 1,
    date: new Date(),
};

describe("voteCommand", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should record a theme vote successfully", async () => {
        const mockContext = createMockSlackContext({
            text: "theme cyberpunk",
        });

        vi.spyOn(database, "getSettings").mockResolvedValue(mockSettings);
        const createVoteSpy = vi.spyOn(database, "createVote").mockResolvedValue(mockVote);

        await voteCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(createVoteSpy).toHaveBeenCalledWith({
            type: "theme",
            value: "cyberpunk",
            day: 7, // if day is not provided, set it to day + 2
        });
        const sayMessage = mockContext.say.mock.calls[0][0];
        expect(sayMessage).toContain("*Theme:* cyberpunk");
        expect(sayMessage).toContain("*Day:* 7");
    });

    it("should record a color vote successfully", async () => {
        const mockContext = createMockSlackContext({
            text: "color #FF0000,#00FF00,#0000FF",
        });

        vi.spyOn(database, "getSettings").mockResolvedValue(mockSettings);
        const createVoteSpy = vi.spyOn(database, "createVote").mockResolvedValue(mockVote);

        await voteCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(createVoteSpy).toHaveBeenCalledWith({
            type: "color",
            value: "#FF0000,#00FF00,#0000FF",
            day: 7,
        });
        const sayMessage = mockContext.say.mock.calls[0][0];
        expect(sayMessage).toContain("*Theme:* #FF0000,#00FF00,#0000FF");
        expect(sayMessage).toContain("*Day:* 7");
    });

    it("should say invalid vote type if wrong type", async () => {
        const mockContext = createMockSlackContext({
            text: "wrongtype cyberpunk",
        });

        vi.spyOn(database, "getSettings").mockResolvedValue(mockSettings);

        await voteCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.say).toHaveBeenCalledWith("Invalid vote type.");
    });

    it("should say invalid vote value if value is missing", async () => {
        const mockContext = createMockSlackContext({
            text: "theme",
        });

        vi.spyOn(database, "getSettings").mockResolvedValue(mockSettings);

        await voteCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.say).toHaveBeenCalledWith("Invalid vote value.");
    });

    it("should say invalid vote day if day is less than or equal to current day", async () => {
        const mockContext = createMockSlackContext({
            text: "theme cyberpunk 5",
        });

        vi.spyOn(database, "getSettings").mockResolvedValue(mockSettings);

        await voteCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.say).toHaveBeenCalledWith("Invalid vote day.");
    });

    it("should say invalid color value if less than 3 colors", async () => {
        const mockContext = createMockSlackContext({
            text: "color #FF0000,#00FF00",
        });

        vi.spyOn(database, "getSettings").mockResolvedValue(mockSettings);

        await voteCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.say).toHaveBeenCalledWith("Invalid vote value. You must provide 3 colors.");
    });

    it("should say invalid color format if wrong hex format", async () => {
        const mockContext = createMockSlackContext({
            text: "color #FF0000,#GGGGGG,#0000FF",
        });

        vi.spyOn(database, "getSettings").mockResolvedValue(mockSettings);

        await voteCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.say).toHaveBeenCalledWith("Invalid vote value. You must provide colors in hex format.");
    });

    it("should say unable to retrieve settings if settings is null", async () => {
        const mockContext = createMockSlackContext({
            text: "theme cyberpunk",
        });

        vi.spyOn(database, "getSettings").mockResolvedValue(null);

        await voteCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.say).toHaveBeenCalledWith("Unable to retrieve settings.");
    });
});
