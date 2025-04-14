"use server";
import { prisma } from "@/app/lib/db";

const fetchPastDraws = async ({ session }: { session: string }) => {
    try {
        const pastDraws = await prisma.image.findMany({
            where: {
                address: session,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        if (!pastDraws.length)
            return {
                pastDraws: null,
                error: false,
            };

        return {
            pastDraws,
            error: false,
        };
    } catch (e: unknown) {
        return {
            pastDraws: null,
            error: true,
        };
    }
};

export default fetchPastDraws;
