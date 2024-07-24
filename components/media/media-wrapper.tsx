"use server";

import { getMedias } from "./media-actions";
import MediaDialog from "./media-dialog";

export default async function MediaWrapper() {
    const files = await getMedias();

    if (!files) return null;

    return <MediaDialog files={files} />;
}
