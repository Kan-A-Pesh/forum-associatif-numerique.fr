import { FeatherIconNames } from "@/types/feather";

export default function getSocialIconFromUrl(url: string): {
    icon: FeatherIconNames;
    accurate: boolean;
} {
    // No URL
    if (!url) return { icon: "link", accurate: false };

    // Protocol-based icons
    if (url.startsWith("mailto:")) return { icon: "mail", accurate: true };
    if (url.startsWith("tel:")) return { icon: "phone", accurate: true };
    if (url.startsWith("sms:")) return { icon: "message-circle", accurate: true };

    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;

    // Domain-based icons (accurate)
    if (domain.includes("facebook")) return { icon: "facebook", accurate: true };
    if (domain.includes("twitter")) return { icon: "twitter", accurate: true };
    if (domain.includes("instagram")) return { icon: "instagram", accurate: true };
    if (domain.includes("linkedin")) return { icon: "linkedin", accurate: true };
    if (domain.includes("youtube")) return { icon: "youtube", accurate: true };
    if (domain.includes("github")) return { icon: "github", accurate: true };
    if (domain.includes("gitlab")) return { icon: "gitlab", accurate: true };
    if (domain.includes("twitch")) return { icon: "twitch", accurate: true };
    if (domain.includes("telegram")) return { icon: "send", accurate: true };

    // Domain-based icons (inaccurate)
    if (domain.includes("bitbucket")) return { icon: "git-branch", accurate: false };
    if (domain.includes("discord")) return { icon: "message-square", accurate: false };
    if (domain.includes("whatsapp")) return { icon: "message-circle", accurate: true };
    if (domain.includes("snapchat")) return { icon: "camera", accurate: false };
    if (domain.includes("spotify")) return { icon: "music", accurate: false };

    // Default icon
    return { icon: "link", accurate: false };
}
