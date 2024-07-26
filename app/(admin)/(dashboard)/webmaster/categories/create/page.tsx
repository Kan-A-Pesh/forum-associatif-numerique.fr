"use server";

import LangWrapper from "@/components/edition/i18n/lang-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Icon from "@/components/common/icon";
import { redirect } from "next/navigation";
import upsertCategory from "../_actions/upsertCategory";
import CategoryEditor from "../_components/category-editor";

export default async function CategoryCreatePage() {
    const submit = async (data: any) => {
        "use server";
        const res = await upsertCategory(data);
        if (!res.error) redirect("/webmaster/categories");
        return res;
    };

    return (
        <section className="flex flex-col gap-y-4 p-4 md:p-8 lg:p-12 w-full max-w-4xl">
            <header className="mb-4">
                <Link href="/webmaster/categories" passHref>
                    <Button variant="link" className="text-white gap-2">
                        <Icon icon="arrow-left" size={16} />
                        <span>Back to categories</span>
                    </Button>
                </Link>
                <h1 className="text-4xl font-bold text-white mt-2">Create a category</h1>
            </header>
            <LangWrapper data={[]} editor={CategoryEditor} onSubmit={submit} />
        </section>
    );
}
