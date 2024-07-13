"use server";

import { LanguageFormSchema } from "@/app/(admin)/_schema/language";
import Exchanger from "@/lib/exchanger";
import { createClient } from "@/lib/supabase/agents/server";
import { ErrorStatus, SuccessStatus } from "@/types/status";
import { redirect } from "next/navigation";

export default async function deleteLanguage(data: FormData) {
    const result = await Exchanger.fromFormData(LanguageFormSchema, data);
    if (!result.success) return ErrorStatus("Invalid form data", result.error.message);

    const language = result.data;
    if (!language.id) return ErrorStatus("Invalid form data", "ID is required.");

    const supabase = await createClient();
    const { error } = await supabase.from("languages").delete().eq("id", language.id);

    if (error) return ErrorStatus(error);

    return SuccessStatus(null);
}
