"use server";

import { Tables } from "@/types/supabase";
import { createClient } from "../agents/server";

/**
 * Get language string code from language number
 * @param lang The language number
 * @returns The language string code
 */
export async function getLangCode(lang: number): Promise<string> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("languages").select("name").eq("id", lang).single();
    if (error) throw error;
    return data.name;
}

/**
 * Get languages
 * @returns The list of languages
 */
export async function getLanguages(): Promise<Tables<"languages">[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("languages").select("*");
    if (error) throw error;
    return data;
}

export async function getLanguage(lang: number): Promise<Tables<"languages">> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("languages").select("*").eq("id", lang).single();
    if (error) throw error;
    return data;
}

/**
 * Get the fallback language if the language is not found
 * @returns The attempt language
 */
export async function fallbackLanguage(languageAttempt?: number): Promise<number> {
    if (languageAttempt && languageAttempt >= 0) return languageAttempt;

    const supabase = await createClient();
    const { data, error } = await supabase.from("languages").select("id").limit(1).maybeSingle();
    if (error) throw error;
    if (!data) return -1;
    return data.id;
}

/**
 * Pack languages
 * @param rows The rows to pack
 * @returns The packed languages
 */
export async function packLangs<T extends { lang: number; id: string; [key: string]: any }>(rows: T[]): Promise<Record<string, T[]>> {
    return rows.reduce((acc: Record<string, T[]>, row) => {
        if (!acc[row.id]) acc[row.id] = [row];
        else acc[row.id].push(row);
        return acc;
    }, {});
}
