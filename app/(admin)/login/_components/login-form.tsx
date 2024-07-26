"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";

interface Props {
    login: (formData: FormData) => void;
    error?: string;
}

export function LoginForm({ login, error }: Props) {
    const { pending } = useFormStatus();

    return (
        <form action={login}>
            <section className="flex-1 flex flex-col gap-4 bg-black border rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-center">Login</h1>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" required className="min-w-56" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password" required className="min-w-56" />
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <Button type="submit" className="text-white" disabled={pending}>
                    Login
                </Button>

                <a href="/" className="text-primary hover:underline text-center">
                    Back to home
                </a>
            </section>
        </form>
    );
}
