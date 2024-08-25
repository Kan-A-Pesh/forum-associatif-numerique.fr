"use client";

import { useLanguageStore } from "@/lib/stores/language";
import { translate } from "./languages";
import { Skeleton } from "../ui/skeleton";

interface Props {
    children: string;
}

export default function T({ children }: Props) {
    const languageStore = useLanguageStore();
    const isoLang = languageStore.languageMap[languageStore.selectedLanguage];
    const translation = translate(children, isoLang);

    if (!isoLang) {
        return <Skeleton className="w-20 h-4" />;
    }

    if (!translation) {
        console.warn(`Translation not found for key: ${children}`);
        return <span className="text-red-500">{children}</span>;
    }

    return translation;
}
