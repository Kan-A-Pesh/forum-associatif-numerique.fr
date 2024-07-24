import { z } from "zod";

export const ClubFormSchema = z.object({
    slug: z
        .string()
        .min(2)
        .max(255)
        .regex(/^[a-z0-9-]+$/),
    lang: z.number(),

    title: z.string().min(3).max(255).optional(),
    category: z.string().optional(),
    subtitle: z.string().max(255).optional(),
    avatar_path: z.string().optional(),
    content: z.instanceof(Component).optional(),
    socials: z.array(z.string()).optional(),
});

export const ClubDeleteSchema = z.object({
    slug: z.string(),
});

export const;
