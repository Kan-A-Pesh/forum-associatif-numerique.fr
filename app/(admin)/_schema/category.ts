import { z } from "zod";

export const CategoryFormSchema = z.object({
    id: z.string().uuid().optional(),
    lang: z.number(),

    name: z.string().min(2).max(255),
    icon: z.string().nullable(),
});
