"use server";

import { prisma } from "@/app/lib/db";
import { redirect } from "next/navigation";

import { faqValidationSchema } from "@/app/lib/validationSchemas";
import { TFormState } from "@/app/types";

export default async function faqTest(prevState: TFormState, formData: FormData): Promise<TFormState> {
    const result = faqValidationSchema.safeParse({
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        order: parseInt(formData.get("order") as string),
    });

    if (!result.success) {
        return { message: result.error.flatten().fieldErrors };
    }

    if (formData.get("id")) {
        await prisma.faq.update({
            where: {
                id: formData.get("id") as string,
            },
            data: {
                title: formData.get("title") as string,
                content: formData.get("content") as string,
                order: parseInt(formData.get("order") as string),
            },
        });
    }

    await prisma.faq.create({
        data: {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            order: parseInt(formData.get("order") as string),
        },
    });

    redirect("/admin/faq");
}
