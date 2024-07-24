"use server";

import Gallery from "@/components/edition/gallery";
import ImageUploader from "@/components/edition/image-uploader";
import { getPublicUrl, listFiles, removeFile, uploadFile } from "@/lib/supabase/wrappers/bucket";

export default async function AssetsPage() {
    return (
        <section className="flex flex-col gap-y-4 p-4 md:p-8 lg:p-12 w-full max-w-4xl">
            <header>
                <h1 className="text-4xl font-bold text-white">Assets Editor</h1>
                <p className="text-white">Edit your assets here.</p>
            </header>

            <h2 className="text-2xl font-bold text-white">Hero Image</h2>
            <ImageUploader
                initialImage={await getPublicUrl("hero.jpg", "assets")}
                onUpload={uploadFile}
                storageName="assets"
                name="hero.jpg"
                height={300}
                width={300}
                alt="Hero Image"
            />

            <h2 className="text-2xl font-bold text-white">School Images</h2>
            <Gallery
                initialFiles={await listFiles("schools", "assets")}
                folder="schools"
                uploadAction={uploadFile}
                storageName="assets"
                removeAction={removeFile}
            />
        </section>
    );
}
