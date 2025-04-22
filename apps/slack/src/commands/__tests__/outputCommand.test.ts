import { describe, it, expect, vi, beforeEach } from "vitest";
import * as outputService from "../../services/outputService";
import { createMockSlackContext } from "../__mocks__/slackClient";
import { mockApp, mockCommandFn } from "../__mocks__/index";
import { outputCommand } from "../outputCommand";

vi.mock("../../index", () => ({
    app: mockApp,
}));

describe("outputCommand", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should send output info if output exists", async () => {
        const mockContext = createMockSlackContext({
            text: "3", // Day = 3
        });

        const mockOutput = {
            day: 3,
            opensea_url: "https://opensea.io/assets/3",
            theme: "Space",
            colors: ["Red, Blue, Yellow"],
            mint_count: 150,
            contributors: ["Alice", "Bob"],
        };

        const getOutputSpy = vi.spyOn(outputService, "getOutputByDay").mockResolvedValue(mockOutput);

        await outputCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.ack).toHaveBeenCalled();
        expect(getOutputSpy).toHaveBeenCalledWith(3);
        expect(mockContext.say).toHaveBeenCalledWith(expect.stringContaining("Day: 3"));
        expect(mockContext.say).toHaveBeenCalledWith(expect.stringContaining(mockOutput.opensea_url));
        expect(mockContext.say).toHaveBeenCalledWith(expect.stringContaining(mockOutput.theme));
        expect(mockContext.say).toHaveBeenCalledWith(expect.stringContaining(mockOutput.colors.join(",")));
        expect(mockContext.say).toHaveBeenCalledWith(expect.stringContaining(mockOutput.mint_count.toString()));
        expect(mockContext.say).toHaveBeenCalledWith(expect.stringContaining(mockOutput.contributors.join(",")));
    });

    it("should say error message if no output found", async () => {
        const mockContext = createMockSlackContext({
            text: "5", // Day = 5
        });

        const getOutputSpy = vi.spyOn(outputService, "getOutputByDay").mockResolvedValue(null); // no output

        await outputCommand();
        const callback = mockCommandFn.mock.calls[0][1];
        await callback(mockContext);

        expect(mockContext.ack).toHaveBeenCalled();
        expect(getOutputSpy).toHaveBeenCalledWith(5);
        expect(mockContext.say).toHaveBeenCalledWith("Unable to retrieve output information.");
    });
});
