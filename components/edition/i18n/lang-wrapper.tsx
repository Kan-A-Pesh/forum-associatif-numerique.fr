"use server";

import { fallbackLanguage, getLanguages } from "@/lib/supabase/wrappers/languages";
import LangEditor from "./lang-editor";
import EditorProps from "./editor";
import React from "react";
import { randomUUID } from "crypto";
import { Status } from "@/types/status";

export interface Props<T extends { lang: number; [key: string]: any }, K> {
    data: T[];
    editor: React.ComponentType<EditorProps<T>>;
    onSubmit: (data: T) => Promise<Status<K>>;
    absoluteBanner?: boolean;
}

export default async function LangWrapper<T extends { lang: number; [key: string]: any }, K>({
    data,
    editor,
    onSubmit,
    absoluteBanner,
}: Props<T, K>) {
    const languages = await getLanguages();
    const defaultLanguage = await fallbackLanguage();

    return (
        <LangEditor
            data={data}
            defaultLanguage={defaultLanguage}
            languages={languages}
            editor={editor}
            onSubmit={onSubmit}
            absoluteBanner={absoluteBanner}
            fallbackUUID={randomUUID()}
        />
    );
}
