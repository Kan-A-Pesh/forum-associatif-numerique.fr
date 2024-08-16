export default function getHostname(url: string) {
    try {
        return new URL(url).hostname;
    } catch {
        return url;
    }
}
