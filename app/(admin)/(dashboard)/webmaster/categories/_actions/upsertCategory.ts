"use server";

import { ErrorStatus, Status, SuccessStatus } from "@/types/status";
import { createClient } from "@/lib/supabase/agents/server";
import { Tables } from "@/types/supabase";
import { randomUUID } from "crypto";
import { CategoryFormSchema } from "@/app/(admin)/_schema/category";

export default async function upsertCategory(data: any): Promise<Status<Tables<"categories">[]>> {
    const result = CategoryFormSchema.safeParse(data);
    if (!result.success) return ErrorStatus("Invalid form data", result.error.message);

    const category = result.data;
    const supabase = await createClient();
    const id = category.id ?? randomUUID();

    const { data: res, error } = await supabase
        .from("categories")
        .upsert({
            id: id,
            lang: category.lang,
            name: category.name,
            icon: category.icon,
        })
        .select("*");

    if (error) return ErrorStatus(error);
    return SuccessStatus(res);
}
