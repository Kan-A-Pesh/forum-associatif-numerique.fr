"use client";

import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { translate } from "@/lib/stores/language";
import { FeatherIconNames } from "@/types/feather";
import { Tables } from "@/types/supabase";
import Link from "next/link";
import T from "@/components/i18n/t";

interface Props {
    translatedCategory?: Tables<"categories">[];
}

export default function CategoryCard({ translatedCategory }: Props) {
    const category = translatedCategory ? translate(translatedCategory) : null;

    return (
        <div className="flex items-center mb-2">
            <div className="p-2 bg-purple-900 rounded-lg text-purple-300 me-2">
                <Icon icon={(category?.icon as FeatherIconNames) ?? "star"} />
            </div>
            <h4 className="text-lg font-bold text-nowrap">{category?.name ?? <T>landing.categoryCardsTitle</T>}</h4>
            <hr className="border-gray-500 w-full mx-6" />
            <Link href={"/clubs" + (category?.id ? `?c=${category.id}` : "")} passHref>
                <Button><T>landing.discover</T></Button>
            </Link>
        </div>
    );
}
