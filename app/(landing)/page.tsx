"use server";

import Hero from "./_layout/hero";
import News from "./_layout/news";
import Clubs from "./_layout/clubs";
import Pulv from "./_layout/pulv";
import Footer from "./_layout/footer";
import Background from "@/components/background/background";

export default async function Index() {
    return (
        <>
            <Hero />
            <div className="py-16 relative">
                <Background />
                <News />
                <Clubs />
                <Pulv />
            </div>
            <Footer />
        </>
    );
}
