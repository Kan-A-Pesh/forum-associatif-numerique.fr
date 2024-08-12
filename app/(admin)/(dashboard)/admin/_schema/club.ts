import { z } from "zod";

export const ClubComponentSchema = z.object({
    type: z.string(),
    value: z.any(),
});

export const ClubFormSchema = z.object({
    id: z
        .string()
        .min(2)
        .max(255)
        .regex(/^[a-z0-9-]+$/),
    lang: z.number(),

    title: z.string().min(3).max(255).optional().nullable(),
    category: z.string().optional().nullable(),
    subtitle: z.string().max(255).optional().nullable(),
    avatar_path: z.string().optional().nullable(),
    content: z
        .array(
            z
                .array(ClubComponentSchema) // Multi column content
                .or(ClubComponentSchema), // Full width content
        )
        .optional()
        .nullable(),
    socials: z.array(z.string()).optional().nullable(),
});
