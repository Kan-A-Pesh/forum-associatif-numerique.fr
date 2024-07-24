"use client";

import { Tables } from "@/types/supabase";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/datatable";
import deleteLanguage from "../_actions/delete";
import { LanguageDeleteFormShema } from "@/app/(admin)/_schema/language";
import Icon from "@/components/common/icon";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import PathImage from "@/components/common/path-image";

interface Props {
    language: Tables<"languages">[];
}

export default function LanguageTable({ language }: Props) {
    const router = useRouter();

    if (language.length === 0) {
        return <p className="opacity-50">No languages found.</p>;
    }

    const handleDelete = (language: Tables<"languages">) => async () => {
        const result = LanguageDeleteFormShema.safeParse(language);

        if (!result.success) {
            return toast({
                title: result.error.name,
                description: result.error.message,
                variant: "destructive",
            });
        }

        const status = await deleteLanguage(result.data);
        if (status.error) {
            return toast({
                title: status.error.name,
                description: status.error.message,
                variant: "destructive",
            });
        }

        // Refresh the page
        startTransition(router.refresh);

        return toast({
            title: "Success",
            description: "The language has been deleted successfully",
        });
    };

    const columns: ColumnDef<(typeof language)[0]>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            id: "flag",
            header: "Flag",
            cell: ({ row }) => {
                return <PathImage path={row.original.flag} alt={row.original.name} height={24} width={32} />;
            },
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "created_at",
            header: "Created At",
        },
        {
            id: "delete_action",
            cell: ({ row }) => {
                return (
                    <Button variant="destructive" onClick={handleDelete(row.original)}>
                        <Icon icon="trash" size="16" />
                    </Button>
                );
            },
        },
    ];

    return <DataTable columns={columns} data={language} />;
}
