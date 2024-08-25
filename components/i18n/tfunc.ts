"use client";

import { LanguageState, useLanguageStore } from "@/lib/stores/language";
import { translate } from "./languages";

export default function tfunc(languageStore: LanguageState, key: string): string {
    const langCode = languageStore.languageMap[languageStore.selectedLanguage];

    const translation = translate(key, langCode);

    if (!translation) {
        console.warn(`Translation not found for key: ${key}`);
        return key;
    }

    return translation;
}
