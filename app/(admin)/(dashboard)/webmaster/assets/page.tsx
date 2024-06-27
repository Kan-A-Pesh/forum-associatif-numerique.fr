"use server";

import AssetsHero from "@/assets/hero";
import ImageUploader from "@/components/image-uploader";

export default async function AssetsPage() {
    return (
        <section className="flex flex-col gap-y-4 p-4 md:p-8 lg:p-12">
            <header>
                <h1 className="text-4xl font-bold text-white">Assets Editor</h1>
                <p className="text-white">Edit your assets here.</p>
            </header>

            <h2 className="text-2xl font-bold text-white">Hero Image</h2>
            <ImageUploader
                initialImage={await AssetsHero.getUrl()}
                onUpload={AssetsHero.upload}
                height={300}
                width={300}
                alt="Hero Image"
            />
        </section>
    );
}
