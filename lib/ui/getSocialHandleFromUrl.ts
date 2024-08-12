import getSocialIconFromUrl from "./getSocialIconFromUrl";

export default function getSocialHandleFromUrl(url: string): string {
    const icon = getSocialIconFromUrl(url);
    try {
        const parsedUrl = new URL(url ?? "");
        return icon.accurate ? parsedUrl.pathname.substring(1) : parsedUrl.hostname + parsedUrl.pathname;
    } catch {
        return url;
    }
}
