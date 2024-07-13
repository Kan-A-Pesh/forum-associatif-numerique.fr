"use client";

import { ClassName, cn } from "@/lib/ui/cn";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import { Status } from "@/types/status";
import { compress } from "@/lib/image/compress";
import { FileData } from "@/types/file-data";

interface Props {
    initialImage?: string;
    height?: number;
    width?: number;
    alt: string;
    reducedCaption?: boolean;
    className?: ClassName;
    children?: React.ReactNode;
    onUpload: (storageName: string, name: string, fileFormData: FormData) => Promise<Status<FileData>>;
    remove?: (name: string) => Promise<Status<null>>;
    name: string;
    storageName: string;
}

export default function ImageUploader({
    initialImage,
    onUpload,
    remove,
    name,
    storageName,
    height,
    width,
    alt,
    reducedCaption,
    className,
    children,
}: Props) {
    const [image, setImage] = useState<string>(initialImage ?? "<null>");
    const [isDragging, setIsDragging] = useState(false);
    const dropContainer = useRef<HTMLButtonElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Drag and drop events
    const dragEnter = () => {
        setIsDragging(true);
    };

    const dragLeave = () => {
        setIsDragging(false);
    };

    const dragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const drop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            const file = files[0];
            setSelectedImage(file);
        }
    };

    useEffect(() => {
        dropContainer.current?.addEventListener("dragenter", dragEnter);
        dropContainer.current?.addEventListener("dragleave", dragLeave);
        dropContainer.current?.addEventListener("dragover", dragOver);
        dropContainer.current?.addEventListener("drop", drop);

        return () => {
            dropContainer.current?.removeEventListener("dragenter", dragEnter);
            dropContainer.current?.removeEventListener("dragleave", dragLeave);
            dropContainer.current?.removeEventListener("dragover", dragOver);
            dropContainer.current?.removeEventListener("drop", drop);
        };
    }, [dropContainer]);

    const handleClick = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files && files.length > 0) {
                const file = files[0];
                setSelectedImage(file);
            }
        };
        input.click();
    };

    const handleUpload = async (file: File) => {
        const formData = new FormData();

        // Compress image
        const compressed = await compress(file);
        formData.append("data", compressed);
        const { data, error } = await onUpload(storageName, name, formData);

        console.log(data, error, name);

        setSelectedImage(null);
        setError(error?.message ?? null);
        if (data) setImage(data.url);
    };

    const handleRemove = async () => {
        if (!remove) return;
        const { error } = await remove(name);
        setError(error?.message ?? null);
    };

    return (
        <div className={cn("flex flex-col w-fit", className)}>
            <div className="relative overflow-hidden rounded-lg">
                {image === "<null>" && !selectedImage ? (
                    <div style={{ height, width }} className="bg-gray-500 bg-opacity-25 flex flex-col justify-center items-center">
                        {children}
                    </div>
                ) : (
                    <Image
                        src={selectedImage ? URL.createObjectURL(selectedImage) : image}
                        width={width}
                        height={height}
                        style={{ height, width }}
                        alt={alt}
                        className="object-cover object-center"
                    />
                )}
                <button
                    data-dragging={isDragging}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 data-[dragging=true]:opacity-100 cursor-pointer w-full h-full"
                    onClick={handleClick}
                    ref={dropContainer}
                >
                    <div className="p-2 bg-black bg-opacity-50 rounded-lg border-2 border-dashed border-white w-32 h-32 max-w-[75%] max-h-[75%] flex flex-col items-center justify-center gap-1 pointer-events-none">
                        <Icon icon="upload" className="w-6 h-6" />
                        {reducedCaption ? null : <span>{isDragging ? "Drop here" : "Upload"}</span>}
                    </div>
                </button>
            </div>
            <div className={cn("min-h-9 flex items-center justify-center mt-1 gap-2", reducedCaption ? "flex-col" : "flex-row")}>
                {selectedImage ? (
                    <>
                        <Button
                            size="sm"
                            variant="link"
                            className={reducedCaption ? "p-1" : "min-w-24"}
                            onClick={() => setSelectedImage(null)}
                        >
                            Cancel
                        </Button>
                        <Button size="sm" className={reducedCaption ? "p-1" : "min-w-24"} onClick={() => handleUpload(selectedImage)}>
                            Upload
                        </Button>
                    </>
                ) : error ? (
                    <span className="text-sm text-red-500">{error}</span>
                ) : reducedCaption ? null : (
                    <span className="text-sm text-gray-500">Click to upload or drop a new image</span>
                )}
                {remove && (
                    <Button size="sm" variant="destructive" className={reducedCaption ? "p-1" : "min-w-24"} onClick={handleRemove}>
                        Remove
                    </Button>
                )}
            </div>
        </div>
    );
}
