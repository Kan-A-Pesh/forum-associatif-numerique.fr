import type { PartialProps } from "../partials";
import type React from "react";
import PartialsText, { TextDefault, TextSchema } from "./text";
import { z } from "zod";
import { FeatherIconNames } from "@/types/feather";
import PartialsGallery, { GalleryDefault, GallerySchema } from "./gallery";
import PartialsEmbed, { EmbedDefault, EmbedSchema } from "./embed";
import ViewText from "@/app/clubs/[slug]/views/text";
import ViewGallery from "@/app/clubs/[slug]/views/gallery";
import ViewEmbed from "@/app/clubs/[slug]/views/embed";
import { ViewProps } from "@/app/clubs/[slug]/view";

interface Partial {
    icon: FeatherIconNames;
    name: string;
    schema: z.ZodObject<any, any>;
    default: any;
    editable: React.ComponentType<PartialProps>;
    component: React.ComponentType<ViewProps>;
}

const partialList: { [key: string]: Partial } = {
    text: {
        icon: "type",
        name: "Text",
        schema: TextSchema,
        default: TextDefault,
        editable: PartialsText,
        component: ViewText,
    },
    gallery: {
        icon: "image",
        name: "Gallery",
        schema: GallerySchema,
        default: GalleryDefault,
        editable: PartialsGallery,
        component: ViewGallery,
    },
    embed: {
        icon: "bookmark",
        name: "Embed",
        schema: EmbedSchema,
        default: EmbedDefault,
        editable: PartialsEmbed,
        component: ViewEmbed,
    },
};

export const getPartialDefault = (type: string) => partialList[type].default;
export const getPartialView = (type: string) => partialList[type].component;

export default partialList;
