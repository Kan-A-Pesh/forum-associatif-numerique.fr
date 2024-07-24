"use server";

import { getPublicUrl } from "@/lib/supabase/wrappers/bucket";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
    avatarPath?: string | null;
    username?: string;
    quote?: string;
}

export default async function Profile({ avatarPath, username, quote }: Props) {
    return (
        <article className="flex gap-2 justify-center items-center">
            <Avatar>
                <AvatarImage src={avatarPath ? await getPublicUrl(avatarPath) : undefined} alt={username} />
                <AvatarFallback>{username ?? "★"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{username}</h2>
                <p className="text-sm text-gray-500">{quote}</p>
            </div>
        </article>
    );
}
