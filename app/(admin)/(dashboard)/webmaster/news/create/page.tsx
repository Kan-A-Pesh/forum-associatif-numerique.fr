"use server";

import LangWrapper from "@/components/edition/i18n/lang-wrapper";
import ArticleEditor from "../_components/article-editor";
import upsertArticle from "../_actions/upsertArticle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Icon from "@/components/common/icon";
import { redirect } from "next/navigation";

export default async function NewsCreatePage() {
    const submit = async (data: any) => {
        "use server";
        const res = await upsertArticle(data);
        if (!res.error) redirect("/webmaster/news");
        return res;
    };

    return (
        <section className="flex flex-col gap-y-4 p-4 md:p-8 lg:p-12 w-full max-w-4xl">
            <header className="mb-4">
                <Link href="/webmaster/news" passHref>
                    <Button variant="link" className="text-white gap-2">
                        <Icon icon="arrow-left" size={16} />
                        <span>Back to news</span>
                    </Button>
                </Link>
                <h1 className="text-4xl font-bold text-white mt-2">Create an article</h1>
            </header>
            <LangWrapper data={[]} editor={ArticleEditor} onSubmit={submit} />;
        </section>
    );
}
