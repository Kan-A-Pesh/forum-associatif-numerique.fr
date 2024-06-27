"use server";

import TopMenu from "./_components/top-menu";

export default async function Webmaster() {
    return (
        <main className="min-h-screen">
            <TopMenu />
        </main>
    );
}
