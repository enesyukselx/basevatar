"use server";
import { prisma } from "@/app/lib/db";
import fetchSettings from "../common/fetch-settings";

const fetchVotes = async () => {
    try {
        const { setting: day } = await fetchSettings("day");

        const colors = await prisma.vote.findMany({
            where: {
                type: "color",
                day: Number(day) + 1 || 1,
                isDeleted: false,
            },
        });

        const themes = await prisma.vote.findMany({
            where: {
                type: "theme",
                day: Number(day) + 1 || 1,
                isDeleted: false,
            },
        });

        return {
            colors,
            themes,
            day,
            error: false,
        };
    } catch (e: unknown) {
        return {
            colors: [],
            themes: [],
            day: "1",
            error: true,
        };
    }
};

export default fetchVotes;
