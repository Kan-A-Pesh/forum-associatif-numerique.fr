"use client";

import { Textarea } from "@/components/ui/textarea";
import { PartialProps } from "../partials";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

export const TextSizes = {
    h1: "text-4xl",
    h2: "text-3xl",
    h3: "text-2xl",
    p: "text-base",
};

export const TextSchema = z.object({
    size: z.enum(["h1", "h2", "h3", "p"]),
    color: z.string().regex(/^#[0-9a-f]{6}$/),
    content: z.string(),
});

export const TextDefault = { size: "p", color: "#ffffff", content: "" } as z.infer<typeof TextSchema>;

export default function PartialsText(props: PartialProps) {
    const schema = TextSchema.safeParse(props.component.value);
    const baseSchema = TextSchema.safeParse(props.base?.content);

    const content = schema.success ? schema.data : TextDefault;
    const base = baseSchema.success ? baseSchema.data : undefined;
    const setContent = useCallback(
        (content: z.infer<typeof TextSchema>) => props.setValue({ type: props.component.type, value: content }),
        [props],
    );

    return (
        <article>
            <div className="w-full flex gap-2 mb-4 overflow-x-auto whitespace-nowrap">
                {Object.entries(TextSizes).map(([size, className]) => (
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            setContent({ ...content, size: size as any });
                        }}
                        key={size}
                        variant={size === content.size ? "default" : "secondary"}
                    >
                        {size}
                    </Button>
                ))}
            </div>
            <Textarea
                value={content.content}
                onChange={(e) => {
                    e.preventDefault();
                    setContent({ ...content, content: e.target.value });
                }}
                placeholder={base?.content}
                className="w-full"
            />
        </article>
    );
}
