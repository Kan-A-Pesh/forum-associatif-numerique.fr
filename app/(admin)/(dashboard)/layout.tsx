"use server";

import getAuth from "@/lib/supabase/wrappers/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { user } = await getAuth();

    if (!user) {
        return redirect("/login");
    }

    return <>{children}</>;
}
