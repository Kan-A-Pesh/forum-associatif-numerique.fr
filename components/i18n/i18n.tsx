import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useEffect } from 'react';
import { useLanguageStore } from '../../lib/stores/language';

import fr from '../../languages/fr.json';
import en from '../../languages/en.json';

const loadLanguageResources = async (lang: string) => {
    switch (lang) {
        case 'fr':
            default:
            return { translation: fr };
        case 'en':
            return { translation: en };
    }
};

export function useInitializeI18n() {
    const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);

    useEffect(() => {
        const initializeI18n = async () => {
            const langCode = selectedLanguage === 1 ? 'fr' : 'en'; // Par exemple, 1 pour fr, 0 pour en
            const resources = await loadLanguageResources(langCode);

            i18n
                .use(initReactI18next)
                .init({
                    resources: {
                        [langCode]: resources,
                    },
                    lng: langCode,
                    fallbackLng: 'fr',
                    interpolation: {
                        escapeValue: false,
                    },
                });
        };

        initializeI18n();
    }, [selectedLanguage]);
}