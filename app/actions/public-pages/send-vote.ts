"use server";

import { prisma } from "@/app/lib/db";
import { checkSession } from "@/app/utils/checkSession";
import { checkTransaction } from "@/app/utils/checkTransaction";
import getSession from "@/app/utils/getSession";

export async function sendVote({ id, hash }: { id: string; hash: string }) {
    //
    const session = await getSession();
    if (!(await checkSession())) return;

    const hashCount = await prisma.voteLogs.count({
        where: {
            hash,
        },
    });

    if (hashCount > 0) return;

    const walletAddress = session?.address;
    const transaction = await checkTransaction(hash);
    if (!transaction) throw new Error("Transaction not found.");

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
            wallet: walletAddress as string,
            hash: hash,
        },
    });

    return { updatedData };
}
