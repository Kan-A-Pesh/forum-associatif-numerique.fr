"use server";

import { LanguageDeleteFormShema } from "@/app/(admin)/_schema/language";
import { createClient } from "@/lib/supabase/agents/server";
import { ErrorStatus, SuccessStatus } from "@/types/status";

export default async function deleteLanguage(data: any) {
    const result = LanguageDeleteFormShema.safeParse(data);
    if (!result.success) return ErrorStatus("Invalid form data", result.error.message);

    const language = result.data;
    if (!language.id) return ErrorStatus("Invalid form data", "ID is required.");

    const supabase = await createClient();
    const { error } = await supabase.from("languages").delete().eq("id", language.id);

    if (error) return ErrorStatus(error);

    return SuccessStatus(null);
}
