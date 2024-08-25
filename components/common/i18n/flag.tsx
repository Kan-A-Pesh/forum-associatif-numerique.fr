"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguageStore } from "@/lib/stores/language";
import { fallbackLanguage, getLanguages } from "@/lib/supabase/wrappers/languages";
import { useCallback, useEffect, useState } from "react";
import { Spinner } from "../spinner";
import { Tables } from "@/types/supabase";
import PathImage from "../path-image";

export default function Flag() {
    const languageStore = useLanguageStore();
    const [currentLanguageCode, setCurrentLanguageCode] = useState(languageStore.selectedLanguage);
    const [languages, setLanguages] = useState<Tables<"languages">[]>([]);

    /* Load languages */
    useEffect(() => {
        (async () => {
            const langs = await getLanguages();
            setLanguages(langs);

            languageStore.setLanguageMap(
                langs.reduce((acc, curr) => {
                    acc[curr.id] = curr.name;
                    return acc;
                }, {} as Record<number, string>),
            );

            if (languageStore.selectedLanguage != -1) {
                setCurrentLanguageCode(languageStore.selectedLanguage);
                return;
            }

            let preferedLanguage: Tables<"languages"> | undefined = undefined;
            const userLanguages = navigator.languages;

            for (const lang of userLanguages) {
                const correspondingLanguage = langs.find((l) => l.name === lang);
                if (correspondingLanguage) {
                    preferedLanguage = correspondingLanguage;
                    break;
                }
            }

            const selectedLanguage = preferedLanguage ? preferedLanguage.id : await fallbackLanguage();

            languageStore.setSelectedLanguage(selectedLanguage);
            setCurrentLanguageCode(selectedLanguage);
        })();
    }, []);

    const currentLanguage = languages.find((lang) => lang.id === currentLanguageCode);

    const handleSetLanguage = useCallback(
        async (lang: string) => {
            const selectedLanguage = languages.find((l) => l.name === lang);

            if (selectedLanguage) {
                languageStore.setSelectedLanguage(selectedLanguage.id);
                setCurrentLanguageCode(selectedLanguage.id);
            }
        },
        [languages],
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="fixed bottom-6 right-6 h-12 w-12 p-0 border border-gray-300">
                    {currentLanguageCode >= 0 && currentLanguage ? (
                        <PathImage path={currentLanguage.flag} alt={currentLanguage.display_name ?? ""} width={32} height={24} />
                    ) : (
                        <Spinner size="small" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-6 border-gray-300">
                <DropdownMenuRadioGroup value={currentLanguage?.name} onValueChange={handleSetLanguage}>
                    {languages ? (
                        languages.map((language) => (
                            <DropdownMenuRadioItem value={language.name} key={language.id}>
                                <div className="flex items-center gap-2">
                                    <PathImage path={language.flag} alt={language.name ?? ""} width={32} height={24} />
                                    <span className="mr-2">{language.display_name}</span>
                                </div>
                            </DropdownMenuRadioItem>
                        ))
                    ) : (
                        <Spinner size="small" />
                    )}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
