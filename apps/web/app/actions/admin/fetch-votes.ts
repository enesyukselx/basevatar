"use server";
import { prisma } from "@/app/lib/db";
import fetchSettings from "../common/fetch-settings";

const fetchVotes = async ({ param }: { param: string }) => {
    try {
        const { setting: day } = (await fetchSettings("day")) as { setting: string };

        let dayParam = param ? (parseInt(param) > 0 ? param : "1") : day;

        const votes = await prisma.vote.findMany({
            where: {
                day: parseInt(dayParam),
                isDeleted: false,
            },
            orderBy: {
                id: "asc",
            },
        });

        return {
            votes,
            day,
            error: false,
        };
    } catch (e: unknown) {
        return {
            votes: [],
            day: "1",
            error: true,
        };
    }
};

export default fetchVotes;
