"use client";

import { translate } from "@/lib/stores/language";
import { cn } from "@/lib/ui/cn";
import { Tables } from "@/types/supabase";
import { ClassValue } from "clsx";
import PathImage from "../common/path-image";
import { Button } from "../ui/button";
import Link from "next/link";
import getSocialIconFromUrl from "@/lib/ui/getSocialIconFromUrl";
import Icon from "../common/icon";
import getSocialHandleFromUrl from "@/lib/ui/getSocialHandleFromUrl";
import T from "../i18n/t";

interface Props {
    translatedClub: Tables<"clubs">[];
    className?: ClassValue;
    hideTitle?: boolean;
}

export default function Cotd({ translatedClub, className, hideTitle }: Props) {
    const club = translate(translatedClub);

    return (
        <article className={cn("p-8 rounded-lg shadow-md border border-gray-300 bg-gray-700", className)}>
            {!hideTitle && (
                <header className="flex gap-4 w-full mb-4">
                    <h3 className="text-2xl font-bold">L'asso du jour</h3>
                    <span className="border border-white rounded-sm px-2 py-1 text-white text-base">{new Date().toLocaleDateString()}</span>
                </header>
            )}
            <div className="flex gap-6 flex-col md:flex-row">
                <div className="flex flex-col items-center justify-center bg-gray-600 p-8 rounded-xl">
                    <div className="mb-4">
                        <PathImage path={club.avatar_path} alt={club.title ?? ""} width={100} height={100} className="rounded-lg" />
                    </div>

                    <h4 className="text-xl font-bold mb-1 text-center">{club.title}</h4>
                    <p className="text-sm text-gray-400 text-center">{club.subtitle}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <Link passHref href={`/clubs/${club.id}`}>
                        <Button className="w-full justify-start">
                            <T>utils.seeClub</T>
                        </Button>
                    </Link>
                    <hr className="border-gray-400 w-full my-2" />
                    {club.socials?.map((social) => (
                        <Link key={social} passHref href={social}>
                            <Button variant="secondary" className="flex items-center justify-start w-full">
                                <Icon icon={getSocialIconFromUrl(social).icon} size={24} />
                                <span className="ms-1">{getSocialHandleFromUrl(social)}</span>
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </article>
    );
}
