"use client";

import { getPublicUrl } from "@/lib/supabase/wrappers/bucket";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/ui/cn";
import { emptyImage } from "@/lib/ui/empty-image";

interface Props {
    path?: string | null;
}

export default function PathImage({ path, ...props }: Props & Omit<React.ComponentProps<typeof Image>, "src">) {
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        path ? getPublicUrl(path).then(setSrc) : setSrc(emptyImage);
    }, [path]);

    if (!src) {
        return <Skeleton className={props.className} style={{ height: props.height ?? "100%", width: props.width ?? "100%" }} />;
    }

    const { className, height, width, ...imageProps } = props;

    return (
        <div className={"relative grid place-items-center"} style={{ height: props.height ?? "100%", width: props.width ?? "100%" }}>
            <Image src={src} fill {...imageProps} className={cn("absolute object-cover inset-0", props.className)} />
        </div>
    );
}
