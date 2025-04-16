import { z } from "zod";

export const faqValidationSchema = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(25000),
    order: z.number().int().min(0).max(1000),
});

export const voteValidationSchema = z.object({
    day: z.number().int().min(1).max(1000),
    value: z.array(z.string().min(1).max(255)).min(1).max(10),
    type: z.union([z.literal("color"), z.literal("theme")]).optional(),
});
