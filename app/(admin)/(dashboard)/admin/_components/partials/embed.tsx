"use client";

import { PartialProps } from "../partials";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import Icon from "@/components/common/icon";
import Bookmark from "@/components/common/bookmark";
import convertToEmbed from "@/lib/ui/convertToEmbed";

export const EmbedSchema = z.object({
    size: z.enum(["bookmark", "frame"]),
    url: z.string(),
});

export const EmbedDefault = { size: "bookmark", url: "" } as z.infer<typeof EmbedSchema>;

export default function PartialsEmbed(props: PartialProps) {
    const schema = EmbedSchema.safeParse(props.component.value);
    const baseSchema = EmbedSchema.safeParse(props.base?.content);

    const content = schema.success ? schema.data : EmbedDefault;
    const base = baseSchema.success ? baseSchema.data : undefined;
    const setContent = useCallback(
        (content: z.infer<typeof EmbedSchema>) => props.setValue({ type: props.component.type, value: content }),
        [props],
    );

    return (
        <article>
            <h2 className="text-sm mb-4">Enter post or channel link</h2>
            <div className="w-full flex gap-2 mb-4 whitespace-nowrap">
                <Input value={content.url} onChange={(e) => setContent({ ...content, url: e.target.value })} placeholder={base?.url} />
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        setContent({ ...content, size: "bookmark" });
                    }}
                    variant={content.size === "bookmark" ? "default" : "secondary"}
                    size="icon"
                >
                    <Icon icon="bookmark" />
                </Button>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        setContent({ ...content, size: "frame" });
                    }}
                    variant={content.size === "frame" ? "default" : "secondary"}
                    size="icon"
                >
                    <Icon icon="grid" />
                </Button>
            </div>

            {content.url ? (
                content.size === "bookmark" ? (
                    <Bookmark url={content.url} />
                ) : (
                    <iframe src={convertToEmbed(content.url)} className="w-full h-96" />
                )
            ) : (
                <div className="w-full border border-red-700 bg-red-900 rounded-lg p-4">
                    <p className="text-red-500">No URL provided</p>
                </div>
            )}
        </article>
    );
}
