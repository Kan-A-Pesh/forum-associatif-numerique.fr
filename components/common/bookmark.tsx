"use client";

import getSocialIconFromUrl from "@/lib/ui/getSocialIconFromUrl";
import Icon from "./icon";
import getHostname from "@/lib/ui/getHostname";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
    url: string;
}

export default function Bookmark({ url }: Props) {
    const [ogData, setOgData] = useState<{ image: string; description: string } | null | undefined>(undefined);

    useEffect(() => {
        if (!url) {
            return;
        }

        fetch(url, { method: "GET", cache: "no-cache" })
            .then((response) => response.text())
            .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute("content");
                const ogDescription = doc.querySelector('meta[property="og:description"]')?.getAttribute("content");

                if (!ogImage && !ogDescription) {
                    return setOgData(null);
                }

                setOgData({ image: ogImage ?? "", description: ogDescription ?? "" });
            })
            .catch(() => {
                setOgData(null);
            });
    }, [url]);

    return (
        <div className="w-full border border-gray-500 bg-gray-700 rounded-lg p-4">
            <header className="flex items-center gap-2">
                <Icon icon={getSocialIconFromUrl(url).icon} />
                <h3 className="text-lg">{getHostname(url)}</h3>
            </header>
            {ogData === null ? (
                <p className="text-gray-400">{url}</p>
            ) : ogData === undefined ? (
                <Skeleton className="w-full h-4" />
            ) : (
                <div className="flex gap-2 mt-2">
                    {ogData.image && <Image src={ogData.image} width={120} height={63} alt="" role="presentation" />}
                    <p className="text-gray-400">{ogData.description}</p>
                </div>
            )}
        </div>
    );
}
