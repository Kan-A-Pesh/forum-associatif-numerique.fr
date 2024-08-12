"use client";

import MediaInput from "@/components/media/media-input";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BasePartialProps } from "../partials";
import CategorySelect from "../category-select";
import Socials from "../socials";

export default function PartialsProfile(props: BasePartialProps) {
    return (
        <section className="py-12 px-4 container mx-auto max-w-3xl">
            <div className="flex gap-8 items-center">
                <div className="rounded-3xl w-48 h-48 overflow-hidden">
                    <MediaInput
                        placeholder={props.base?.avatar_path}
                        {...props.form.register.text("avatar_path")}
                        height={192}
                        width={192}
                    />
                    {props.form.errors["avatar_path"] && <p className="text-red-500">{props.form.errors["avatar_path"]}</p>}
                </div>

                <div>
                    <div className="flex flex-col gap-2 mb-4">
                        <Label>Club Name</Label>
                        <Input placeholder={props.base?.title ?? undefined} size={32} {...props.form.register.text("title")} />
                        {props.form.errors["title"] && <p className="text-red-500">{props.form.errors["title"]}</p>}
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <Label>Catch Phrase</Label>
                        <Input placeholder={props.base?.subtitle ?? undefined} size={32} {...props.form.register.text("subtitle")} />
                        {props.form.errors["subtitle"] && <p className="text-red-500">{props.form.errors["subtitle"]}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Category</Label>
                        <CategorySelect placeholder={props.base?.category ?? undefined} {...props.form.register.text("category")} />
                        {props.form.errors["category"] && <p className="text-red-500">{props.form.errors["category"]}</p>}
                    </div>
                </div>
            </div>

            <Socials
                socials={props.form.values.socials ?? props.base?.socials ?? []}
                onAdd={(social) => {
                    props.form.setValue("socials", (prev) => {
                        if (prev?.includes(social)) return prev;
                        return [...(prev ?? []), social];
                    });
                }}
                onRemove={(index) => {
                    props.form.setValue("socials", (prev) => {
                        const copy = [...(prev ?? [])];
                        copy.splice(index, 1);
                        return copy;
                    });
                }}
            />
        </section>
    );
}
