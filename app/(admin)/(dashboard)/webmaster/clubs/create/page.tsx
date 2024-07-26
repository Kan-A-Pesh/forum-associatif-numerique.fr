"use server";

import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateClubForm from "../_components/create-club-form";
import createClubAdmin from "../_actions/createClubAdmin";
import { redirect } from "next/navigation";

export default async function CreateClubsPage() {
    const createClubAdminAction = async (data: any) => {
        "use server";
        const result = await createClubAdmin(data);
        console.log(result);
        if (!result.error) redirect("/webmaster/clubs");
        return result;
    };

    return (
        <section className="flex flex-col gap-y-4 p-4 md:p-8 lg:p-12 w-full max-w-4xl">
            <header className="mb-4">
                <Link href="/webmaster/clubs" passHref>
                    <Button variant="link" className="text-white gap-2">
                        <Icon icon="arrow-left" size={16} />
                        <span>Back to clubs</span>
                    </Button>
                </Link>
                <h1 className="text-4xl font-bold text-white mt-2">Create a club admin</h1>
                <div className="text-primary-400 border border-primary-400 bg-primary-950 w-full p-4 rounded-lg mt-4 flex gap-4">
                    <Icon icon="info" className="text-primary-400" size={32} />
                    <p>
                        Creating a club admin will send an invitation email to the provided email address.
                        <br />
                        The user will be able to create an account and manage (or create if not existing) the club with the provided ID.
                    </p>
                </div>
            </header>

            <CreateClubForm onSubmit={createClubAdminAction} />
        </section>
    );
}
