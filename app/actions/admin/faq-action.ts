"use server";

import { prisma } from "@/app/db";
import { redirect } from "next/navigation";

export default async function faqAction(id: string, formData: any) {
    if (id) {
        await prisma.faq.update({
            where: {
                id: id,
            },
            data: {
                title: formData.get("title"),
                content: formData.get("content"),
                order: parseInt(formData.get("order")),
            },
        });
    } else {
        await prisma.faq.create({
            data: {
                title: formData.get("title"),
                content: formData.get("content"),
                order: parseInt(formData.get("order")),
            },
        });
    }

    redirect("/admin/faq");
}
