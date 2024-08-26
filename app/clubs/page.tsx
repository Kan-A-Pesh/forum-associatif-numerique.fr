"use server";

import T from "@/components/i18n/t";
import Title from "../(landing)/_layout/components/title";
import { createClient } from "@/lib/supabase/agents/server";
import { packLangs } from "@/lib/supabase/wrappers/languages";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import CategoryButton from "./category-button";
import Link from "next/link";
import Cotd from "@/components/clubs/cotd";

interface Props {
    searchParams?: {
        q?: string;
        c?: string;
    };
}

export default async function Clubs({ searchParams }: Props) {
    const supabase = await createClient();

    let query = supabase.from("clubs").select("*");

    if (searchParams?.q) {
        const safeQ = searchParams.q
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .split(" ")
            .map((word) => `%${word}%`);
        query = query.ilikeAllOf("title", safeQ);
    }

    if (searchParams?.c) {
        query = query.eq("category", searchParams.c);
        console.log("Searching for category", searchParams.c);
    }

    const { data, error } = await query.order("id").select();

    console.log(error);

    const clubsIdsFound = data ? data.map((club) => club.id) : [];
    // Re-fetching the clubs with the ids found to get other languages
    const clubs = await supabase.from("clubs").select("*").in("id", clubsIdsFound);
    const clubsList = clubs.data ? await packLangs(clubs.data) : {};

    const categories = await supabase.from("categories").select("*");
    const categoriesList = categories.data ? await packLangs(categories.data) : {};

    const randomClub = await supabase.from("clubs").select("*").order("random()").limit(1).single();
    const randomClubTitle = randomClub.error ? "La 404 Devinci" : randomClub.data.title;

    console.log(data);

    return (
        <section className="flex flex-col gap-16 py-24 px-4 container items-center">
            <Title title={<T>clubs.title</T>} subtitle={<T>clubs.subtitle</T>} />
            <div className="bg-gray-700 border border-gray-200 rounded-lg p-6 w-full max-w-2xl">
                <p className="mb-1">{<T>landing.clubsSearch</T>}</p>

                <form action="/clubs" method="get">
                    <div className="flex gap-0.5">
                        <Input placeholder={randomClubTitle || "La 404 Devinci"} name="q" defaultValue={searchParams?.q} />
                        <Button size="icon" type="submit">
                            <Icon icon="search" />
                        </Button>
                        <input type="hidden" name="c" value={searchParams?.c} />
                    </div>

                    <div className="overflow-x-auto mt-4">
                        <div className="flex gap-4">
                            <Link href={`?c=&q=${searchParams?.q || ""}`} passHref>
                                <Button size="sm" variant={searchParams?.c ? "secondary" : "default"}>
                                    <T>clubs.all</T>
                                </Button>
                            </Link>
                            {Object.entries(categoriesList).map(([id, category]) => (
                                <CategoryButton key={id} category={category} selected={searchParams?.c} q={searchParams?.q} />
                            ))}
                        </div>
                    </div>
                </form>
            </div>

            {Object.entries(clubsList).map(([id, club]) => (
                <Cotd hideTitle key={id} translatedClub={club} className="max-w-2xl w-full" />
            ))}
        </section>
    );
}
