"use server";

import { createClient } from "@/lib/supabase/agents/server";
import { getPublicUrl, listFiles, removeFile, uploadFile } from "@/lib/supabase/wrappers/bucket";
import { ErrorStatus, SuccessStatus } from "@/types/status";
import { randomUUID } from "crypto";

export async function uploadMedia(files: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        return ErrorStatus("Unauthorized", "You are not authorized to upload media");
    }

    const fileEntries = files.getAll("file");

    let errored = [],
        uploaded = [];

    for (const file of fileEntries) {
        if (file instanceof File) {
            const res = await uploadFile(user.id + "/" + randomUUID(), file as File);

            if (res.error) {
                errored.push(res.error);
            } else {
                uploaded.push(res.data);
            }
        }
    }

    return SuccessStatus({
        uploaded,
        errored,
    });
}

export async function deleteMedia(path: string) {
    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        return ErrorStatus("Unauthorized", "You are not authorized to delete media");
    }

    const res = await removeFile(path);

    if (res.error) {
        return ErrorStatus("Delete Error", "An error occurred while deleting the file");
    } else {
        return SuccessStatus(null);
    }
}

export async function getMedias() {
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        return null;
    }

    const filePaths = await listFiles(user.id);
    const fileDatas = await Promise.all(
        filePaths.map(async (file) => ({
            path: file.path,
            url: await getPublicUrl(file.path),
        })),
    );

    return fileDatas;
}
