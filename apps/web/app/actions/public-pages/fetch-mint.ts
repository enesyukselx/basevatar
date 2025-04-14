"use server";
import { prisma } from "@/app/lib/db";

const fetchMint = async () => {
    try {
        const item = await prisma.output.findFirst({
            orderBy: {
                created_at: "desc",
            },
        });

        return {
            item,
            error: false,
        };
    } catch (e: unknown) {
        return {
            item: null,
            error: true,
        };
    }
};

export default fetchMint;
