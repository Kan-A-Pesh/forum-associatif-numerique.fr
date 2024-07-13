"use server";

import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { Tables } from "@/types/supabase";
import getHslColor from "@/lib/ui/color";
import Image from "next/image";
import Link from "next/link";
import getSocialIconFromUrl from "@/lib/ui/getSocialIconFromUrl";
import { timeRangeToString } from "@/lib/ui/time";
import { getPublicUrl } from "@/lib/supabase/wrappers/bucket";
import Profile from "@/components/clubs/profile";

interface Props {
    news: Tables<"news">;
    relatedClub?: Tables<"clubs">;
}

export default async function NewsCard({ news, relatedClub }: Props) {
    const newsColorHsl = getHslColor(news.color);
    const newsTime = timeRangeToString(news.start_time, news.end_time);

    return (
        <article
            className="p-8 rounded-lg shadow-md border"
            style={{
                backgroundColor: `hsl(${newsColorHsl})`,
                borderColor: `hsl(${newsColorHsl}, 25%)`,
            }}
        >
            <header className="flex gap-4 w-full mb-4">
                <h3 className="text-2xl font-bold">{news.title}</h3>
                <span className="border border-white rounded-sm px-2 py-1 text-white text-base">{newsTime}</span>
            </header>
            <div className="flex gap-6">
                {news.thumbnail_path && (
                    <Image
                        src={await getPublicUrl("news", news.thumbnail_path)}
                        alt={news.title}
                        width={350}
                        height={250}
                        className="rounded-lg"
                    />
                )}
                <div className="flex flex-col gap-4">
                    {relatedClub && (
                        <Profile
                            avatarUrl={relatedClub.avatar_path ? await getPublicUrl("clubs", relatedClub.avatar_path) : undefined}
                            username={relatedClub.title}
                            quote={relatedClub.subtitle ?? undefined}
                        />
                    )}

                    {Object.hasOwn(news.metadata as Object, "location") && (
                        <div className="flex gap-1 items-center">
                            <Icon icon="map-pin" className="text-gray-600" size={16} />
                            <span className="text-gray-600 text-sm font-bold">{(news.metadata as any).location}</span>
                        </div>
                    )}

                    <div className="grow">
                        <p className="text-white leading-relaxed">{news.description}</p>
                    </div>

                    <div className="flex gap-3">
                        {Object.hasOwn(news.metadata as Object, "link") && (
                            <Link href={(news.metadata as any).link} passHref>
                                <Button
                                    style={{
                                        backgroundColor: `hsl(${newsColorHsl})`,
                                    }}
                                    className="flex-grow text-white h-11"
                                >
                                    See More
                                </Button>
                            </Link>
                        )}
                        {relatedClub?.socials?.map((social) => {
                            const icon = getSocialIconFromUrl(social);
                            const splitDomain = new URL(social).hostname.split(".");
                            const domain = splitDomain[splitDomain.length - 2];

                            return (
                                <Link key={social} href={social} passHref>
                                    <Button
                                        style={{
                                            backgroundColor: `hsl(${newsColorHsl})`,
                                        }}
                                        className="flex-grow text-white h-11 min-w-11"
                                    >
                                        <Icon icon={icon.icon} size={24} />
                                        {!icon.accurate && <span>{domain}</span>}
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </article>
    );
}
