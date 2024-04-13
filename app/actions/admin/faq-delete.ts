"use server";

import { prisma } from "@/app/lib/db";
import { isAdmin } from "@/app/utils/sessionHelpers";
import { redirect } from "next/navigation";

export async function faqDelete(id: string) {
    //
    if (!(await isAdmin())) return;

    await prisma.faq.delete({
        where: {
            id: id,
        },
    });

    redirect("/admin/faq");
}
