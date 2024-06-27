"server-only";

import { getPublicUrl, uploadFile } from "@/utils/assets/bucket";

export default abstract class AssetsHero {
    static getUrl = async () => await getPublicUrl("hero.png");
    static upload = async (fileFormData: FormData) => {
        "use server";
        return await uploadFile("hero.png", fileFormData.get("data") as File);
    };
}
