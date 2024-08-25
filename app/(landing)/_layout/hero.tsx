import { getPublicUrl, listFiles } from "@/lib/supabase/wrappers/bucket";
import Image from "next/image";
import HeroButton from "./components/hero-button";
import T from "@/components/i18n/t";

export default async function Hero() {
    const heroImageUrl = await getPublicUrl("hero.jpg", "assets");
    const schoolImages = await listFiles("schools", "assets");

    return (
        <section className="relative min-h-screen min-w-full">
            <Image src={heroImageUrl} alt="Hero" className="object-cover object-center w-full h-full absolute -z-10" fill />

            <div className="bg-opacity-80 bg-black w-full min-h-screen p-2 sm:p-8 md:p-16 xl:p-32 flex">
                <div className="grow border border-slate-300 flex flex-col justify-between p-4 lg:p-8">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-purple-300 font-black capitalize">
                        FORUM
                        <br />
                        ASSOCIATIF
                    </h1>

                    <div className="m-auto text-center">
                        <h2 className="max-w-96 text-2xl leading-tight mb-4">
                            <T>landing.hero</T>
                        </h2>
                        <HeroButton />
                    </div>

                    <div className="flex justify-end gap-2">
                        {schoolImages.map((file, index) => (
                            <Image key={index} src={file.url} alt="School image" width={48} height={48} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
