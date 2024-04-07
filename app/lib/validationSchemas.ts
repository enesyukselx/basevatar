import { z } from "zod";

export const faqValidationSchema = z.object({
    title: z.string().min(1, "Title must be at least 1 character long").max(255, "Title cannot exceed 255 characters"),
    content: z
        .string()
        .min(1, "Content must be at least 1 character long")
        .max(25000, "Content cannot exceed 255 characters"),
    order: z.number().int().min(0, "Order must be a positive integer").max(1000, "Order cannot exceed 1000"),
});
