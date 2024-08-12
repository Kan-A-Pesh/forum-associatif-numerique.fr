"use server";

import { createClient } from "@/lib/supabase/agents/server";
import { mergeLangs } from "@/lib/ui/i18n";

export default async function getCategories(language: number) {
    const supabase = await createClient();
    const { data: categories, error } = await supabase.from("categories").select("*");
    return error || !categories ? null : mergeLangs(categories, language);
}
