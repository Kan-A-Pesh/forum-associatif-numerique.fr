"use server";

import { createAuthSuperClient } from "@/lib/supabase/agents/super-server";
import { ErrorStatus, SuccessStatus } from "@/types/status";

export async function deleteUser(id: string) {
    const superAuthClient = await createAuthSuperClient();
    const res = await superAuthClient.deleteUser(id);

    if (res.error) return ErrorStatus(res.error);

    return SuccessStatus(null);
}
