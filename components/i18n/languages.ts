import enLang from "@/languages/en.json";
import frLang from "@/languages/fr.json";

const languageMap = {
    en: enLang,
    fr: frLang,
};

export const translate = (key: string, lang: string = "en"): string | null => {
    const language = (languageMap as any)[lang] || enLang;

    const languageKey = key.split(".").reduce((acc, curr) => {
        if (acc && acc[curr]) return acc[curr];
        return null;
    }, language);

    return languageKey;
};
