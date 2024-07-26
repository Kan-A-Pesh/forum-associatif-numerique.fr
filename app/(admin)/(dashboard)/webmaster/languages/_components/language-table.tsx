"use client";

import { Tables } from "@/types/supabase";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/datatable";
import deleteLanguage from "../_actions/deleteLanguage";
import Icon from "@/components/common/icon";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import PathImage from "@/components/common/path-image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
    language: Tables<"languages">[];
}

export default function LanguageTable({ language }: Props) {
    const router = useRouter();

    if (language.length === 0) {
        return <p className="opacity-50">No languages found.</p>;
    }

    const handleDelete = (language: Tables<"languages">) => async () => {
        const status = await deleteLanguage(language.id);
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

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Flag</TableHead>
                    <TableHead>ISO</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {language.map((lang) => (
                    <TableRow>
                        <TableCell>{lang.id}</TableCell>
                        <TableCell>
                            <PathImage path={lang.flag} alt={lang.name} height={24} width={32} />
                        </TableCell>
                        <TableCell>{lang.name}</TableCell>
                        <TableCell className="w-full">{lang.display_name}</TableCell>
                        <TableCell>
                            <Button variant="destructive" onClick={handleDelete(lang)}>
                                <Icon icon="trash" size="16" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
