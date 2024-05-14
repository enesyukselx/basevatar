"use server";
import { prisma } from "@/app/lib/db";

const fetchFaq = async () => {
    try {
        const items = await prisma.faq.findMany({
            orderBy: {
                order: "asc",
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

export default fetchFaq;
