"use server";

import T from "@/components/i18n/t";

export default async function Footer() {
    return (
        <footer className="bg-black p-4 w-full text-center opacity-50">
            <T>landing.footerStart</T> <a href="https://kan-a-pesh.fr">Kan-A-Pesh</a> & <a href="https://github.com/F1N3X">Quentin Garnier</a> <T>landing.footerEnd</T>{" "}
            <a href="https://github.com/Kan-A-Pesh/forum-associatif-numerique.fr">GitHub</a>
        </footer>
    );
}
