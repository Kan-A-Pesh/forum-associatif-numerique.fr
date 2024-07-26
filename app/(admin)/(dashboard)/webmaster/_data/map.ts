import { Map } from "@/types/map";

export const base = "/webmaster";

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
                    title: "Create a club admin",
                },
                viewClub: {
                    url: `/clubs`,
                    title: "View clubs page",
                },
                categories: {
                    url: `${base}/categories`,
                    title: "Categories",
                },
            },
        },
    },
    languages: {
        url: `${base}/languages`,
        title: "Languages",
    },
    medias: {
        url: `${base}/medias`,
        title: "Medias",
    },
};
