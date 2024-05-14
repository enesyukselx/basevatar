"use server";
import { prisma } from "@/app/lib/db";

const fetchGallery = async () => {
    try {
        const items = await prisma.gallery.findMany({
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

export default fetchGallery;
