"use server";

import Link from "next/link";
import createArticle from "../_actions/create";
import ArticleEditor from "../_components/article-editor";
import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";

export default async function Page() {
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
            <ArticleEditor onPublish={createArticle} />
        </section>
    );
}
