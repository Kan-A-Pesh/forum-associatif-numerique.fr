"use client";

import { ZodForm } from "@/lib/hooks/useZodForm";
import ClubEditor from "./club-editor";
import { z } from "zod";
import { ClubFormSchema } from "../_schema/club";
import list from "./partials/list";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

type Component = { type: string; value: any };
export type BasePartialProps = React.ComponentProps<typeof ClubEditor> & { form: ZodForm<z.infer<typeof ClubFormSchema>> };
export type PartialProps = BasePartialProps & { component: Component; setValue: (value: Component) => void };
export type PartialWrapperProps = BasePartialProps & { componentId: number | [number, number] };

export default function Partials(props: PartialWrapperProps) {
    const content = { ...(props.form.values.content ?? []) };
    const component = Array.isArray(props.componentId)
        ? // @ts-ignore
          content[props.componentId[0]][props.componentId[1]]
        : content[props.componentId];

    const setValues = useCallback(
        (value: Component) =>
            props.form.setValue("content", (prev) => {
                const copy = [...(prev ?? [])];

                if (Array.isArray(props.componentId)) {
                    if (!Array.isArray(copy[props.componentId[0]])) {
                        copy[props.componentId[0]] = [copy[props.componentId[0]] as Component];
                    }

                    (copy[props.componentId[0]] as Component[])[props.componentId[1]] = value;
                } else {
                    copy[props.componentId] = value;
                }

                return copy;
            }),
        [props.form, props.componentId],
    );

    const PartialsComponent = list[component.type].editable;

    if (!PartialsComponent) {
        return <p className="bg-red-950 text-red-500 p-4 border border-red-500">Unknown component type: {component.type}</p>;
    }

    return (
        <section>
            <PartialsComponent {...props} component={component} setValue={setValues} />
            <div className="flex justify-end mt-4">
                <Button
                    variant="destructive"
                    onClick={(e) => {
                        e.preventDefault();
                        props.form.setValue("content", (prev) => {
                            const copy = [...(prev ?? [])];

                            if (Array.isArray(props.componentId)) {
                                if (!Array.isArray(copy[props.componentId[0]])) {
                                    copy[props.componentId[0]] = [copy[props.componentId[0]] as Component];
                                }

                                (copy[props.componentId[0]] as Component[]).splice(props.componentId[1], 1);

                                if ((copy[props.componentId[0]] as Component[]).length === 1) {
                                    copy.splice(props.componentId[0], 1, (copy[props.componentId[0]] as Component[])[0]);
                                }
                            } else {
                                copy.splice(props.componentId, 1);
                            }

                            return copy;
                        });
                    }}
                >
                    Remove
                </Button>
            </div>
        </section>
    );
}
