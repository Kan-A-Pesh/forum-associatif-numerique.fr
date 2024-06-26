import { createClient } from "../supabase/server";

function getAssetStorage() {
    return createClient().storage.from("assets");
}

export function getPublicUrl(filePath: string): string {
    const storage = getAssetStorage();
    return storage.getPublicUrl(filePath).data.publicUrl;
}

export async function listFiles(folderPath: string): Promise<string[]> {
    const storage = getAssetStorage();

    const files = (await storage.list(folderPath)).data?.map((file) => {
        return storage.getPublicUrl(folderPath + "/" + file.name).data.publicUrl;
    });

    if (!files) throw new Error("No files found");
    return files;
}
