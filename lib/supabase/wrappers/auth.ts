"use server";

import { User } from "@supabase/supabase-js";
import { createClient } from "../agents/server";

interface AuthStatus {
    supabase: ReturnType<typeof createClient>;
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
    supabase.auth.signOut();
}
