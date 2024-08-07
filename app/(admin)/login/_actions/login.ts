"use server";

import { createClient } from "@/lib/supabase/agents/server";
import { redirect } from "next/navigation";

export const login = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return redirect("/login?message=Could not authenticate user");
    }

    if (email.endsWith("@admin")) {
        return redirect("/webmaster");
    } else {
        return redirect("/admin");
    }
};
