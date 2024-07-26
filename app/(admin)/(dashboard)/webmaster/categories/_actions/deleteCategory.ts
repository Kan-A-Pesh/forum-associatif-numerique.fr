"use server";

import { createClient } from "@/lib/supabase/agents/server";
import { ErrorStatus, SuccessStatus } from "@/types/status";

export default async function deleteCategory(id: string) {
    const supabase = await createClient();

    try {
        const { error } = await supabase.from("categories").delete().match({ id });

        if (error) return ErrorStatus(error);

        return SuccessStatus(null);
    } catch (err) {
        return ErrorStatus(err as Error);
    }
}
