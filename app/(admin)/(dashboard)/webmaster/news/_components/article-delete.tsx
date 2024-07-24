"use client";

import { Button } from "@/components/ui/button";
import deleteArticle from "../_actions/deleteArticle";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
}

export default function ArticleDelete({ id }: Props) {
    const router = useRouter();

    const handleDelete = async () => {
        const res = await deleteArticle(id);

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
        <Button onClick={handleDelete} variant="destructive">
            Delete article
        </Button>
    );
}
