"use server";

import { createClient } from "@/lib/supabase/agents/server";
import NewsCard from "./news";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import { mergeLangs } from "@/lib/supabase/wrappers/i18n";

export default async function NewsPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.from("news").select("*");

    const news = data && data.length > 0 ? await mergeLangs("en", data) : [];

    return (
        <section className="flex flex-col gap-y-4 p-4 md:p-8 lg:p-12 w-full max-w-4xl">
            <header className="mb-4">
                <h1 className="text-4xl font-bold text-white">News Editor</h1>
                <p className="text-white">Edit your news here.</p>
            </header>

            <Link href="/webmaster/news/create" passHref>
                <Button className="flex items-center gap-1">
                    <Icon icon="plus" className="text-white" size={24} />
                    <span>Create new article</span>
                </Button>
            </Link>

            {error && <p className="text-red-500">{error.message}</p>}

            {news.map((article) => (
                <NewsCard key={article.id} news={article} />
            ))}
        </section>
    );
}
