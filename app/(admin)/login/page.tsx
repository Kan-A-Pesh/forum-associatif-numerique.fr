"use server";

import Image from "next/image";
import { LoginForm } from "./_components/login-form";
import { login } from "./_actions/login";
import { redirect } from "next/navigation";
import getAuth from "@/lib/supabase/wrappers/auth";
import { getPublicUrl } from "@/lib/supabase/wrappers/bucket";

export default async function Login({ searchParams }: { searchParams: { message: string } }) {
    const { user } = await getAuth();

    if (user) {
        return redirect(user.email?.endsWith("@admin") ? "/webmaster" : "/admin");
    }

    return (
        <main className="relative min-h-screen">
            <Image
                src={await getPublicUrl("hero.jpg", "assets")}
                alt="Banner"
                fill
                className="absolute inset-0 -z-10 object-cover object-center"
            />
            <div className="min-h-screen bg-opacity-80 bg-black grid place-items-center">
                <LoginForm error={searchParams.message} login={login} />
            </div>
        </main>
    );
}
