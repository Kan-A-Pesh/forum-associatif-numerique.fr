"use client";

import { ClubFormSchema } from "@/app/(admin)/(dashboard)/admin/_schema/club";
import PathImage from "@/components/common/path-image";
import { translate } from "@/lib/stores/language";
import { Tables } from "@/types/supabase";
import View from "./view";
import Icon from "@/components/common/icon";
import { FeatherIconNames } from "@/types/feather";
import { Button } from "@/components/ui/button";
import getSocialIconFromUrl from "@/lib/ui/getSocialIconFromUrl";
import getSocialHandleFromUrl from "@/lib/ui/getSocialHandleFromUrl";

interface Props {
    translatedClubs: Tables<"clubs">[];
    translatedCategories: Tables<"categories">[] | null;
}

export default function ClubView({ translatedClubs, translatedCategories }: Props) {
    const translatedClub = translate(translatedClubs);
    const parsedClub = ClubFormSchema.safeParse(translatedClub);

    const translatedCategory = translatedCategories ? translate(translatedCategories) : null;

    if (!parsedClub.success) {
        return <p className="text-red-500">Invalid club</p>;
    }

    const club = parsedClub.data;

    return (
        <main className="flex flex-col">
            <section className="container py-12 px-4 mx-auto max-w-3xl">
                <div className="flex gap-8 items-center">
                    <div className="rounded-3xl w-48 h-48 overflow-hidden">
                        <PathImage path={club.avatar_path} alt={club.title ?? ""} width={192} height={192} />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold">{club.title}</h1>
                        <h2 className="text-2xl mb-4 opacity-75">{club.subtitle}</h2>
                        {translatedCategory && (
                            <div className="py-2 px-4 rounded-md bg-gray-800 border-gray-100 text-gray-100 flex items-center gap-2">
                                <Icon icon={translatedCategory.icon as FeatherIconNames} size={16} />
                                <span>{translatedCategory.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 items-center w-full overflow-x-auto pb-4 mt-8">
                    {club.socials?.map((social, i) => (
                        <Button variant="secondary" key={i}>
                            <Icon icon={getSocialIconFromUrl(social).icon} size={16} />
                            <span className="ms-2">{getSocialHandleFromUrl(social)}</span>
                        </Button>
                    ))}
                </div>
            </section>

            {club.content?.map((content, i) => (
                <div key={i} className="container py-4 px-4 mx-auto max-w-3xl">
                    {Array.isArray(content) ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {content.map((subcontent, j) => (
                                <View component={subcontent} key={`part-${i}-${j}`} />
                            ))}
                        </div>
                    ) : (
                        <View component={content} key={`part-${i}`} />
                    )}
                </div>
            ))}
        </main>
    );
}
