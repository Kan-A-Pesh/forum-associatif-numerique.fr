"use client";

import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { translate } from "@/lib/stores/language";
import { FeatherIconNames } from "@/types/feather";
import { Tables } from "@/types/supabase";
import Link from "next/link";

interface Props {
    category: Tables<"categories">[];
    selected?: string;
    q?: string;
}

export default function CategoryButton({ category, selected, q }: Props) {
    const translatedCategory = translate(category);

    return (
        <Link href={`?c=${translatedCategory.id}&q=${q || ""}`} passHref>
            <Button size="sm" variant={translatedCategory.id === selected ? "default" : "secondary"}>
                <Icon size={16} icon={translatedCategory.icon as FeatherIconNames} />
                <span className="ms-2">{translatedCategory.name}</span>
            </Button>
        </Link>
    );
}
