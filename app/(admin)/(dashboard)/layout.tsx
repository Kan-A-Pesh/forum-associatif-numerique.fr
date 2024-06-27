"use server";

import getAuth from "@/utils/supabase/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { user } = await getAuth();

    if (!user) {
        return redirect("/login");
    }

    return <>{children}</>;
}
