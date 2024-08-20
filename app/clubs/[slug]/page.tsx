"use server";

import NotFound from "@/app/(404)/404";
import { createClient } from "@/lib/supabase/agents/server";
import ClubView from "./content";
import { mergeLang } from "@/lib/ui/i18n";
import { fallbackLanguage } from "@/lib/supabase/wrappers/languages";

interface Props {
    params: {
        slug: string;
    };
}

export default async function Club({ params: { slug } }: Props) {
    const supabase = await createClient();
    const { data: clubData, error: clubError } = await supabase.from("clubs").select("*").eq("id", slug);

    if ((clubData?.length || 0) == 0 || clubError) {
        return <NotFound />;
    }

    const mergedClub = mergeLang(clubData, await fallbackLanguage());
    let categories = null;
    if (mergedClub.category) {
        const { data: categoryData, error: categoryError } = await supabase.from("categories").select("*").eq("id", mergedClub.category);

        if ((categoryData?.length || 0) != 0 && !categoryError) {
            categories = categoryData;
        }
    }

    return <ClubView translatedClubs={clubData} translatedCategories={categories} />;
}
