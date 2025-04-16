"use server";

import { prisma } from "@basevatar/database";
import { isAdmin } from "@/app/utils/sessionHelpers";
import { redirect } from "next/navigation";

export async function voteDelete(id: string, day: string) {
    //
    if (!(await isAdmin())) return;

    try {
        await prisma.vote.update({
            where: {
                id: id,
            },
            data: {
                isDeleted: true,
            },
        });
    } catch (e) {
        console.log(e);
    }

    redirect("/admin/votes?day=" + day);
}
