"use client";

import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import partialList from "./list";
import { useState } from "react";
import { cn } from "@/lib/ui/cn";

interface Props {
    onSelect: (type: string) => void;
    alwaysVisible?: boolean;
    vertical?: boolean;
}

export default function PartialsAdd({ onSelect, alwaysVisible, vertical }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section
            className={cn(
                " w-full h-full grid place-items-center relative",
                !alwaysVisible && "opacity-25 hover:opacity-100 transition-opacity",
                !vertical && "py-8",
            )}
        >
            <hr className={cn("border-0 absolute -z-20 bg-gray-700", vertical ? "w-[1px] h-full" : "h-[1px] w-full")} />
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button size="icon" variant="outline" className="w-12 h-12">
                        <Icon icon="plus" size={32} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex flex-col gap-1">
                        {Object.entries(partialList).map(([key, { icon, name }]) => (
                            <Button
                                key={key}
                                onClick={() => {
                                    onSelect(key);
                                    setIsOpen(false);
                                }}
                                className="w-full"
                                variant="ghost"
                            >
                                <Icon icon={icon} />
                                <span className="me-auto ms-2">{name}</span>
                            </Button>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </section>
    );
}
