"use server";

import { prisma } from "@/app/db";

import { redirect } from "next/navigation";

export default async function formAction(id: string, formData: any) {
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
    }

    redirect("/admin/faq");
}
