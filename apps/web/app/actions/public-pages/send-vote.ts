"use server";

import { prisma } from "@basevatar/database";
import { isTransactionValid } from "@/app/utils/isTransactionValid";
import { getSession, isSessionValid } from "@/app/utils/sessionHelpers";
import { postNewSlackMessage } from "@/app/utils/slackHelpers";

export async function sendVote({ id, hash }: { id: string; hash: string }) {
    //
    const session = await getSession();
    if (!(await isSessionValid())) return;

    const hashCount = await prisma.voteLog.count({
        where: {
            hash,
        },
    });

    if (hashCount > 0) return;

    const walletAddress = session?.address;
    const transaction = await isTransactionValid(hash);
    if (!transaction) throw new Error("Transaction not found.");

    const updatedData = await prisma.vote.update({
        where: {
            id,
        },
        data: {
            count: {
                increment: 1,
            },
        },
    });

    await prisma.voteLog.create({
        data: {
            vote_id: id,
            wallet: walletAddress as string,
            hash: hash,
        },
    });
    const slackConservationId = "C0796QAEC1K";
    await postNewSlackMessage(
        slackConservationId,
        `New vote from ${walletAddress} 
vote id: *${id}*
vote count: *${updatedData.count}*
vote type: *${updatedData.type}*
vote value: *${updatedData.value.join(",")}*
https://sepolia.basescan.org/tx/${hash}
        `
    );

    return { updatedData };
}
