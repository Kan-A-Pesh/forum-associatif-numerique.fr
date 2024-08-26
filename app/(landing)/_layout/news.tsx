"use server";

import { createClient } from "@/lib/supabase/agents/server";
import Title from "./components/title";
import NewsCard from "@/app/(admin)/(dashboard)/webmaster/news/_components/news-card";
import { packLangs } from "@/lib/supabase/wrappers/languages";
import Cotd from "@/components/clubs/cotd";
import T from "@/components/i18n/t";

export default async function News() {
    const supabase = await createClient();
    const news = await supabase.from("news").select("*");
    const newsList = news.data ? await packLangs(news.data) : {};

    const clubs = await supabase.from("clubs").select("*");
    const clubsList = clubs.data ? await packLangs(clubs.data) : {};
    const clubKeys = Object.keys(clubsList);

    const randomClub = clubsList[clubKeys[Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24) % clubKeys.length]];

    return (
        <section className="flex flex-col gap-16 py-24 px-4 container items-center">
            <Title title={<T>landing.news</T>} subtitle={<T>landing.newsSubtitle</T>} />
            {Object.entries(newsList).map(([id, news]) => (
                <NewsCard key={id} newsList={news} className="max-w-3xl" />
            ))}
            {randomClub && <Cotd translatedClub={randomClub} className="max-w-3xl" />}
        </section>
    );
}
