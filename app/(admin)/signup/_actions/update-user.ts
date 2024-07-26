"use server";

import { createClient } from "@/lib/supabase/agents/server";
import { ErrorStatus } from "@/types/status";
import { redirect } from "next/navigation";

export default async function updateUser(email: string, token: string, password: string) {
    const supabase = await createClient();

    const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email,
        password: token,
    });

    if (loginError) return ErrorStatus(loginError);

    const { data, error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) return ErrorStatus(error);

    if (data.user.email?.endsWith("@admin")) {
        redirect("/webmaster");
    } else {
        redirect("/admin");
    }
}
