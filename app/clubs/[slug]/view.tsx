"use client";

import { getPartialView } from "@/app/(admin)/(dashboard)/admin/_components/partials/list";

type ViewWrapperProps = { component: { type: string; value?: any } };
export type ViewProps = { value: any };

export default function View(props: ViewWrapperProps) {
    const ViewComponent = getPartialView(props.component.type);

    if (!ViewComponent) {
        return <p className="bg-red-950 text-red-500 p-4 border border-red-500">Unknown component type: {props.component.type}</p>;
    }

    return <ViewComponent value={props.component.value} />;
}
