"use client";

import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { translate } from "@/lib/stores/language";
import { Tables } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import deleteClub from "../_actions/deleteClub";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import AdminsCell from "./admins-cell";

interface Props {
    clubId: string;
    clubList: Tables<"clubs">[] | null;
    users: User[];
}

export default function ClubRow({ clubId, clubList, users }: Props) {
    const router = useRouter();
    const club = clubList ? translate(clubList) : null;

    const handleDelete = async () => {
        if (!club) return;
        const res = await deleteClub(club.id);

        if (res.error) {
            toast({
                title: res.error.name,
                description: res.error.message,
                variant: "destructive",
            });
        }

        startTransition(router.refresh);
    };

    return (
        <TableRow>
            <TableCell className="text-nowrap">{clubId}</TableCell>
            <TableCell className="w-full">
                {club ? (
                    club.title
                ) : (
                    <div className="py-2 px-4 rounded-lg border text-orange-500 border-orange-500 bg-orange-900 w-fit">
                        Club not activated
                    </div>
                )}
            </TableCell>
            <TableCell className="text-nowrap">
                <AdminsCell users={users} />
            </TableCell>
            <TableCell className="text-nowrap">
                <Button size="icon" onClick={handleDelete} variant="destructive" disabled={!club}>
                    <Icon icon="trash" />
                </Button>
            </TableCell>
        </TableRow>
    );
}
