"use client";

import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";

export default function HeroButton() {
    return (
        <Button
            onClick={() => {
                window.scrollTo({
                    behavior: "smooth",
                    top: window.innerHeight,
                });
            }}
        >
            <Icon icon="chevrons-down" className="mr-2 opacity-50" />
            <span className="text-lg leading-none">Découvrir</span>
            <Icon icon="chevrons-down" className="ml-2 opacity-50" />
        </Button>
    );
}
