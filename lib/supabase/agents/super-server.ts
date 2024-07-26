"use server";

import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

async function createSuperClient() {
    return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
}

export async function createAuthSuperClient() {
    return (await createSuperClient()).auth.admin;
}
