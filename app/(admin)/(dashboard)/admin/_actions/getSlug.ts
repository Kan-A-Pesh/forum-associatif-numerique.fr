"use server";

import getAuth from "@/lib/supabase/wrappers/auth";

export default async function getSlug(suggestionParam?: string | null) {
    const auth = await getAuth();
    const club = auth.user?.user_metadata?.club;

    if (club == suggestionParam) return club ?? null;
    if (auth.user?.email?.endsWith("@admin")) return suggestionParam ?? null;
    return club ?? null;
}
