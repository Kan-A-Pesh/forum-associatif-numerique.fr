"use client";

import Icon from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datapicker-with-range";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Status } from "@/types/status";
import getHslColor from "@/lib/ui/color";
import Image from "next/image";
import { NewsFormSchema } from "../_schema/news-form";
import { z } from "zod";
import { timeRangeToString } from "@/lib/ui/time";
import useZodForm from "@/lib/hooks/useZodForm";
import { TAnyZodSafeFunctionHandler } from "zsa";

interface Props {
    initialArticle?: z.infer<typeof NewsFormSchema>;
    onPublish: TAnyZodSafeFunctionHandler;
}

export default function ArticleEditor({ initialArticle, onPublish }: Props) {
    const {
        values: news,
        setValue,
        submitFunction,
        register,
    } = useZodForm(
        NewsFormSchema,
        initialArticle ?? {
            lang: 0,
            color: 0,
            title: "",
            description: "",
            start_time: null,
            end_time: null,
            metadata: null,
            thumbnail: null,
        },
        onPublish,
    );

    const newsColorHsl = getHslColor(news.color);
    const newsTime = timeRangeToString(news.start_time, news.end_time);

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
                        <Input placeholder="Title" size={32} {...register.text("title")} />
                        {/* {validationErrors?.title?.message && <span className="text-red-500">{validationErrors.title.message}</span>} */}
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
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label>Color</Label>
                        <div className="flex flex-wrap gap-2 w-full">
                            <div className="p-4 py-2 bg-black border border-input flex items-center gap-2">
                                <Switch
                                    id="add-news_no-color"
                                    checked={news.color === -1}
                                    onCheckedChange={(state) => setValue("color", state ? -1 : 0)}
                                />
                                <Label htmlFor="add-news_no-color">No color</Label>
                            </div>
                            <div
                                className="p-4 rounded-md bg-black border border-input max-w-64 grow grid place-items-center"
                                style={{ opacity: news.color === -1 ? 0.5 : 1 }}
                            >
                                <Slider min={0} max={360} disabled={news.color === -1} {...register.slider("color")} />
                            </div>
                        </div>
                    </div>
                </header>
                <h3 className="text-2xl font-bold opacity-75 mb-4">News content</h3>
                <div className="flex gap-6 flex-col md:flex-row">
                    <div className="bg-gray-500 bg-opacity-25 flex flex-col justify-center items-center w-[350px] h-[250px] rounded-lg shrink-0 max-w-[80vw] relative">
                        {news.thumbnail ? (
                            <Image
                                src={URL.createObjectURL(news.thumbnail)}
                                alt={news.title}
                                width={350}
                                height={250}
                                className="rounded-lg object-cover w-[350px] h-[250px]"
                            />
                        ) : (
                            <>
                                <Icon icon="upload" className="w-6 h-6" />
                                <span>Upload</span>
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            {...register.file("thumbnail")}
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        {news.metadata && Object.hasOwn(news.metadata as Object, "location") ? (
                            <div className="flex gap-1 items-center">
                                <Icon icon="map-pin" className="text-gray-600" size={16} />
                                <span className="text-gray-600 text-sm font-bold">{(news.metadata as any).location}</span>
                            </div>
                        ) : (
                            <Button variant="secondary">
                                <Icon icon="map-pin" className="text-gray-600" size={16} />
                                <span className="text-gray-600 text-sm font-bold">Add Location</span>
                            </Button>
                        )}

                        <div className="grow">
                            <div className="flex flex-col w-full gap-1.5">
                                <Label htmlFor="message">Description</Label>
                                <Textarea placeholder="Write anything..." className="w-full" {...register.text("description")} />
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Button className="mt-4" size="lg" type="submit">
                Publish article!
            </Button>
        </form>
    );
}
