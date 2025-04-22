import { describe, it, expect, vi, beforeEach } from "vitest";
import * as database from "@basevatar/database";
import { createMockSlackContext } from "../__mocks__/slackClient";
import { mockApp, mockCommandFn } from "../__mocks__/index";
import { settingsCommand } from "../settingsCommand";

vi.mock("../../index", () => ({
    app: mockApp,
}));

describe("settingsCommand", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should send settings info if settings exist", async () => {
        const mockContext = createMockSlackContext();

        const mockSettings = {
            day: "7",
            finish_time: "18:00",
            theme: "Cyberpunk",
            color: "Neon Pink",
        };

        const getSettingsSpy = vi.spyOn(database, "getSettings").mockResolvedValue(mockSettings);

        await settingsCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(getSettingsSpy).toHaveBeenCalled();
        expect(mockContext.ack).toHaveBeenCalled();

        const sayMessage = mockContext.say.mock.calls[0][0];

        // 👇 Direkt birebir string içinde var mı kontrolü:
        expect(sayMessage).toContain("*Day:* 7");
        expect(sayMessage).toContain("*Finish Time:* 18:00");
        expect(sayMessage).toContain("*Theme:* Cyberpunk");
        expect(sayMessage).toContain("*Color:* Neon Pink");
    });

    it("should say error message if settings not found", async () => {
        const mockContext = createMockSlackContext();

        const getSettingsSpy = vi.spyOn(database, "getSettings").mockResolvedValue(null);

        await settingsCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(getSettingsSpy).toHaveBeenCalled();
        expect(mockContext.ack).toHaveBeenCalled();
        expect(mockContext.say).toHaveBeenCalledWith("Unable to retrieve settings.");
    });
});
