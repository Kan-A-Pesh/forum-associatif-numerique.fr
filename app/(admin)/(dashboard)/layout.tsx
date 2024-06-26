"use server";

import AuthButton from "@/components/AuthButton";
import getAuth from "@/utils/supabase/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout() {
    const { user } = await getAuth();

    if (!user) {
        return redirect("/login");
    }

    return <div className="flex-1 w-full flex flex-col gap-20 items-center"></div>;
}
