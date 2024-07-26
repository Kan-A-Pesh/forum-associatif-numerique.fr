"use server";

import Image from "next/image";
import { getPublicUrl } from "@/lib/supabase/wrappers/bucket";
import SignupForm from "./_components/signup-form";
import refreshSession from "./_actions/refresh-session";

interface Props {
    searchParams: { email: string; token: string };
}

export default async function Signup({ searchParams }: Props) {
    const user = await refreshSession(searchParams.email, searchParams.token);

    return (
        <main className="relative min-h-screen">
            <Image
                src={await getPublicUrl("hero.jpg", "assets")}
                alt="Banner"
                fill
                className="absolute inset-0 -z-10 object-cover object-center"
            />
            <div className="min-h-screen bg-opacity-80 bg-black grid place-items-center">
                <SignupForm email={user?.email} token={searchParams.token} />
            </div>
        </main>
    );
}
