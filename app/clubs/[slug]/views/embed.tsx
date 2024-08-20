"use client";

import { EmbedSchema } from "@/app/(admin)/(dashboard)/admin/_components/partials/embed";
import { ViewProps } from "../view";
import Bookmark from "@/components/common/bookmark";
import convertToEmbed from "@/lib/ui/convertToEmbed";

export default function ViewEmbed({ value }: ViewProps) {
    65;
    const schema = EmbedSchema.safeParse(value);
    if (!schema.success) return null;

    return (
        <div>
            {schema.data.url ? (
                schema.data.size === "bookmark" ? (
                    <Bookmark url={schema.data.url} />
                ) : (
                    <iframe src={convertToEmbed(schema.data.url)} className="w-full max-w-3xl aspect-video" />
                )
            ) : (
                <div className="w-full border border-red-700 bg-red-900 rounded-lg p-4">
                    <p className="text-red-500">No URL provided</p>
                </div>
            )}
        </div>
    );
}
