import { getPublicUrl } from "@/utils/assets/bucket";

export default abstract class AssetsHero {
    static url = getPublicUrl("hero.png");
}
