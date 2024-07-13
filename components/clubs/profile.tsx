"use server";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
    avatarUrl?: string;
    username?: string;
    quote?: string;
}

export default async function Profile({ avatarUrl, username, quote }: Props) {
    return (
        <article className="flex gap-2 justify-center items-center">
            <Avatar>
                <AvatarImage src={avatarUrl} alt={username} />
                <AvatarFallback>{username ?? "★"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{username}</h2>
                <p className="text-sm text-gray-500">{quote}</p>
            </div>
        </article>
    );
}
