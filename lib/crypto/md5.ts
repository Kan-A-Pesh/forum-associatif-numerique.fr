import { createHash } from "crypto";

export default function md5hash(data: string): string {
    return createHash("md5").update(data).digest("hex");
}
