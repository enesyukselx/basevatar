"use server";

import { prisma } from "@/app/lib/db";
import { redirect } from "next/navigation";

import { faqValidationSchema } from "@/app/lib/validationSchemas";

export default async function faqAction(id: string, formData: any) {
    const validatedData = faqValidationSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
        order: parseInt(formData.get("order")),
    });

    if (!validatedData.success) {
        return {
            error: validatedData.error.flatten().fieldErrors,
        };
    }

    if (id) {
        await prisma.faq.update({
            where: {
                id: id,
            },
            data: {
                title: formData.get("title")?.toString(),
                content: formData.get("content")?.toString(),
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
