"use server";

import Image from "next/image";
import Title from "./components/title";

import students from "../_assets/students.png";
import pulv from "../_assets/pulv.png";
import events from "../_assets/events.png";

export default async function Pulv() {
    return (
        <section className="flex flex-col gap-16 py-24 px-4 container items-center">
            <Title title="Le Pôle Léonard de Vinci" subtitle="Un campus vibrant avec une multitude d'opportunités associatives." />
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <Image className="rounded-lg" src={students} alt="Students" width={375} height={285} />
                <div>
                    <h4 className="text-6xl font-bold text-cyan-200 mb-4">8600</h4>
                    <p className="text-xl font-semibold mb-8">étudiants</p>
                    <p className="text-justify max-w-md">
                        Le pôle Léonard de Vinci est composé de 3 écoles (ESILV, EMLV et IIM) et regroupe plus de 7 500 étudiants !
                        Cependant, comment rencontrer toutes ces personnes ? C’est là qu’intervient le merveilleux principe de la
                        transversalité : semaines transverses, sport obligatoire, et on y vient, le meilleur… les associations !
                    </p>
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-8 items-center justify-center">
                <div>
                    <h4 className="text-6xl font-bold text-cyan-200 mb-4">58000</h4>
                    <p className="text-xl font-semibold mb-8">m² de locaux</p>
                    <p className="text-justify max-w-md">
                        Au Pôle, nous avons la chance d’avoir un campus à l’américaine avec près de 58 000m2 de locaux ! De nombreuses
                        salles et équipements sont à ta disposition si tu veux t’amuser ou créer le prochain Go-Go Gadget… De plus, avec
                        l'arrivée en janvier 2022 des nouveaux locaux de l'IIM et l'arrivée prochaine des nouveaux locaux de l'ESILV et
                        l'EMLV, le champ des possibles s'élargit constamment !
                    </p>
                </div>
                <Image className="rounded-lg" src={pulv} alt="Students" width={375} height={285} />
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <Image className="rounded-lg" src={events} alt="Students" width={375} height={285} />
                <div>
                    <h4 className="text-6xl font-bold text-cyan-200 mb-4">350</h4>
                    <p className="text-xl font-semibold mb-8">évènements</p>
                    <p className="text-justify max-w-md">
                        Les associations rythment la vie du pôle et des étudiants grâce à leurs évènements ! Qu’ils soient directement à
                        destination des étudiants du pôle ou alors ouverts à l’extérieur, les évènements sont des moments à ne pas louper.
                    </p>
                </div>
            </div>
        </section>
    );
}
