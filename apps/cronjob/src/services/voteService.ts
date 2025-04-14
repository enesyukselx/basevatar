import { prisma } from "../lib/db";

const getVotes = async (day: number, type: "color" | "theme") => {
    try {
        const votes = await prisma.vote.findMany({
            where: {
                day: day,
                type: type,
                isDeleted: false,
            },
        });

        const maxCount = votes.reduce((maxItem, currentItem) => {
            return currentItem.count > maxItem.count ? currentItem : maxItem;
        }, votes[0]);

        if (!maxCount) return;

        if (type === "color") {
            return { votes: votes, maxCountItem: maxCount.value.join(",") };
        }

        if (type === "theme") {
            return { votes: votes, maxCountItem: maxCount.value[0] };
        }
    } catch (e) {
        console.error(e);
        return null;
    }
};

export { getVotes };
