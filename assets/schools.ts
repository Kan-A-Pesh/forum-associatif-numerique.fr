import { listFiles } from "@/utils/assets/bucket";

export default abstract class AssetsSchools {
    static getUrls = listFiles("schools");
}
