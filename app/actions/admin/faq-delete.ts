"use server";

import { prisma } from "@/app/lib/db";
import { redirect } from "next/navigation";
import checkAdmin from "@/app/utils/checkSession";

export async function faqDelete(id: string) {
    //
    if (!(await checkAdmin())) return;

    await prisma.faq.delete({
        where: {
            id: id,
        },
    });

    redirect("/admin/faq");
}
