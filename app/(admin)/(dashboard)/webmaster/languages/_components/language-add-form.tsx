"use client";

import { LanguageFormSchema } from "@/app/(admin)/(dashboard)/webmaster/_schema/language";
import { Input } from "@/components/ui/input";
import useZodForm from "@/lib/hooks/useZodForm";
import createLanguage from "../_actions/createLanguage";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import MediaInput from "@/components/media/media-input";

export default function LanguageAddForm() {
    const router = useRouter();
    const form = useZodForm(LanguageFormSchema, { name: "", display_name: "", flag: null }, createLanguage);

    form.onSuccess(() => startTransition(router.refresh));

    return (
        <form onSubmit={form.submitFunction}>
            <footer className="mt-4 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-bold text-white">Add a new language</h3>
                <div className="flex gap-2 mt-2">
                    <div>
                        <Input type="number" placeholder="ID" {...form.register.number("id")} />
                        {form.errors["id"] && <p className="text-red-500 mt-2">{form.errors["id"]}</p>}
                    </div>
                    <div>
                        <Input type="text" placeholder="ISO Code" {...form.register.text("name")} />
                        {form.errors["name"] && <p className="text-red-500 mt-2">{form.errors["name"]}</p>}
                    </div>

                    <div>
                        <Input type="text" placeholder="Name" {...form.register.text("display_name")} />
                        {form.errors["display_name"] && <p className="text-red-500 mt-2">{form.errors["display_name"]}</p>}
                    </div>

                    <div>
                        <MediaInput {...form.register.text("flag")} height={40} width={64} reducedCaptions />
                        {form.errors["flag"] && <p className="text-red-500 mt-2">{form.errors["flag"]}</p>}
                    </div>

                    <Button className="w-32" type="submit">
                        Add
                    </Button>
                </div>
            </footer>

            {form.errors["_server"] && <p className="text-red-500 mt-2">{form.errors["_server"]}</p>}
        </form>
    );
}
