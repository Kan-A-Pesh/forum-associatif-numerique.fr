"use server";

import getAuth from "@/lib/supabase/wrappers/auth";
import { sitemap } from "./_data/map";
import TopMenu from "@/components/common/top-menu";
import { redirect } from "next/navigation";

export default async function WebmasterLayout({ children }: { children: React.ReactNode }) {
    const { user } = await getAuth();
    const club = user?.user_metadata?.club;

    if (!club) {
        return redirect("/login");
    }

    return (
        <>
            <TopMenu username={club} sitemap={sitemap} />
            <div className="fixed top-[50%] left-[50%] -z-50 pointer-events-none" id="null-element" />
            <main className="pt-12 flex flex-col items-center">{children}</main>
        </>
    );
}
