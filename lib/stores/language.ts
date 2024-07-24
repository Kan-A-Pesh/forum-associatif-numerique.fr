"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mergeLang } from "../ui/i18n";

interface LanguageState {
    selectedLanguage: number;
    setSelectedLanguage: (lang: number) => void;
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            selectedLanguage: -1,
            setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),
        }),
        {
            name: "language-store",
        },
    ),
);

export function translate<T extends { lang: number; [key: string]: any }>(data: T[]): T {
    return mergeLang(
        data,
        useLanguageStore((state) => state.selectedLanguage),
    );
}
