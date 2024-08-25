"use server";

import { ErrorStatus, Status, SuccessStatus } from "@/types/status";
import { createClient } from "../agents/server";
import md5hash from "@/lib/crypto/md5";
import { FileData } from "@/types/file-data";

export async function getStorage(name: string) {
    const supabase = await createClient();
    const storage = supabase.storage.from(name);
    const cache = supabase.from("cache");

    return { supabase, cache, storage };
}

export async function getPublicUrl(filePath: string, storageName: string = "images", assetStorage?: any): Promise<string> {
    const { cache, storage } = assetStorage ?? (await getStorage(storageName));
    const { data } = await cache.select("value").limit(1).eq("key", md5hash(filePath)).maybeSingle();
    return process.env.NEXT_PUBLIC_STORAGE_URL + "/" + storageName + "/" + filePath + (data ? "?v=" + data.value : "");
}

export async function listFiles(folderPath: string, storageName: string = "images"): Promise<FileData[]> {
    const assetStorage = await getStorage(storageName);

    const fileList = await assetStorage.storage.list(folderPath, {
        sortBy: { column: "updated_at", order: "desc" },
    });

    if (fileList.error) return [];

    const files = await Promise.all(
        fileList.data.map(async (file) => {
            const filePath = folderPath + "/" + file.name;
            return {
                path: filePath,
                url: await getPublicUrl(filePath, storageName, assetStorage),
            };
        }),
    );
    return files ?? [];
}

export async function uploadFile(filePath: string, file: File, storageName?: string): Promise<Status<FileData>>;
export async function uploadFile(filePath: string, formData: FormData, storageName?: string): Promise<Status<FileData>>;
export async function uploadFile(
    filePath: string,
    fileFormData: FormData | File,
    storageName: string = "images",
): Promise<Status<FileData>> {
    const file = fileFormData instanceof File ? fileFormData : (fileFormData.get("data") as File);

    if (!file) {
        return ErrorStatus("FileError", "No file provided");
    }

    const storage = await getStorage(storageName);
    const { data, error } = await storage.storage.upload(filePath, file, {
        contentType: file.type,
        upsert: true,
    });

    if (!error) {
        await storage.cache.upsert([{ key: md5hash(filePath), value: md5hash(new Date().getTime().toString()) }], {
            onConflict: "key",
            ignoreDuplicates: false,
        });
    }

    if (data) {
        return SuccessStatus({
            path: filePath,
            url: await getPublicUrl(filePath, "", storage),
        });
    }

    return ErrorStatus(error);
}

export async function removeFile(filePath: string, storageName: string = "images"): Promise<Status<null>> {
    const storage = await getStorage(storageName);

    const { error } = await storage.storage.remove([filePath]);
    await storage.cache.delete().eq("key", md5hash(filePath));

    if (error) {
        return ErrorStatus(error);
    }

    return SuccessStatus(null);
}
