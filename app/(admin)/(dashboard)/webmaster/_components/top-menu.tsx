"use client";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { sitemap } from "../_data/map";
import Icon from "@/components/common/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ClassName, cn } from "@/lib/ui/cn";
import { logOut } from "@/lib/supabase/wrappers/auth";

interface Props {
    className?: ClassName;
}

export default function TopMenu({ className }: Props) {
    const triggerClass = navigationMenuTriggerStyle();
    const additionnalTriggerClass = "bg-transparent data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 text-nowrap";

    return (
        <section className={cn("top-0 left-0 w-full backdrop-blur-lg flex justify-between p-1 z-40", className)}>
            <NavigationMenu>
                <NavigationMenuList>
                    {Object.entries(sitemap).map(([key, value]) => {
                        let link = <>{value.title}</>;

                        if (value.url) {
                            link = (
                                <NavigationMenuLink className={cn(triggerClass, additionnalTriggerClass)} href={value.url}>
                                    {value.title}
                                </NavigationMenuLink>
                            );
                        } else if (value.menu) {
                            link = <NavigationMenuTrigger className={additionnalTriggerClass}>{value.title}</NavigationMenuTrigger>;
                        }

                        return (
                            <NavigationMenuItem key={key}>
                                {link}
                                {value.menu && (
                                    <NavigationMenuContent>
                                        <div className="flex flex-col-reverse md:flex-row gap-x-2 gap-y-1 p-2 justify-stretch">
                                            <div className="bg-opacity-10 bg-black p-4 rounded-lg w-48 flex flex-col">
                                                <Icon icon={value.menu.icon} className="w-6 h-6 mt-auto mb-2" />
                                                <span className="leading-tight">{value.menu.description}</span>
                                            </div>

                                            <div className="flex flex-col">
                                                {Object.entries(value.menu.children).map(([childKey, childValue]) => (
                                                    <NavigationMenuLink
                                                        key={childKey}
                                                        href={childValue.url}
                                                        className="w-full p-2 rounded-lg bg-opacity-0 hover:bg-opacity-10 bg-black text-nowrap"
                                                    >
                                                        {childValue.title}
                                                    </NavigationMenuLink>
                                                ))}
                                            </div>
                                        </div>
                                    </NavigationMenuContent>
                                )}
                            </NavigationMenuItem>
                        );
                    })}
                </NavigationMenuList>
            </NavigationMenu>

            <Popover>
                <PopoverTrigger>
                    <Avatar>
                        <AvatarFallback className="bg-black bg-opacity-20">WM</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="mt-1 me-1">
                    <p className="text-center">Connected as Webmaster</p>
                    <Button className="w-full" variant="destructive" onClick={logOut}>
                        Sign out
                    </Button>
                </PopoverContent>
            </Popover>
        </section>
    );
}
