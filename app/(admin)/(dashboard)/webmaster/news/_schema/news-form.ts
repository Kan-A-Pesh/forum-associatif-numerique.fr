import { z } from "zod";

export const NewsFormSchema = z.object({
    id: z.number().optional(),
    lang: z.number(),

    color: z.number().min(-1).max(360),
    title: z.string().min(3).max(255),
    description: z.string().max(1024).nullable(),

    start_time: z.date().nullable(),
    end_time: z.date().nullable(),

    metadata: z.record(z.any()).nullable(),

    thumbnail: z.instanceof(File).nullable(),
});
