"use server";

import { createClient } from "@/lib/supabase/agents/server";
import { User } from "@supabase/supabase-js";

export default async function refreshSession(email?: string, token?: string): Promise<User | null> {
    if (!email || !token) return null;

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: token,
    });

    if (error) return null;

    return data?.user ?? null;
}
