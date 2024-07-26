"use server";

import { createClient } from "@/lib/supabase/agents/server";
import getAuth from "@/lib/supabase/wrappers/auth";
import { ClubFormSchema } from "../../_schema/club";
import { z } from "zod";

export default async function Admin() {
    const supabase = await createClient();
    const { user } = await getAuth();
    const club = user?.user_metadata?.club;

    const { data, error } = await supabase.from("clubs").select("*").eq("id", club).returns<z.infer<typeof ClubFormSchema>[]>();

    if (error) {
        return <p className="text-red-500">{error.message}</p>;
    }

    return <p>{JSON.stringify(data)}</p>;
}
