"use client";

import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datapicker-with-range";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import getHslColor from "@/lib/ui/color";
import { z } from "zod";
import { timeRangeToString } from "@/lib/ui/time";
import useZodForm from "@/lib/hooks/useZodForm";
import { NewsFormSchema } from "@/app/(admin)/(dashboard)/webmaster/_schema/news-form";
import EditorProps from "@/components/edition/i18n/editor";
import MediaInput from "@/components/media/media-input";

export default function ArticleEditor({
    initial = undefined,
    base = undefined,
    id,
    lang,
    onValuesChange,
    onSubmit,
}: EditorProps<z.infer<typeof NewsFormSchema>>) {
    const {
        values: news,
        setValue,
        submitFunction,
        register,
        errors,
    } = useZodForm(
        NewsFormSchema,
        initial ?? {
            id: base?.id ?? id ?? undefined,
            lang: lang,
            color: null,
            title: "",
            description: null,
            start_time: null,
            end_time: null,
            thumbnail_path: null,
        },
        onSubmit,
        onValuesChange,
    );

    const newsColorHsl = getHslColor(news.color ?? base?.color ?? -1);
    const color = news.color ?? base?.color ?? 0;
    const metadata = news.metadata ?? base?.metadata ?? null;
    const newsTime = timeRangeToString(news.start_time ?? base?.start_time ?? null, news.end_time ?? base?.end_time ?? null);

    return (
        <form onSubmit={submitFunction}>
            <article
                className="p-2 sm:p-4 md:p-6 lg:p-8 rounded-lg shadow-md border"
                style={{
                    backgroundColor: `hsl(${newsColorHsl}, 25%)`,
                    borderColor: `hsl(${newsColorHsl})`,
                }}
            >
                <h3 className="text-2xl font-bold opacity-75 mb-4">News header</h3>
                <header className="flex gap-4 w-full flex-col mb-8">
                    <div className="flex flex-col gap-1.5">
                        <Label>Title</Label>
                        <Input placeholder={base?.title} size={32} {...register.text("title")} />
                        {errors["title"] && <p className="text-red-500">{errors["title"]}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Time Range</Label>
                        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                            <DatePickerWithRange
                                date={{
                                    from: news.start_time ? new Date(news.start_time) : undefined,
                                    to: news.end_time ? new Date(news.end_time) : undefined,
                                }}
                                onChangeDate={(dateRange) => {
                                    setValue("start_time", dateRange?.from?.toISOString() ?? null);
                                    setValue("end_time", dateRange?.to?.toISOString() ?? null);
                                }}
                                displayTime={true}
                            />
                            <span className="border border-white rounded-sm px-2 py-1 text-white text-base">{newsTime}</span>
                        </div>
                        {(errors["start_time"] && <p className="text-red-500">{errors["start_time"]}</p>) ??
                            (errors["end_time"] && <p className="text-red-500">{errors["end_time"]}</p>)}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Color</Label>
                        <div className="flex flex-wrap gap-2 w-full">
                            <div className="p-4 py-2 bg-black border border-input flex items-center gap-2">
                                <Switch
                                    id="add-news_no-color"
                                    checked={color === -1}
                                    onCheckedChange={(state) => setValue("color", state ? -1 : 0)}
                                />
                                <Label htmlFor="add-news_no-color">No color</Label>
                            </div>
                            <div
                                className="p-4 rounded-md bg-black border border-input max-w-64 grow grid place-items-center"
                                style={{ opacity: color === -1 ? 0.5 : 1 }}
                            >
                                <Slider min={0} max={360} disabled={color === -1} {...register.slider("color")} />
                            </div>
                        </div>
                        {errors["color"] && <p className="text-red-500">{errors["color"]}</p>}
                    </div>
                </header>
                <h3 className="text-2xl font-bold opacity-75 mb-4">News content</h3>
                <div className="flex gap-6 flex-col md:flex-row">
                    <div>
                        <MediaInput
                            className="max-w-[80vw]"
                            placeholder={base?.thumbnail_path}
                            {...register.text("thumbnail_path")}
                            height={250}
                            width={350}
                        />
                        {errors["thumbnail_path"] && <p className="text-red-500">{errors["thumbnail_path"]}</p>}
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        {metadata?.location !== undefined ? (
                            <div className="flex gap-1 items-center">
                                <Icon icon="map-pin" className="text-gray-300 me-2" size={24} />
                                <Input
                                    placeholder={metadata.location ?? "Location"}
                                    className="w-full"
                                    {...register.text("metadata.location" as any)}
                                />
                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        setValue("metadata", (prev) => {
                                            const { location, ...rest } = prev ?? {};
                                            return rest;
                                        })
                                    }
                                >
                                    <Icon icon="x" className="text-gray-300" size={16} />
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setValue("metadata", (prev) => {
                                        return { ...prev, location: "" };
                                    });
                                }}
                            >
                                <Icon icon="map-pin" className="text-gray-300 me-2" size={16} />
                                <span className="text-gray-300 text-sm font-bold">Add Location</span>
                            </Button>
                        )}

                        <div className="grow">
                            <div className="flex flex-col m-full gap-1.5">
                                <Label htmlFor="message">Description</Label>
                                <Textarea
                                    placeholder={base?.description ?? "Write anything..."}
                                    className="w-full"
                                    {...register.text("description")}
                                />
                                {errors["description"] && <p className="text-red-500">{errors["description"]}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {errors["_server"] && <p className="text-red-500 mt-2">{errors["_server"]}</p>}

            {onSubmit && (
                <Button type="submit" className="mt-4" size="lg">
                    Create article
                </Button>
            )}
        </form>
    );
}
