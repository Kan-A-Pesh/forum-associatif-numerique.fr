"use client";

import { useState } from "react";
import ImageUploader from "./image-uploader";
import { Status } from "@/types/status";
import { FileData } from "@/types/file-data";
import Icon from "../common/icon";

interface Props {
    folder?: string;
    storageName: string;
    initialFiles: FileData[];
    uploadAction: (storageName: string, name: string, fileFormData: FormData) => Promise<Status<FileData>>;
    removeAction: (storageName: string, name: string) => Promise<Status<null>>;
}

export default function Gallery({ folder = "", storageName, initialFiles, uploadAction, removeAction }: Props) {
    const [files, setFiles] = useState(initialFiles);

    const handleUpload = async (storage: string, name: string, fileFormData: FormData) => {
        const response = await uploadAction(storage, name, fileFormData);
        if (response.data) {
            // Replace the file if it already exists or add a new file
            const index = files.findIndex((file) => file.path === name);
            if (index !== -1) {
                setFiles(files.map((file, i) => (i === index ? (response.data as FileData) : file)));
            } else {
                setFiles([...files, response.data]);
            }
        }
        return response;
    };

    const handleRemove = async (name: string) => {
        const response = await removeAction(storageName, name);
        if (!response.error) setFiles(files.filter((file) => file.path !== name));
        return response;
    };

    const randomNewId = folder + "/" + Math.random().toString(36).substring(7);

    return (
        <div className="flex gap-4">
            {files.map((file) => (
                <ImageUploader
                    key={file.url}
                    initialImage={file.url}
                    onUpload={handleUpload}
                    name={file.path}
                    storageName={storageName}
                    height={64}
                    width={64}
                    alt={file.path}
                    reducedCaption
                    remove={handleRemove}
                />
            ))}
            <ImageUploader
                key={randomNewId}
                onUpload={handleUpload}
                name={randomNewId}
                storageName={storageName}
                height={64}
                width={64}
                alt="Add Image"
                reducedCaption
            >
                <Icon icon="plus" className="w-8 h-8" />
            </ImageUploader>
        </div>
    );
}
