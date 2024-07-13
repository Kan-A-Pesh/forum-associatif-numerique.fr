"use server";

import Image from "next/image";
import AssetsHero from "@/assets/hero";
import { LoginForm } from "./_components/login-form";
import { login } from "./_actions/login";
import getAuth from "@/utils/supabase/auth";
import { redirect } from "next/navigation";

export default async function Login({ searchParams }: { searchParams: { message: string } }) {
    const { user } = await getAuth();

    if (user) {
        return redirect(user.email?.endsWith("@admin") ? "/webmaster" : "/admin");
    }

    const heroUrl = AssetsHero.url;

    return (
        <main className="relative min-h-screen">
            <Image src={heroUrl} alt="Banner" fill className="absolute inset-0 -z-10 object-cover object-center" />
            <div className="min-h-screen bg-opacity-80 bg-black grid place-items-center">
                <LoginForm error={searchParams.message} login={login} />
            </div>
        </main>
    );
}
