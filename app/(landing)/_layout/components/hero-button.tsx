"use client";

import Icon from "@/components/common/icon";
import T from "@/components/i18n/t";
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
            <span className="text-lg leading-none">
                <T>landing.discover</T>
            </span>
            <Icon icon="chevrons-down" className="ml-2 opacity-50" />
        </Button>
    );
}
