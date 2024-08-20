"use server";

import Image from "next/image";
import bg404 from "./404_background.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotFound() {
    return (
        <main className="h-screen w-full">
            <Image src={bg404} layout="fill" alt="404 background" className="absolute -z-10 inset-0 object-cover" />
            <div className="h-full w-full flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-2 opacity-75">Nothing to see here, kid.</h1>
                <p className="mb-2 opacity-50">You've gone too far, turn back now.</p>
                <p className="text-gray-900">Or not, I'm just a message. After all, what do I know?</p>

                <Link passHref href="/">
                    <Button variant="destructive" className="mt-4 opacity-75 hover:opacity-100">
                        Turn back
                    </Button>
                </Link>
            </div>

            <Link href="/dont-tell-anyone" className="absolute bottom-4 left-4 opacity-0 hover:opacity-25">
                Psst, don't tell anyone
            </Link>
        </main>
    );
}
