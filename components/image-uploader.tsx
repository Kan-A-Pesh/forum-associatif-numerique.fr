"use client";

import { ClassName, cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Icon from "./icon";
import { Status } from "@/types/status";

interface Props {
    initialImage: string;
    onUpload: (fileFormData: FormData) => Promise<Status<string>>;
    height?: number;
    width?: number;
    alt: string;
    className?: ClassName;
}

export default function ImageUploader({ initialImage, onUpload, height, width, alt, className }: Props) {
    const [image, setImage] = useState<string>(initialImage);
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

    const upload = async (file: File) => {
        const formData = new FormData();
        formData.append("data", file);
        const { data, error } = await onUpload(formData);

        console.log(data, error);

        setSelectedImage(null);
        setError(error?.message ?? null);
        if (data) setImage(data);
    };

    return (
        <div className={cn("flex flex-col w-fit", className)}>
            <div className="relative">
                <Image
                    src={selectedImage ? URL.createObjectURL(selectedImage) : image}
                    width={width}
                    height={height}
                    style={{ height, width, objectFit: "cover" }}
                    alt={alt}
                    objectFit="cover"
                    objectPosition="center"
                />
                <button
                    data-dragging={isDragging}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 data-[dragging=true]:opacity-100 cursor-pointer w-full h-full"
                    onClick={handleClick}
                    ref={dropContainer}
                >
                    <div className="p-2 bg-black bg-opacity-50 rounded-lg border-2 border-dashed border-white w-32 h-32 flex flex-col items-center justify-center gap-1 pointer-events-none">
                        <Icon icon="upload" className="w-6 h-6" />
                        <span>{isDragging ? "Drop here" : "Upload"}</span>
                    </div>
                </button>
            </div>
            <div className="h-9 flex items-center justify-center mt-1 gap-2">
                {selectedImage ? (
                    <>
                        <Button size="sm" variant="link" className="min-w-24" onClick={() => setSelectedImage(null)}>
                            Cancel
                        </Button>
                        <Button size="sm" className="min-w-24" onClick={() => upload(selectedImage)}>
                            Upload
                        </Button>
                    </>
                ) : error ? (
                    <span className="text-sm text-red-500">{error}</span>
                ) : (
                    <span className="text-sm text-gray-500">Click to upload or drop a new image</span>
                )}
            </div>
        </div>
    );
}
