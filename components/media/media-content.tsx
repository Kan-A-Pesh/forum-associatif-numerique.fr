"use client";

import { cn } from "@/lib/ui/cn";
import { FileData } from "@/types/file-data";
import Icon from "../common/icon";
import Image from "next/image";
import { toast } from "../ui/use-toast";
import { startTransition, useState } from "react";
import { compress } from "@/lib/image/compress";
import { useMediaStore } from "@/lib/stores/media";
import { deleteMedia, uploadMedia } from "./media-actions";
import { useRouter } from "next/navigation";

interface Props {
    files: FileData[];
    className?: string;
}

export default function MediaContent({ files, className }: Props) {
    const mediaStore = useMediaStore();
    const router = useRouter();

    const handleSelect = (file: FileData) => async () => {
        if (!mediaStore.savedCallback) {
            const result = await deleteMedia(file.path);

            if (result.error) {
                toast({
                    title: "Delete Error",
                    description: "An error occurred while deleting the file",
                    variant: "destructive",
                });
            } else {
                startTransition(router.refresh);
            }
        } else {
            mediaStore.savedCallback(file);
            mediaStore.close();
        }
    };

    const handleUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.multiple = true;
        input.onchange = async (e) => {
            if (!input.files) return;

            const formData = new FormData();
            for (let i = 0; i < input.files.length; i++) {
                formData.append("file", await compress(input.files[i]));
            }

            const result = await uploadMedia(formData);

            if (result.error) {
                toast({
                    title: "Upload Error",
                    description: "An error occurred while uploading the files",
                    variant: "destructive",
                });
            }

            if (result.data.errored.length > 0) {
                toast({
                    title: "Upload Error",
                    description: `${result.data.errored.length} file(s) failed to upload`,
                    variant: "destructive",
                });
            }

            startTransition(router.refresh);
        };
        input.click();
    };

    return (
        <section className={cn("grid grid-cols-3 gap-2", className)}>
            <button
                className="aspect-square flex flex-col items-center justify-center rounded-lg overflow-hidden bg-opacity-10 bg-white hover:bg-opacity-15 transition-colors"
                onClick={handleUpload}
            >
                <Icon icon="plus" size={24} />
                <span className="text-sm mt-1">Upload</span>
            </button>
            {files.map((file) => (
                <button
                    key={file.path}
                    className="aspect-square rounded-lg overflow-hidden relative hover:opacity-80 transition-opacity cursor-pointer"
                    onClick={handleSelect(file)}
                >
                    <Image
                        src={file.url}
                        alt={file.path}
                        height={256}
                        width={256}
                        className="object-cover w-full h-full absolute inset-0
                            hover:scale-[1.25] transition-transform"
                    />
                    {!mediaStore.savedCallback && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 opacity-0 hover:opacity-100 transition-opacity">
                            <Icon icon="trash" size={24} />
                            <span className="text-sm mt-1">Delete</span>
                        </div>
                    )}
                </button>
            ))}
        </section>
    );
}
