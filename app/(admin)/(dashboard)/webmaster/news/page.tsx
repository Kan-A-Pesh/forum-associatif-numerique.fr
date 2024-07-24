"use server";

import { createClient } from "@/lib/supabase/agents/server";
import NewsCard from "./news";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import { packLangs } from "@/lib/supabase/wrappers/languages";
import ArticleDelete from "./_components/article-delete";

export default async function NewsPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.from("news").select("*");

    const news = data && data.length > 0 ? await packLangs(data) : [];

    return (
        <section className="flex flex-col gap-y-4 p-4 md:p-8 lg:p-12 w-full max-w-4xl">
            <header className="mb-4">
                <h1 className="text-4xl font-bold text-white">News Editor</h1>
                <p className="text-white mt-2">Edit your news here.</p>
                <Link href="/webmaster/news/create" passHref>
                    <Button className="flex items-center gap-1 mt-4">
                        <Icon icon="plus" className="text-white" size={24} />
                        <span>Create new article</span>
                    </Button>
                </Link>
            </header>

            {error && <p className="text-red-500">{error.message}</p>}

            {Object.entries(news).map(([id, articles]) => (
                <div className="mb-2">
                    <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-md opacity-50">ID: {id}</h2>
                        <Link href={`/webmaster/news/${id}`} passHref className="ms-auto">
                            <Button className="text-white">Edit article</Button>
                        </Link>
                        <ArticleDelete id={id} />
                    </div>
                    <NewsCard key={id} newsList={articles} />
                </div>
            ))}
        </section>
    );
}
