/**
 * Merge multiple rows into a single row selected by the root language
 * This is useful for merging rows with missing translations into a single row
 *
 * @param rootLang The language to use as a base
 * @param rows The rows to merge
 * @returns The merged row
 */
export function mergeLang<T extends { lang: number; [key: string]: any }>(rows: T[], language: number): T {
    // Prevent empty rows
    if (rows.length === 0) throw new Error("No rows provided");

    // Get the base row (or first if not found)
    const base: any = rows.find((row) => row.lang === language) || rows[0];

    // Merge the base row with the rest
    rows.forEach((row) => {
        // Skip base row
        if (row.lang === language) return;
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
export function mergeLangs<T extends { lang: number; id: string; [key: string]: any }>(rows: T[], language: number): T[] {
    // Prevent empty rows
    if (rows.length === 0) throw new Error("No rows provided");

    const ids = rows.map((row) => row.id);
    const uniqueIds = Array.from(new Set(ids));

    return uniqueIds.map((id) => {
        const row = rows.filter((row) => row.id === id);
        return mergeLang(row, language);
    });
}
