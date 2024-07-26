import { z } from "zod";

export const ClubUserFormSchema = z.object({
    id: z
        .string()
        .min(3)
        .max(24)
        .regex(/^[a-z0-9-]+$/),
    email: z.string().email(),
});
