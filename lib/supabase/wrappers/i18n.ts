"use server";

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
export async function getLanguages(): Promise<{ id: number; name: string }[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("languages").select("id, name");
    if (error) throw error;
    return data;
}

/**
 * Merge multiple rows into a single row selected by the root language
 * This is useful for merging rows with missing translations into a single row
 *
 * @param rootLang The language to use as a base
 * @param rows The rows to merge
 * @returns The merged row
 */
export async function mergeLang<T extends { lang: number; [key: string]: any }>(rootLang: string, rows: T[]): Promise<T> {
    // Prevent empty rows
    if (rows.length === 0) throw new Error("No rows provided");

    const rowsWithLangName = await Promise.all(
        rows.map(async (row) => {
            const lang = await getLangCode(row.lang);
            return { ...row, lang };
        }),
    );

    // Get the base row (or first if not found)
    const base: any = rowsWithLangName.find((row) => row.lang === rootLang) ?? rowsWithLangName[0];

    // Merge the base row with the rest
    rowsWithLangName.forEach((row) => {
        // Skip base row
        if (row.lang === rootLang) return;
        Object.keys(row).forEach((key) => {
            // Skip lang key
            if (key === "lang") return;
            // Merge if key is missing
            if (!base[key]) base[key] = row[key];
        });
    });

    return base;
}

/**
 * Merge multiple rows with the same ID into a single row selected by the root language
 * This is useful for merging rows with missing translations into a single row
 * @see mergeLang
 *
 * @param rootLang The language to use as a base
 * @param rows The rows to merge
 * @returns A list of merged rows
 */
export async function mergeLangs<T extends { lang: number; id: number; [key: string]: any }>(rootLang: string, rows: T[]): Promise<T[]> {
    // Prevent empty rows
    if (rows.length === 0) throw new Error("No rows provided");

    const ids = rows.map((row) => row.id);
    const uniqueIds = Array.from(new Set(ids));

    return await Promise.all(
        uniqueIds.map(async (id) => {
            const row = rows.filter((row) => row.id === id);
            return await mergeLang(rootLang, row);
        }),
    );
}
