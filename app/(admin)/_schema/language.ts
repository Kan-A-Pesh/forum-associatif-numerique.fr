import { z } from "zod";

export const LanguageFormSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2).max(255),
});
