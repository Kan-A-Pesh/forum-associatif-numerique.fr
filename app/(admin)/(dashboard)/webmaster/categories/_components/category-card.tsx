"use client";

import Icon from "@/components/common/icon";
import { Tables } from "@/types/supabase";
import { translate } from "@/lib/stores/language";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import deleteCategory from "../_actions/deleteCategory";
import { Button } from "@/components/ui/button";

interface Props {
    categoryList: Tables<"categories">[];
}

export default function CategoryCard({ categoryList }: Props) {
    const router = useRouter();
    const category = translate(categoryList);

    const handleDelete = async () => {
        const res = await deleteCategory(category.id);

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
        <TableRow>
            <TableCell>
                <Icon icon={category.icon as any} />
            </TableCell>
            <TableCell className="w-full">{category.name}</TableCell>
            <TableCell className="text-nowrap">
                <Button onClick={() => router.push(`/webmaster/categories/${category.id}`)} size="icon" className="me-2">
                    <Icon icon="edit" />
                </Button>
                <Button onClick={handleDelete} variant="destructive" size="icon">
                    <Icon icon="trash" />
                </Button>
            </TableCell>
        </TableRow>
    );
}
