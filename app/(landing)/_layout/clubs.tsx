"use server";

import { Input } from "@/components/ui/input";
import Title from "./components/title";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import { createClient } from "@/lib/supabase/agents/server";
import { packLangs } from "@/lib/supabase/wrappers/languages";
import CategoryCard from "./components/category-card";
import T from "@/components/i18n/t";

export default async function Clubs() {
    const supabase = await createClient();
    const categories = await supabase.from("categories").select("*");
    const categoriesList = categories.data ? await packLangs(categories.data) : {};

    const { data, error } = await supabase.from("clubs").select("*").order("random()").limit(1).single();
    const randomClubTitle = error ? "La 404 Devinci" : data.title;

    return (
        <section className="flex flex-col gap-16 py-24 px-4 container items-center">
            <Title title={<T>landing.clubsTitle</T>} subtitle={<T>landing.clubsSubtitle</T>} />
            <p className="text-justify max-w-xl">
                <T>landing.clubsDescription</T>
            </p>
            <div className="bg-gray-700 border border-gray-200 rounded-lg p-6 w-full max-w-xl">
                <p className="mb-1">{<T>landing.clubsSearch</T>}</p>

                <form action="/clubs" method="get">
                    <div className="flex gap-0.5">
                        <Input placeholder={randomClubTitle || "La 404 Devinci"} name="q" />
                        <Button size="icon" type="submit">
                            <Icon icon="search" />
                        </Button>
                    </div>
                </form>
            </div>
            <div className="max-w-xl w-full">
                <h4 className="text-2xl font-semibold">
                    <T>landing.categories</T>
                </h4>
                <p className="text-gray-500 mb-8">
                    <T>landing.categoriesSubtitle</T>
                </p>

                {Object.entries(categoriesList).map(([id, category]) => (
                    <CategoryCard key={id} translatedCategory={category} />
                ))}

                <CategoryCard />
            </div>
        </section>
    );
}
