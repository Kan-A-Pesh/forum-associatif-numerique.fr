"use server";

import { Input } from "@/components/ui/input";
import Title from "./components/title";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import { createClient } from "@/lib/supabase/agents/server";
import { packLangs } from "@/lib/supabase/wrappers/languages";
import CategoryCard from "./components/category-card";

export default async function Clubs() {
    const supabase = await createClient();
    const categories = await supabase.from("categories").select("*");
    const categoriesList = categories.data ? await packLangs(categories.data) : {};

    return (
        <section className="flex flex-col gap-16 py-24 px-4 container items-center">
            <Title title="Clubs" subtitle="Discover clubs" />
            <p className="text-justify max-w-xl">
                Les associations, c’est le meilleur moyen pour faire des rencontres et nouer de belles amitiés! Actuellement, le Pôle compte
                58 associations aux domaines variés: sport, gaming, événementiel, business, théâtre, cuisine… Une association te correspond
                forcément! Alors n’hésite plus et va prendre du bon temps avec des gens partageant les mêmes centres d’intérêt que toi.
            </p>
            <div className="bg-gray-700 border border-gray-200 rounded-lg p-6 w-full max-w-xl">
                <p className="mb-1">Rechercher une association</p>

                <form action="/clubs" method="get">
                    <div className="flex gap-0.5">
                        <Input placeholder="Rechercher" name="q" />
                        <Button size="icon" type="submit">
                            <Icon icon="search" />
                        </Button>
                    </div>
                </form>
            </div>
            <div className="max-w-xl w-full">
                <h4 className="text-2xl font-semibold">Catégories</h4>
                <p className="text-gray-500 mb-8">Des associations aux thématiques variées</p>

                {Object.entries(categoriesList).map(([id, category]) => (
                    <CategoryCard key={id} translatedCategory={category} />
                ))}

                <CategoryCard />
            </div>
        </section>
    );
}
