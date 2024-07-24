"use client";

import { useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Props as WrapperProps } from "./lang-wrapper";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/ui/cn";
import { Tables } from "@/types/supabase";

interface Props {
    fallbackUUID: string;
    languages: Tables<"languages">[];
    defaultLanguage: number;
}

export default function LangEditor<T extends { lang: number; [key: string]: any }, K>({
    data,
    languages,
    defaultLanguage,
    editor,
    onSubmit,
    absoluteBanner,
    fallbackUUID,
}: Props & WrapperProps<T, K>) {
    const Editor = editor;
    const router = useRouter();
    const [activeLang, setActiveLang] = useState(defaultLanguage);
    const [modifiedData, setModifiedData] = useState([...data]);
    const [refreshKey, setRefreshKey] = useState(0);
    const bannerRef = useRef<HTMLDivElement>(null);

    const changesMade = modifiedData.some((row) => {
        const base = data.find((r) => r.lang == row.lang);
        return JSON.stringify(row) !== JSON.stringify(base);
    });

    const handleSave = async () => {
        const result = await Promise.all(
            modifiedData.map((row) => {
                return onSubmit(row);
            }),
        );

        router.refresh();
        setRefreshKey((prev) => prev + 1);

        const errorCount = result.filter((r) => r?.error).length;

        if (errorCount === 0) {
            toast({
                title: "Changes saved",
                description: "The changes have been saved successfully",
            });
        } else {
            toast({
                title: "Oops",
                description: `${errorCount} change(s) could not be saved`,
                variant: "destructive",
            });
        }
    };

    const handleCancel = () => {
        setModifiedData(data);
        setRefreshKey((prev) => prev + 1);
    };

    const trySetActiveLang = (lang: number) => {
        if (!changesMade) return setActiveLang(lang);
        if (!bannerRef.current) return;

        bannerRef.current.classList.add("anim:danger-shake");
        setTimeout(() => {
            bannerRef.current?.classList.remove("anim:danger-shake");
        }, 500);
    };

    return (
        <section>
            <div className="flex gap-4 items-center mb-4">
                <h2 className="text-xl">Language</h2>
                {languages.map((lang) => {
                    return (
                        <Button
                            key={lang.id}
                            onClick={() => trySetActiveLang(lang.id)}
                            variant={activeLang === lang.id ? "default" : "outline"}
                        >
                            {lang.display_name}
                        </Button>
                    );
                })}
            </div>
            <Editor
                key={activeLang + refreshKey}
                initial={data.find((row) => row.lang == activeLang)}
                base={data.find((row) => row.lang == defaultLanguage)}
                id={fallbackUUID}
                lang={activeLang}
                onValuesChange={(values) => {
                    setModifiedData((prev) => {
                        const index = prev.findIndex((row) => row.lang == activeLang);
                        if (index === -1) {
                            return [...prev, { ...values }];
                        } else {
                            const newValues = { ...prev[index], ...values };
                            prev[index] = newValues;
                            return [...prev];
                        }
                    });
                }}
            />
            {absoluteBanner && <div className="h-16" />}
            <div
                className={cn(
                    "flex gap-4 items-center mt-2 rounded-lg bg-black bg-opacity-50 backdrop-blur-lg border border-gray-700 p-4",
                    !absoluteBanner && !changesMade && "hidden",

                    absoluteBanner && "fixed bottom-4 left-[20vw] right-[20vw] z-20 translate-y-24 transition-transform duration-300",
                    absoluteBanner && changesMade && "translate-y-0 ",
                )}
                ref={bannerRef}
            >
                {absoluteBanner && <span className="me-auto">Some changes have been made</span>}
                <Button onClick={handleSave} variant="default">
                    Save
                </Button>
                <Button onClick={handleCancel} variant="outline">
                    Cancel
                </Button>
            </div>
        </section>
    );
}
