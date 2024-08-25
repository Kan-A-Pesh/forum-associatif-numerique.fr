import { getPublicUrl, listFiles } from "@/lib/supabase/wrappers/bucket";
import HeroClient from './hero_client';

export default async function Hero() {
    const heroImageUrl = await getPublicUrl("hero.jpg", "assets");
    const schoolImages = await listFiles("schools", "assets");

    return <HeroClient heroImageUrl={heroImageUrl} schoolImages={schoolImages} />;
}