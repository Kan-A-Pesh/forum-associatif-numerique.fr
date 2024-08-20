"use client";

import { ViewProps } from "../view";
import { TextSchema, TextSizes } from "@/app/(admin)/(dashboard)/admin/_components/partials/text";
import { cn } from "@/lib/ui/cn";

export default function ViewText({ value }: ViewProps) {
    const schema = TextSchema.safeParse(value);
    if (!schema.success) return null;

    const TextComponent = schema.data.size;
    const size = TextSizes[schema.data.size];

    console.log(schema.data.content);

    return (
        <TextComponent className={cn(size, "whitespace-pre-line")} style={{ color: schema.data.color }}>
            {schema.data.content}
        </TextComponent>
    );
}
