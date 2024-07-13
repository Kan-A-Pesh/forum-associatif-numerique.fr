"use server";

import { createClient } from "@/lib/supabase/agents/server";
import LanguageTable from "./_components/language-table";
import LanguageAddForm from "./_components/language-add-form";

export default async function LanguagesPage() {
    const supabase = await createClient();
    const languages = await supabase.from("languages").select("*");

    return (
        <section className="flex flex-col gap-y-4 p-4 md:p-8 lg:p-12 w-full max-w-4xl">
            <header className="mb-4">
                <h1 className="text-4xl font-bold text-white">Languages</h1>
                <p className="text-white">Edit, add, or remove languages.</p>
            </header>

            {languages.error ? (
                <p className="text-red-500">Error: {languages.error.message}</p>
            ) : (
                <LanguageTable language={languages.data} />
            )}

            <LanguageAddForm />
        </section>
    );
}
