"use server";

import { Status } from "@/types/status";
import { createClient } from "../supabase/server";
import { md5hash } from "../crypto/md5";
import { FileData } from "@/types/assets/file-data";

export async function getAssetStorage() {
    const supabase = createClient();
    const storage = supabase.storage.from("assets");
    const cache = supabase.from("cache");

    return { supabase, cache, storage };
}

export async function getPublicUrl(filePath: string, assetStorage?: any): Promise<string> {
    const { cache, storage } = assetStorage ?? (await getAssetStorage());
    const { data } = await cache.select("value").limit(1).eq("key", md5hash(filePath)).maybeSingle();
    return storage.getPublicUrl(filePath).data.publicUrl + (data ? "?v=" + data.value : "");
}

export async function listFiles(folderPath: string): Promise<FileData[]> {
    const assetStorage = await getAssetStorage();

    const fileList = await assetStorage.storage.list(folderPath);
    if (fileList.error) return [];

    const files = await Promise.all(
        fileList.data.map(async (file) => {
            const filePath = folderPath + "/" + file.name;
            return {
                path: filePath,
                url: await getPublicUrl(filePath, assetStorage),
            };
        }),
    );
    return files ?? [];
}

export async function uploadFile(filePath: string, fileFormData: FormData): Promise<Status<FileData>> {
    const file = fileFormData.get("data") as File;

    if (!file) {
        return {
            error: {
                name: "FileError",
                message: "No file provided",
            },
            data: null,
        };
    }

    const storage = await getAssetStorage();
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

    return {
        error: error,
        data: data
            ? {
                  path: filePath,
                  url: await getPublicUrl(filePath, storage),
              }
            : null,
    };
}

export async function removeFile(filePath: string): Promise<Status<void>> {
    const storage = await getAssetStorage();

    const { error } = await storage.storage.remove([filePath]);
    await storage.cache.delete().eq("key", md5hash(filePath));

    return {
        error: error,
        data: null,
    };
}
