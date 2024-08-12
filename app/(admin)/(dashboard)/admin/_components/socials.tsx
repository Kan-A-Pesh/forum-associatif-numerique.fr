"use client";

import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import getSocialHandleFromUrl from "@/lib/ui/getSocialHandleFromUrl";
import getSocialIconFromUrl from "@/lib/ui/getSocialIconFromUrl";
import { useState } from "react";

interface Props {
    socials: string[];
    onAdd: (social: string) => void;
    onRemove: (index: number) => void;
}

export default function Socials({ socials, onAdd, onRemove }: Props) {
    const [value, setValue] = useState("");

    return (
        <div className="flex gap-2 items-center w-full overflow-x-auto pb-4 mt-8">
            {socials.map((social, i) => (
                <div key={i} className="flex gap-2 items-center border border-gray-700 bg-gray-950 rounded-md p-1 pl-2">
                    <Icon icon={getSocialIconFromUrl(social).icon} size={16} />
                    <span>{getSocialHandleFromUrl(social)}</span>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            onRemove(i);
                        }}
                        variant="destructive"
                        size="icon"
                    >
                        <Icon icon="trash" />
                    </Button>
                </div>
            ))}

            <div className="flex gap-1 border border-gray-700 bg-gray-950 rounded-md p-1 shrink-0">
                <Input value={value} onChange={(e) => setValue(e.target.value)} className="w-52" placeholder="https://social.com/@handle" />
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        onAdd(value);
                        setValue("");
                    }}
                    size="icon"
                    disabled={!value}
                >
                    <Icon icon="plus" />
                </Button>
            </div>
        </div>
    );
}
