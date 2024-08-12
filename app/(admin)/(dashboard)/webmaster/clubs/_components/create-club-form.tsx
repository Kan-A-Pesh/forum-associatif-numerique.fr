"use client";

import { ClubUserFormSchema } from "@/app/(admin)/(dashboard)/webmaster/_schema/club-user";
import useZodForm from "@/lib/hooks/useZodForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Status } from "@/types/status";

interface Props {
    onSubmit: (data: any) => Promise<Status<any>>;
}

export default function CreateClubForm({ onSubmit }: Props) {
    const form = useZodForm(ClubUserFormSchema, { id: "", email: "" }, onSubmit);
    const placeholderId = (form.values.id ? form.values.id : "my-club").toLowerCase().replace(/[^a-z0-9-]/g, "");

    return (
        <form onSubmit={form.submitFunction}>
            <article className="p-2 sm:p-4 md:p-6 lg:p-8 rounded-lg shadow-md border">
                <div className="flex flex-col gap-1.5">
                    <Label>Email</Label>
                    <Input {...form.register.text("email")} placeholder="User email" />
                    {form.errors.email && <p className="text-red-500">{form.errors.email}</p>}
                </div>
                <div className="flex flex-col gap-1.5 mt-4">
                    <Label>Club ID</Label>
                    <Input {...form.register.text("id")} placeholder="The assigned club ID (exising or new)" />
                    {form.errors.id && <p className="text-red-500">{form.errors.id}</p>}
                    <p className="text-gray-500 text-sm">
                        The club ID is a unique identifier for the club, it will also be used as the club's slug and subdomain.
                    </p>
                    <p className="text-white text-sm mt-0.5">
                        <b>{placeholderId}</b>.{(process.env.NEXT_PUBLIC_URL ?? "").replace(/https?:\/\//i, "")}
                        <br />
                        {process.env.NEXT_PUBLIC_URL}/clubs/<b>{placeholderId}</b>
                    </p>
                </div>
            </article>

            <Button type="submit" className="mt-4">
                Invite administator
            </Button>

            {form.errors["_server"] && <p className="text-red-500 mt-2">{form.errors["_server"]}</p>}
        </form>
    );
}
