"use client";

import { featherIconNames, FeatherIconNames } from "@/types/feather";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Icon from "../common/icon";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

interface Props {
    name?: string;
    placeholder?: string | null;
    value?: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function IconPicker({ name, placeholder, value, onChange }: Props) {
    const [open, setOpen] = useState(false);

    const handleChange = (icon: string) => {
        setOpen(false);
        onChange({ target: { value: icon } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary" name={name}>
                    {value ? (
                        <Icon icon={value as FeatherIconNames} />
                    ) : placeholder ? (
                        <Icon icon={placeholder as FeatherIconNames} />
                    ) : (
                        <Skeleton className="w-6 h-6" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div className="grid grid-cols-6 gap-2 p-1 pe-2 max-h-[50vh] overflow-y-scroll">
                    {featherIconNames.map((icon) => (
                        <Button key={icon} size="icon" variant="secondary" onClick={() => handleChange(icon)}>
                            <Icon icon={icon} />
                        </Button>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
