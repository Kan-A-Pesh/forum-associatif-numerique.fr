import { FeatherIconNames } from "@/types/feather";

export const base = "/webmaster";

export interface Map {
    [key: string]: {
        url: string | null;
        title: string;
        menu?: {
            icon: FeatherIconNames;
            description: string;
            children: {
                [key: string]: {
                    url: string;
                    title: string;
                };
            };
        };
    };
}

export const sitemap: Map = {
    dashboard: {
        url: `${base}`,
        title: "Dashboard",
    },
    landingPage: {
        url: null,
        title: "Landing Page",
        menu: {
            icon: "layout",
            description: "Manage the landing page content",
            children: {
                editContent: {
                    url: `${base}/assets`,
                    title: "Edit content",
                },
                manageNews: {
                    url: `${base}/news`,
                    title: "Manage news",
                },
                goToLandingPage: {
                    url: "/",
                    title: "View landing page",
                },
            },
        },
    },
    clubs: {
        url: null,
        title: "Clubs",
        menu: {
            icon: "users",
            description: "Edit, create, delete clubs and more",
            children: {
                viewClubs: {
                    url: `${base}/clubs`,
                    title: "Edit clubs",
                },
                createClub: {
                    url: `${base}/clubs/create`,
                    title: "Create a club",
                },
                viewClub: {
                    url: `/clubs`,
                    title: "View clubs page",
                },
            },
        },
    },
};
