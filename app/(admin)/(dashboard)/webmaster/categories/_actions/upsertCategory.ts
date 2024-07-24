"use server";

import { ErrorStatus, Status, SuccessStatus } from "@/types/status";
import { createClient } from "@/lib/supabase/agents/server";
import { fallbackLanguage } from "@/lib/supabase/wrappers/languages";
import { Tables } from "@/types/supabase";
import { randomUUID } from "crypto";
import { CategoryFormSchema } from "@/app/(admin)/_schema/category";

export default async function upsertArticle(data: any): Promise<Status<Tables<"categories">[]>> {
    const result = CategoryFormSchema.safeParse(data);
    if (!result.success) return ErrorStatus("Invalid form data", result.error.message);

    const news = result.data;

    const supabase = await createClient();

    const id = news.id ?? randomUUID();

    try {
        const { data, error } = await supabase
            .from("news")
            .upsert({
                color: news.color,
                description: news.description,
                end_time: news.end_time,
                lang: await fallbackLanguage(news.lang),
                metadata: news.metadata,
                start_time: news.start_time,
                thumbnail_path: news.thumbnail_path,
                title: news.title,
                id: id,
            })
            .select("*");

        if (error) return ErrorStatus(error);

        return SuccessStatus(data);
    } catch (err) {
        return ErrorStatus(err as Error);
    }
}
