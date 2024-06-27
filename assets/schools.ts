"server-only";

import { listFiles, removeFile, uploadFile } from "@/utils/assets/bucket";

export default abstract class AssetsSchools {
    static getUrls = async () => await listFiles("schools");
    static remove = async (filePath: string) => await removeFile(filePath);
    static upload = async (file: File, name: string) => await uploadFile("schools/" + name, file, { path: "/", type: "layout" });
}
