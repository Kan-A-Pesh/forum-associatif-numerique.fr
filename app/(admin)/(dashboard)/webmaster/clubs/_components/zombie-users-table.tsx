"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "@supabase/supabase-js";
import { deleteUser } from "../_actions/deleteUser";

interface Props {
    zombieUsers: User[];
}

export default function ZombieUsersTable({ zombieUsers }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {zombieUsers.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="w-full">{user.email}</TableCell>
                        <TableCell>
                            <p
                                className="cursor-pointer text-red-500 hover:text-red-300 hover:underline"
                                tabIndex={0}
                                onClick={() => deleteUser(user.id)}
                            >
                                Delete
                            </p>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
