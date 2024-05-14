"use server";
import { prisma } from "@/app/lib/db";

const fetchVotes = async () => {
    try {
        const settings = await prisma.settings.findFirst({
            where: {
                key: "day",
            },
        });

        const colors = await prisma.votes.findMany({
            where: {
                type: "color",
                day: Number(settings?.value) + 1 ?? 1,
                isDeleted: false,
            },
        });

        const themes = await prisma.votes.findMany({
            where: {
                type: "theme",
                day: Number(settings?.value) + 1 ?? 1,
                isDeleted: false,
            },
        });

        return {
            colors,
            themes,
            settings,
            error: false,
        };
    } catch (e: unknown) {
        return {
            colors: [],
            themes: [],
            settings: null,
            error: true,
        };
    }
};

export default fetchVotes;
