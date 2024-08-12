"use client";

import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datapicker-with-range";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import useZodForm from "@/lib/hooks/useZodForm";
import EditorProps from "@/components/edition/i18n/editor";
import MediaInput from "@/components/media/media-input";
import { CategoryFormSchema } from "@/app/(admin)/(dashboard)/webmaster/_schema/category";
import IconPicker from "@/components/edition/icon-picker";

export default function CategoryEditor({
    initial = undefined,
    base = undefined,
    id,
    lang,
    onValuesChange,
    onSubmit,
}: EditorProps<z.infer<typeof CategoryFormSchema>>) {
    const { values, submitFunction, register, errors } = useZodForm(
        CategoryFormSchema,
        initial ?? {
            id: base?.id ?? id ?? undefined,
            lang: lang,
            name: "",
            icon: null,
        },
        onSubmit,
        onValuesChange,
    );

    return (
        <form onSubmit={submitFunction}>
            <article className="p-2 gap-2 rounded-lg shadow-md border border-gray-500 bg-gray-700 flex">
                <div className="flex flex-col gap-2">
                    <Label>Icon</Label>
                    <IconPicker placeholder={base?.icon} {...register.text("icon")} />
                    {errors["icon"] && <p className="text-red-500">{errors["icon"]}</p>}
                </div>
                <div className="flex flex-col grow gap-2">
                    <Label>Name</Label>
                    <Input placeholder={base?.name ?? "Enter name"} {...register.text("name")} className="w-full" />
                    {errors["name"] && <p className="text-red-500">{errors["name"]}</p>}
                </div>
            </article>

            {errors["_server"] && <p className="text-red-500 mt-2">{errors["_server"]}</p>}

            {onSubmit && (
                <Button type="submit" className="mt-4" size="lg">
                    Create category
                </Button>
            )}
        </form>
    );
}
