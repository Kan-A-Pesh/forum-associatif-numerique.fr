"use server";

import { ErrorStatus, Status } from "@/types/status";
import { createClient } from "@/lib/supabase/agents/server";
import randomId from "@/lib/crypto/randomId";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/supabase/wrappers/bucket";
import { NewsFormSchema } from "../_schema/news-form";
import { createServerAction } from "zsa";

export const createArticle = createServerAction()
    .input(NewsFormSchema, { type: "formData" })
    .handler(async ({ input }) => {
        if (input.id !== undefined) return ErrorStatus("Invalid article", "Article ID must be undefined");

        const supabase = await createClient();

        const id = randomId();
        let thumbnail_path: string | null = null;

        // Upload thumbnail
        if (input.thumbnail) {
            const fileData = await uploadFile("news", `landing/${id}`, input.thumbnail);
            if (fileData.error) return ErrorStatus(fileData.error);
            thumbnail_path = fileData.data.path;
        }

        const { error } = await supabase.from("news").insert({
            color: input.color,
            description: input.description,
            end_time: input.end_time,
            lang: input.lang,
            metadata: input.metadata,
            start_time: input.start_time,
            thumbnail_path: thumbnail_path,
            title: input.title,
            id: id,
        });

        if (error) return ErrorStatus(error);

        return redirect("/webmaster/news");
    });
