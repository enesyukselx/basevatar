import { prisma } from "@basevatar/database";

const getUserInfoByWalletId = async (walletId: string) => {
    try {
        const user = await prisma.image.findMany({
            where: {
                address: walletId,
            },
        });

        const countImages = user.length;

        if (!countImages) {
            return null;
        }

        const images = user.map((image) => {
            return {
                day: image.day,
                url: `https://${process.env.AWS_S3_URL}/${image.url}`,
                isReviewed: image.isReviewed,
                isApproved: image.isSelected,
                isDeleted: image.isDeleted,
            };
        });

        return {
            countImages,
            images,
        };
    } catch (e) {
        console.error(e);
        return null;
    }
};

export { getUserInfoByWalletId };
