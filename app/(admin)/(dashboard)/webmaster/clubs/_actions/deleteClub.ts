"use server";

import { createClient } from "@/lib/supabase/agents/server";
import { ErrorStatus, SuccessStatus } from "@/types/status";

export default async function deleteClub(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("clubs").delete().match({ id });
    if (error) return ErrorStatus(error);
    return SuccessStatus(null);
}
