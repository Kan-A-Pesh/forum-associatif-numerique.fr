import { FeatherIconNames } from "./feather";

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
