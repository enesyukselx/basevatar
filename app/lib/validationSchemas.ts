import { z } from "zod";

export const faqValidationSchema = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(25000),
    order: z.number().int().min(0).max(1000),
});
