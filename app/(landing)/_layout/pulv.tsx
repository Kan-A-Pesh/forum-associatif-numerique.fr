"use server";

import Image from "next/image";
import Title from "./components/title";

import students from "../_assets/students.png";
import pulv from "../_assets/pulv.png";
import events from "../_assets/events.png";
import T from "@/components/i18n/t";

export default async function Pulv() {
    return (
        <section className="flex flex-col gap-16 py-24 px-4 container items-center">
            <Title title={<T>landing.pulv.title</T>} subtitle={<T>landing.pulv.subTitle</T>} />
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <Image className="rounded-lg" src={students} alt="Students" width={375} height={285} />
                <div>
                    <h4 className="text-6xl font-bold text-cyan-200 mb-4"><T>landing.pulv.step1.title</T></h4>
                    <p className="text-xl font-semibold mb-8"><T>landing.pulv.step1.subTitle</T></p>
                    <p className="text-justify max-w-md">
                        <T>landing.pulv.step1.description</T>
                    </p>
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-8 items-center justify-center">
                <div>
                    <h4 className="text-6xl font-bold text-cyan-200 mb-4"><T>landing.pulv.step2.title</T></h4>
                    <p className="text-xl font-semibold mb-8"><T>landing.pulv.step2.subTitle</T></p>
                    <p className="text-justify max-w-md">
                        <T>landing.pulv.step2.description</T>
                    </p>
                </div>
                <Image className="rounded-lg" src={pulv} alt="Students" width={375} height={285} />
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <Image className="rounded-lg" src={events} alt="Students" width={375} height={285} />
                <div>
                    <h4 className="text-6xl font-bold text-cyan-200 mb-4"><T>landing.pulv.step3.title</T></h4>
                    <p className="text-xl font-semibold mb-8"><T>landing.pulv.step3.subTitle</T></p>
                    <p className="text-justify max-w-md">
                        <T>landing.pulv.step3.description</T>
                    </p>
                </div>
            </div>
        </section>
    );
}
