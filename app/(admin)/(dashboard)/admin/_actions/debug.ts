"use server";

import { ErrorStatus, SuccessStatus } from "@/types/status";
import { ClubFormSchema } from "../_schema/club";
import { createClient } from "@/lib/supabase/agents/server";
import getAuth from "@/lib/supabase/wrappers/auth";

export default async function debugClub(data: any) {
    const result = ClubFormSchema.safeParse(data);
    if (!result.success) return ErrorStatus("Invalid form data", result.error.message);

    const club = result.data;
    const { supabase, user } = await getAuth();

    // Check permission ID
    if (!user) return ErrorStatus("Unauthorized", "User is not logged in");
    if (!user.email?.endsWith("@admin") && user.user_metadata?.club !== club.id)
        return ErrorStatus("Unauthorized", "User is not authorized to edit this club");

    // Update the club
    const { data: res, error } = await supabase
        .from("clubs")
        .upsert({
            id: club.id,
            lang: club.lang,
            title: club.title ?? "",
            content: club.content,
            avatar_path: club.avatar_path,
            category: club.category,
            subtitle: club.subtitle,
            socials: club.socials,
        })
        .select("*");

    if (error) return ErrorStatus(error);
    return SuccessStatus(res);
}
