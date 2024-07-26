"use server";

import { createClient } from "@/lib/supabase/agents/server";
import { ErrorStatus, SuccessStatus } from "@/types/status";

export default async function deleteLanguage(id: number) {
    const supabase = await createClient();
    const { error } = await supabase.from("languages").delete().eq("id", id);
    if (error) return ErrorStatus(error);
    return SuccessStatus(null);
}
