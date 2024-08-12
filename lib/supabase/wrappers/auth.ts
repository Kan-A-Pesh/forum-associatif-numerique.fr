"use server";

import { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "../agents/server";
import { Database } from "@/types/supabase";

interface AuthStatus {
    supabase: SupabaseClient<Database, "public", Database["public"]>;
    user: User | null;
}

export default async function getAuth(): Promise<AuthStatus> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return { supabase, user };
}

export async function logOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return null;
}
