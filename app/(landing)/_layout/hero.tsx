"use server";

import Image from "next/image";
import HeroButton from "./components/HeroButton";
import { getPublicUrl, listFiles } from "@/utils/assets/bucket";

export default async function Hero() {
    return (
        <section className="relative min-h-screen min-w-full">
            <Image
                src={await getPublicUrl("hero.jpg")}
                alt="Hero"
                className="object-cover object-center w-full h-full absolute -z-10"
                fill
            />

            <div className="bg-opacity-80 bg-black w-full min-h-screen p-2 sm:p-8 md:p-16 xl:p-32 flex">
                <div className="grow border border-slate-300 flex flex-col justify-between p-4 lg:p-8">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-purple-300 font-black capitalize">
                        FORUM
                        <br />
                        ASSOCIATIF
                    </h1>

                    <div className="m-auto text-center">
                        <h2 className="max-w-96 text-2xl leading-tight mb-4">Les associations étudiantes du Pôle Léonard de Vinci</h2>
                        <HeroButton />
                    </div>

                    <div className="flex justify-end gap-2">
                        {(await listFiles("schools")).map((files, index) => (
                            <Image key={index} src={files.url} alt="School image" width={48} height={48} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
