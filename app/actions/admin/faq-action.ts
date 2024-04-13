"use server";

import { prisma } from "@/app/lib/db";
import { redirect } from "next/navigation";

import { faqValidationSchema } from "@/app/lib/validationSchemas";
import { TFormState } from "@/app/types";
import { isAdmin } from "@/app/utils/sessionHelpers";

export default async function faqAction(prevState: TFormState, formData: FormData): Promise<TFormState> {
    //
    if (!(await isAdmin()))
        return {
            message: "Unauthorized.",
            errors: {},
        };

    const formValues = {
        id: formData.get("id") as string,
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        order: parseInt(formData.get("order") as string),
    };

    const result = faqValidationSchema.safeParse({
        title: formValues.title,
        content: formValues.content,
        order: formValues.order,
    });

    if (!result.success) {
        return {
            message: "Validation error.",
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        if (formValues.id) {
            await prisma.faq.update({
                where: { id: formValues.id },
                data: {
                    title: formValues.title,
                    content: formValues.content,
                    order: formValues.order,
                },
            });
        } else {
            await prisma.faq.create({
                data: {
                    title: formValues.title,
                    content: formValues.content,
                    order: formValues.order,
                },
            });
        }
        //
    } catch (e) {
        return { message: "Server error.", errors: {} };
    }
    redirect("/admin/faq");
}
