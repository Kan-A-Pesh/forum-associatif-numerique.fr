"server-only";

import { User } from "@supabase/supabase-js";
import { createClient } from "./server";

interface AuthStatus {
    supabase: ReturnType<typeof createClient>;
    user: User | null;
}

export default async function getAuth(): Promise<AuthStatus> {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return { supabase, user };
}
