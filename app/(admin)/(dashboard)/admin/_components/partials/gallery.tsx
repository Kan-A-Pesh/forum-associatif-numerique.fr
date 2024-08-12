"use client";

import { z } from "zod";
import { PartialProps } from "../partials";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import MediaInput from "@/components/media/media-input";
import PathImage from "@/components/common/path-image";

export const GallerySchema = z.object({
    images: z.array(
        z.object({
            path: z.string(),
            size: z.number().min(1).max(3),
        }),
    ),
});

export const GalleryDefault = { images: [] } as z.infer<typeof GallerySchema>;

export default function PartialsGallery(props: PartialProps) {
    const schema = GallerySchema.safeParse(props.component.value);
    const baseSchema = GallerySchema.safeParse(props.base?.content);

    const content = schema.success ? { ...schema.data } : GalleryDefault;
    const base = baseSchema.success ? baseSchema.data : undefined;

    const setContent = useCallback(
        (content: z.infer<typeof GallerySchema>) => props.setValue({ type: props.component.type, value: content }),
        [props],
    );

    return (
        <article>
            <div className="grid grid-cols-3 gap-1">
                {content.images.map((image, index) => (
                    <div
                        key={index}
                        className="relative min-h-32"
                        style={{
                            gridColumn: `span ${image.size}`,
                        }}
                    >
                        <div className="absolute inset-0 -z-10">
                            <PathImage path={image.path} alt="" className="object-cover w-full h-full" />
                        </div>
                        <div className="bg-black bg-opacity-50 text-white p-4 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setContent({
                                        ...content,
                                        images: content.images.filter((_, i) => i !== index),
                                    });
                                }}
                                variant="destructive"
                                size="icon"
                            >
                                <Icon icon="trash" />
                            </Button>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setContent({
                                        ...content,
                                        images: content.images.map((img, i) =>
                                            i === index ? { ...img, size: img.size === 3 ? 1 : img.size + 1 } : img,
                                        ),
                                    });
                                }}
                                variant="default"
                                size="icon"
                            >
                                <Icon icon="maximize-2" />
                            </Button>
                        </div>
                    </div>
                ))}
                <MediaInput
                    className="col-span-1 aspect-square min-h-32"
                    name="images"
                    value=""
                    reducedCaptions
                    onChange={(e) => {
                        setContent({
                            ...content,
                            images: [...content.images, { path: e.target.value, size: 1 }],
                        });
                    }}
                />
            </div>
        </article>
    );
}
