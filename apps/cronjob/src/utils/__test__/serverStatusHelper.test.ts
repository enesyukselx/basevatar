import { describe, it, expect, vi, beforeEach } from "vitest";
import { serverStatusHelper } from "../serverStatusHelper";
import axios from "axios";

vi.mock("axios");

const mockedAxios = axios as unknown as {
    get: ReturnType<typeof vi.fn>;
};

describe("serverStatusHelper", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns true when server responds with 200", async () => {
        mockedAxios.get = vi.fn().mockResolvedValue({ status: 200 });

        const result = await serverStatusHelper();

        expect(result).toBe(true);
        expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String));
    });

    it("returns false and logs an error when the server fails", async () => {
        mockedAxios.get = vi.fn().mockRejectedValue(new Error("Connection refused"));
        const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

        const result = await serverStatusHelper();

        expect(result).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith("Server is not running.");
    });
});
