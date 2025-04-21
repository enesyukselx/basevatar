import { describe, it, expect, vi, beforeEach } from "vitest";
import { createOutput } from "../createOutput";
import { prisma } from "@basevatar/database";

vi.mock("@basevatar/database", () => {
    return {
        prisma: {
            output: {
                create: vi.fn(),
            },
        },
    };
});

const mockCreate = prisma.output.create as unknown as ReturnType<typeof vi.fn>;

describe("createOutput", () => {
    beforeEach(() => {
        mockCreate.mockReset();
    });

    it("creates output record in database with correct data", async () => {
        const fakeOutput = { id: 1, theme: "Cyberpunk" };
        mockCreate.mockResolvedValue(fakeOutput);

        const result = await createOutput("https://opensea.io/assets/xyz", 7, ["red", "blue"], "Cyberpunk", [
            "user1",
            "user2",
        ]);

        expect(mockCreate).toHaveBeenCalledWith({
            data: {
                opensea_url: "https://opensea.io/assets/xyz",
                day: 7,
                colors: ["red", "blue"],
                theme: "Cyberpunk",
                contributors: ["user1", "user2"],
                end_time: expect.any(Date),
            },
        });

        expect(result).toEqual(fakeOutput);
    });

    it("returns null if it encounters an error", async () => {
        mockCreate.mockRejectedValue(new Error("DB error"));

        const result = await createOutput("url", 1, ["c1"], "theme", ["u1"]);

        expect(result).toBeNull();
    });
});
