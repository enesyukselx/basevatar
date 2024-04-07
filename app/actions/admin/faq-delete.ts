"use server";

import { prisma } from "@/app/lib/db";
import { redirect } from "next/navigation";

export async function faqDelete(id: string) {
    await prisma.faq.delete({
        where: {
            id: id,
        },
    });

    redirect("/admin/faq");
}
