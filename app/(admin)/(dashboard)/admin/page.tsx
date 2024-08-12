"use server";

import { createClient } from "@/lib/supabase/agents/server";
import { ClubFormSchema } from "./_schema/club";
import { z } from "zod";
import LangWrapper from "@/components/edition/i18n/lang-wrapper";
import ClubEditor from "./_components/club-editor";
import debugClub from "./_actions/debug";
import getSlug from "./_actions/getSlug";

interface Props {
    searchParams?: {
        club?: string;
    };
}

export default async function Admin({ searchParams }: Props) {
    const supabase = await createClient();
    const club = await getSlug(searchParams?.club);

    if (!club) {
        return <p className="text-red-500">Invalid club</p>;
    }

    const { data, error } = await supabase.from("clubs").select("*").eq("id", club).returns<z.infer<typeof ClubFormSchema>[]>();

    if (error) {
        return <p className="text-red-500">{error.message}</p>;
    }

    return <LangWrapper data={data} editor={ClubEditor} absoluteBanner onSubmit={debugClub} additional={{ club }} />;
}
