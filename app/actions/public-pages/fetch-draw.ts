"use server";
import { prisma } from "@/app/lib/db";

const fetchDraw = async () => {
    try {
        const theme = await prisma.settings.findFirst({
            where: {
                key: "theme",
            },
        });

        const colors = await prisma.settings.findFirst({
            where: {
                key: "color",
            },
        });

        return {
            theme,
            colors,
            error: false,
        };
    } catch (e: unknown) {
        return {
            theme: null,
            colors: null,
            error: true,
        };
    }
};

export default fetchDraw;
