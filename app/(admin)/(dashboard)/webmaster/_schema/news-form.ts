import { z } from "zod";

export const NewsFormSchema = z.object({
    id: z.string().optional(),
    lang: z.number(),

    color: z.number().min(-1).max(360).nullable(),
    title: z.string().min(3).max(255),
    description: z.string().max(1024).nullable(),

    start_time: z.string().datetime({ offset: true }).nullable(),
    end_time: z.string().datetime({ offset: true }).nullable(),

    metadata: z
        .object({
            location: z.string().max(255).optional(),
            link: z.string().url().optional(),
        })
        .optional()
        .nullable(),

    thumbnail_path: z.string().nullable(),
});
