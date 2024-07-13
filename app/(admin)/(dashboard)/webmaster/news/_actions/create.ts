"use server";

import { ErrorStatus } from "@/types/status";
import { createClient } from "@/lib/supabase/agents/server";
import randomId from "@/lib/crypto/randomId";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/supabase/wrappers/bucket";
import Exchanger from "@/lib/exchanger";
import { NewsFormSchema } from "@/app/(admin)/_schema/news-form";

export default async function createArticle(data: FormData) {
    const result = await Exchanger.fromFormData(NewsFormSchema, data);
    if (!result.success) return ErrorStatus("Invalid form data", result.error.message);

    const news = result.data;
    if (news.id !== undefined) return ErrorStatus("Invalid article", "Article ID must be undefined");

    const supabase = await createClient();

    const id = randomId();
    let thumbnail_path: string | null = null;

    // Upload thumbnail
    if (news.thumbnail) {
        const fileData = await uploadFile("news", `landing/${id}`, news.thumbnail);
        if (fileData.error) return ErrorStatus(fileData.error);
        thumbnail_path = fileData.data.path;
    }

    const { error } = await supabase.from("news").insert({
        color: news.color,
        description: news.description,
        end_time: news.end_time,
        lang: news.lang,
        metadata: news.metadata,
        start_time: news.start_time,
        thumbnail_path: thumbnail_path,
        title: news.title,
        id: id,
    });

    if (error) return ErrorStatus(error);

    return redirect("/webmaster/news");
}
