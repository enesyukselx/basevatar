import { prisma } from "../lib/db";

const getImageById = async (id: string) => {
    try {
        if (!id || !/^[a-fA-F0-9]{24}$/.test(id)) {
            // Check if the id is a valid ObjectId
            return null;
        }

        const image = await prisma.image.findUnique({
            where: {
                id,
            },
        });

        if (!image) {
            return null;
        }

        return {
            id: image.id,
            day: image.day,
            url: `https://${process.env.AWS_S3_URL}/${image.url}`,
            address: image.address,
            isReviewed: image.isReviewed,
            isApproved: image.isSelected,
            isDeleted: image.isDeleted,
        };
    } catch (e) {
        console.error(e);
        return null;
    }
};

const reviewImage = async (id: string, review: "approve" | "reject") => {
    try {
        if (!id || !/^[a-fA-F0-9]{24}$/.test(id)) {
            // Check if the id is a valid ObjectId
            return null;
        }

        const image = await prisma.image.findUnique({
            where: {
                id,
            },
        });

        if (!image) {
            return null;
        }

        const updatedImage = await prisma.image.update({
            where: {
                id,
            },
            data: {
                isReviewed: true,
                isSelected: review === "approve",
            },
        });

        return updatedImage;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export { getImageById, reviewImage };
