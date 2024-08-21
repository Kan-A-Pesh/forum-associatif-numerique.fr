"use client";

import { ClubFormSchema } from "@/app/(admin)/(dashboard)/admin/_schema/club";
import EditorProps from "@/components/edition/i18n/editor";
import useZodForm from "@/lib/hooks/useZodForm";
import { z } from "zod";
import PartialsProfile from "./partials/profile";
import Partials from "./partials";
import PartialsAdd from "./partials/add";
import { getPartialDefault } from "./partials/list";
import Driver from "./driver";

export default function ClubEditor(props: EditorProps<z.infer<typeof ClubFormSchema>>) {
    const { initial = undefined, base = undefined, lang, onValuesChange, onSubmit } = props;

    const form = useZodForm(
        ClubFormSchema,
        initial ?? {
            id: props.additional?.club ?? "n/a",
            lang: lang,
            title: base?.title ?? props.additional?.club ?? undefined,
        },
        onSubmit,
        onValuesChange,
    );

    const insertComponent = (index: number | [number, number], type: string) => {
        form.setValue("content", (prev) => {
            const copy = [...(prev ?? [])];

            if (Array.isArray(index)) {
                if (!Array.isArray(copy[index[0]])) {
                    copy[index[0]] = [copy[index[0]] as any];
                }

                (copy[index[0]] as any[]).splice(index[1], 0, { type, value: getPartialDefault(type) });
            } else {
                copy.splice(index, 0, { type, value: getPartialDefault(type) });
            }

            return copy;
        });
    };

    return (
        <>
            {!initial && !base && <Driver key={"driver"} />}
            <form onSubmit={form.submitFunction}>
                <PartialsProfile form={form} {...props} />
                {form.values.content?.map((content, i) => (
                    <div className="py-2 px-2" key={i}>
                        <PartialsAdd onSelect={(type) => insertComponent(i, type)} />
                        {Array.isArray(content) ? (
                            <div
                                key={i}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full border border-gray-400 py-2 px-2 rounded-md"
                            >
                                {content.map((subcontent, j) => (
                                    <Partials {...props} componentId={[i, j]} form={form} key={`part-${i}-${j}`} />
                                ))}
                            </div>
                        ) : (
                            <div key={i} className="flex mx-auto gap-2">
                                <div className="py-2 px-2 max-w-5xl flex-grow">
                                    <Partials {...props} componentId={i} form={form} key={`part-${i}`} />
                                </div>
                                <div className="flex-shrink">
                                    <PartialsAdd onSelect={(type) => insertComponent([i, 1], type)} vertical />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <PartialsAdd onSelect={(type) => insertComponent(form.values.content?.length ?? 0, type)} alwaysVisible />
            </form>
        </>
    );
}
