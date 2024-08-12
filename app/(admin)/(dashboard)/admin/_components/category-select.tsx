"use client";

import Icon from "@/components/common/icon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/ui/cn";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Tables } from "@/types/supabase";
import getCategories from "../_actions/getCategories";
import { useLanguageStore } from "@/lib/stores/language";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: clsx.ClassValue;
}

export default function CategorySelect({ value, onChange, placeholder, className }: Props) {
    const selectedLanguage = useLanguageStore((s) => s.selectedLanguage);
    const [categories, setCategories] = useState<Tables<"categories">[] | null | undefined>(undefined);

    useEffect(() => {
        getCategories(selectedLanguage).then(setCategories);
    }, [selectedLanguage]);

    // Loading
    if (categories === undefined) {
        return <Skeleton className={cn("w-full h-10", className)} />;
    }

    // Error
    if (categories === null) {
        return <p className="text-red-500">Failed to load categories</p>;
    }

    if (placeholder && !value) {
        return (
            <div className={cn("w-full rounded-md bg-gray-900 border border-gray-700 grid place-items-center h-10", className)}>
                <span className="text-gray-700 text-sm">Category already selected</span>
            </div>
        );
    }

    // Success
    return (
        <Select onValueChange={(v) => onChange({ target: { value: v } } as React.ChangeEvent<HTMLInputElement>)} value={value}>
            <SelectTrigger className={cn("w-full", className)}>
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                        <span className="flex">
                            <Icon icon={category.icon as any} className="mr-2" size={16} />
                            {category.name}
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
