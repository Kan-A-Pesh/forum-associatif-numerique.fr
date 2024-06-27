"use server";

import TopMenu from "./_components/top-menu";

export default async function WebmasterLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <TopMenu className="fixed h-12" />
            <main className="pt-12">{children}</main>
        </>
    );
}
