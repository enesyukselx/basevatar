"use server";

import { prisma } from "@/app/db";

export async function sendVote({ id, walletAddress }: { id: string; walletAddress: string }) {
    const updatedData = await prisma.votes.update({
        where: {
            id,
        },
        data: {
            count: {
                increment: 1,
            },
        },
    });

    await prisma.voteLogs.create({
        data: {
            vote_id: id,
            wallet: walletAddress,
        },
    });

    return { updatedData };
}
