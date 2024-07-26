"use server";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/agents/server";
import { packLangs } from "@/lib/supabase/wrappers/languages";
import ClubRow from "./_components/club-row";
import { User } from "@supabase/supabase-js";
import ZombieUsersTable from "./_components/zombie-users-table";
import { createAuthSuperClient } from "@/lib/supabase/agents/super-server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";

export default async function ClubsPage() {
    const supabase = await createClient();
    const superAuthClient = await createAuthSuperClient();

    const { data: clubsData, error: clubsError } = await supabase.from("clubs").select("*");
    const clubs: Record<string, any> = clubsData && clubsData.length > 0 ? await packLangs(clubsData) : {};

    const { data: usersData, error: usersError } = await superAuthClient.listUsers({ perPage: 1000 });

    const clubUsers: Record<string, User[]> = {};
    const zombieUsers: User[] = [];

    usersData.users.forEach((user) => {
        if (user.email?.endsWith("@admin")) return;

        if (user.user_metadata?.club) {
            const club = user.user_metadata.club as string;
            clubUsers[club] ? clubUsers[club].push(user) : (clubUsers[club] = [user]);
            clubs[club] = null;
        } else {
            zombieUsers.push(user);
        }
    });

    const error = clubsError || usersError;

    return (
        <section className="flex flex-col gap-y-4 p-4 md:p-8 lg:p-12 w-full max-w-4xl">
            <header className="mb-4">
                <h1 className="text-4xl font-bold text-white">Clubs</h1>
                <p className="text-white">Edit, add, or remove clubs.</p>

                <Link href="/webmaster/clubs/create" passHref>
                    <Button className="flex items-center gap-1 mt-4">
                        <Icon icon="plus" className="text-white" size={24} />
                        <span>Create a club admin</span>
                    </Button>
                </Link>
            </header>

            {error && <p className="text-red-500">Error: {error.message}</p>}

            {zombieUsers.length > 0 && (
                <div className="my-4">
                    <p className="text-red-500 mb-2">
                        {zombieUsers.length} users are not assigned to any club.
                        <br />
                        Contact the webmaster to check this issue.
                    </p>

                    <ZombieUsersTable zombieUsers={zombieUsers} />
                </div>
            )}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Slug</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Admins</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(clubs).map(([id, club]) => (
                        <ClubRow key={id} clubId={id} clubList={club} users={clubUsers[id] || []} />
                    ))}
                </TableBody>
            </Table>
        </section>
    );
}
