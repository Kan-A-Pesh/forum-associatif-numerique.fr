import { Map } from "@/types/map";

export const base = "/admin";

export const sitemap: Map = {
    dashboard: {
        url: `${base}`,
        title: "Dashboard",
    },
    medias: {
        url: `${base}/medias`,
        title: "Medias",
    },
    feedbacks: {
        url: `mailto:${process.env.NEXT_PUBLIC_SUPPORT_MAIL}`,
        title: "Make a feedback!",
    },
};
