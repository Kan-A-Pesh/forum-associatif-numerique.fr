"use server";

import { LanguageFormSchema } from "@/app/(admin)/_schema/language";
import { createClient } from "@/lib/supabase/agents/server";
import { ErrorStatus, SuccessStatus } from "@/types/status";

export default async function createLanguage(data: any) {
    const result = LanguageFormSchema.safeParse(data);
    if (!result.success) return ErrorStatus("Invalid form data", result.error.message);
    const language = result.data;

    const supabase = await createClient();
    const { error } = await supabase.from("languages").insert(language);

    if (error) return ErrorStatus(error);

    return SuccessStatus(null);
}
