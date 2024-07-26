"use server";

import getAuth from "@/lib/supabase/wrappers/auth";
import { redirect } from "next/navigation";
import { sitemap } from "./_data/map";
import TopMenu from "@/components/common/top-menu";

export default async function WebmasterLayout({ children }: { children: React.ReactNode }) {
    const { user } = await getAuth();

    if (!user?.email?.endsWith("@admin")) {
        return redirect("/admin");
    }

    return (
        <>
            <TopMenu username="Webmaster" sitemap={sitemap} />
            <main className="pt-12 flex flex-col items-center">{children}</main>
        </>
    );
}
