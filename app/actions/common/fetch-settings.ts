"use server";
import { prisma } from "@/app/lib/db";

const fetchSettings = async () => {
    try {
        const settings = await prisma.settings.findMany();

        return {
            settings,
            error: false,
        };
    } catch (e: unknown) {
        return {
            settings: [],
            error: true,
        };
    }
};

export default fetchSettings;
