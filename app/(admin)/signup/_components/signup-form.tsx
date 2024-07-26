"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import updateUser from "../_actions/update-user";

interface Props {
    email?: string;
    token: string;
}

export default function SignupForm({ email, token }: Props) {
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");

    const handleSubmit = async () => {
        if (password !== confirm) {
            return toast({
                title: "Passwords do not match",
                description: "Please make sure both passwords are the same.",
                variant: "destructive",
            });
        }

        // Create account
        const result = await updateUser(email ?? "", token, password);

        if (result?.error) {
            return toast({
                title: result.error.name,
                description: result.error.message,
                variant: "destructive",
            });
        }

        toast({
            title: "Account created",
            description: "You can now login with your email and password.",
        });
    };

    if (!email) {
        return (
            <section className="flex-1 flex flex-col gap-4 bg-black border rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-center text-red-500">Oops...</h1>
                <p className="text-red-500 text-center">
                    An error occurred while trying to create your account.
                    <br />
                    Contact administration for further assistance.
                </p>
            </section>
        );
    }

    return (
        <section className="flex-1 flex flex-col gap-4 bg-black border rounded-2xl p-8">
            <h1 className="text-2xl font-bold text-center">Signup</h1>

            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input value={email} disabled readOnly className="min-w-56" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="min-w-56"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input
                    type="password"
                    id="confirm"
                    name="confirm"
                    required
                    className="min-w-56"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />
            </div>

            <Button onClick={handleSubmit}>Create account</Button>
        </section>
    );
}
