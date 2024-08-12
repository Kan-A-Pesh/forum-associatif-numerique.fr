"use server";

import Icon from "@/components/common/icon";
import ArticleEditor from "../_components/article-editor";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/agents/server";
import LangWrapper from "@/components/edition/i18n/lang-wrapper";
import upsertArticle from "../_actions/upsertArticle";
import { NewsFormSchema } from "@/app/(admin)/(dashboard)/webmaster/_schema/news-form";
import { z } from "zod";

interface Props {
    params: {
        id: string;
    };
}

export default async function NewsEditPage({ params }: Props) {
    const { id } = params;
    const supabase = await createClient();
    const { data, error } = await supabase.from("news").select("*").eq("id", id).returns<z.infer<typeof NewsFormSchema>[]>();

    return (
        <section className="flex flex-col gap-y-4 p-4 md:p-8 lg:p-12 w-full max-w-4xl">
            <header className="mb-4">
                <Link href="/webmaster/news" passHref>
                    <Button variant="link" className="text-white gap-2">
                        <Icon icon="arrow-left" size={16} />
                        <span>Back to news</span>
                    </Button>
                </Link>
                <h1 className="text-4xl font-bold text-white mt-2">Edit article</h1>
            </header>

            {error ? (
                <p className="text-red-500">{error.message}</p>
            ) : (
                <LangWrapper data={data} editor={ArticleEditor} onSubmit={upsertArticle} absoluteBanner />
            )}
        </section>
    );
}
