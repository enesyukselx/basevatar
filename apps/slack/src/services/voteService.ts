import { prisma } from "../lib/db";

type VoteType = "color" | "theme";

const addVote = async ({ type, value, day }: { type: VoteType; value: string; day: number }) => {
    try {
        if (type === "theme") {
            const vote = await prisma.vote.create({
                data: {
                    type,
                    value: [value],
                    day: day,
                },
            });

            return vote;
        }

        if (type === "color") {
            const vote = await prisma.vote.create({
                data: {
                    type,
                    value: value.split(","),
                    day: day,
                },
            });

            return vote;
        }

        return null;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export { addVote };
