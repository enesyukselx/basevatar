"use server";

import { prisma } from "@/app/lib/db";
import { redirect } from "next/navigation";

import { voteValidationSchema } from "@/app/lib/validationSchemas";
import { TFormState } from "@/app/types";

export default async function voteAction(prevState: TFormState, formData: FormData): Promise<TFormState> {
    const formValues = {
        day: parseInt(formData.get("day") as string),
        value: (formData.get("value") as string).split(","),
        type: formData.get("type") as "color" | "theme",
    };

    const result = voteValidationSchema.safeParse({
        day: formValues.day,
        value: formValues.value,
        type: formValues.type,
    });

    if (!result.success) {
        return {
            message: "Validation error.",
            errors: result.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.votes.create({
            data: {
                day: formValues.day,
                value: formValues.value,
                type: formValues.type,
                date: new Date(),
            },
        });
    } catch (e) {
        return { message: "Server error.", errors: {} };
    }

    redirect("/admin/votes?day=" + formValues.day);
}
