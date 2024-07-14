"use client";

import { LanguageFormSchema } from "@/app/(admin)/_schema/language";
import { Input } from "@/components/ui/input";
import useZodForm from "@/lib/hooks/useZodForm";
import createLanguage from "../_actions/create";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function LanguageAddForm() {
    const router = useRouter();
    const form = useZodForm(LanguageFormSchema, { name: "" }, createLanguage);

    form.onSuccess(() => startTransition(router.refresh));

    return (
        <form onSubmit={form.submitFunction}>
            <footer className="mt-4 p-4 bg-gray-800 rounded-lg flex items-center gap-2">
                <Input type="text" className="grow" placeholder="Add a new language" {...form.register.text("name")} />
                <Button className="w-32" type="submit">
                    Add
                </Button>
            </footer>

            {form.errors.map((error, i) => (
                <p key={i} className="text-red-500 mt-2">
                    {error}
                </p>
            ))}
        </form>
    );
}
