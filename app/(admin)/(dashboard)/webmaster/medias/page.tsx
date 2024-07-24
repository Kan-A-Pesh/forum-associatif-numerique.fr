"use server";

import { getMedias } from "@/components/media/media-actions";
import MediaContent from "@/components/media/media-content";

export default async function MediaPage() {
    const files = await getMedias();

    return (
        <section className="flex flex-col gap-y-4 p-4 md:p-8 lg:p-12 w-full max-w-4xl">
            <header className="mb-4">
                <h1 className="text-4xl font-bold text-white">Medias</h1>
                <p className="text-white mt-2">Here you can see all the media uploaded to the platform.</p>
                <p className="text-white mt-2 opacity-50">
                    NOTE: Currently, only admin medias are shown and admins can't see or delete user medias.
                </p>
            </header>

            {files ? (
                <MediaContent
                    files={files}
                    className="grid-cols-[repeat(auto-fill,minmax(192px,1fr))]
            "
                />
            ) : (
                <p className="text-red-500">Error loading medias</p>
            )}
        </section>
    );
}
