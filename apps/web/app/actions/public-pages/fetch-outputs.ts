"use server";
import { prisma } from "@basevatar/database";

const fetchOutputs = async () => {
    try {
        const items = await prisma.output.findMany({
            orderBy: {
                created_at: "desc",
            },
            where: {
                isDeleted: false,
            },
        });

        return {
            items,
            error: false,
        };
    } catch (e: unknown) {
        return {
            items: [],
            error: true,
        };
    }
};

export default fetchOutputs;
