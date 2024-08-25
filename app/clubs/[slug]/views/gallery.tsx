"use client";

import { GallerySchema } from "@/app/(admin)/(dashboard)/admin/_components/partials/gallery";
import { ViewProps } from "../view";
import PathImage from "@/components/common/path-image";

export default function ViewGallery({ value }: ViewProps) {
    const schema = GallerySchema.safeParse(value);
    if (!schema.success) return null;

    return (
        <article className="grid grid-cols-3 gap-1">
            {schema.data.images.map((image, index) => (
                <div
                    key={index}
                    style={{
                        gridColumn: `span ${image.size}`,
                        aspectRatio: `${image.size}/1`,
                    }}
                >
                    <PathImage path={image.path} alt="" className="object-cover w-full h-full" />
                </div>
            ))}
        </article>
    );
}
