"use client";

import { cn } from "@/lib/ui/cn";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import Icon from "@/components/common/icon";
import { deleteUser } from "../_actions/deleteUser";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
    users: User[];
}

export default function AdminsCell({ users }: Props) {
    const router = useRouter();

    const handleDelete = async (id: string) => {
        const res = await deleteUser(id);

        if (res.error) {
            return toast({
                title: res.error.name,
                description: res.error.message,
                variant: "destructive",
            });
        }

        router.refresh();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={cn(
                        "py-2 px-4 rounded-lg border cursor-pointer hover:opacity-80",
                        users.length > 0 ? "text-green-500 border-green-500 bg-green-900" : "text-red-500 border-red-500 bg-red-900",
                    )}
                >
                    {users.length > 0 ? `${users.length} admin(s)` : "No admins"}
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <div className="max-h-[50vh] overflow-auto">
                    {users.map((user) => (
                        <div key={user.id} className="flex items-center justify-between gap-2">
                            <span className="text-ellipsis text-nowrap">{user.email}</span>
                            <Button size="icon" variant="destructive" onClick={() => handleDelete(user.id)}>
                                <Icon icon="trash" />
                            </Button>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
