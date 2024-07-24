"use client";

import { useMediaStore } from "@/lib/stores/media";
import { cn } from "@/lib/ui/cn";
import clsx from "clsx";
import Icon from "../common/icon";
import { FileData } from "@/types/file-data";
import PathImage from "../common/path-image";

interface Props {
    className?: clsx.ClassValue;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string | null;
    height?: number;
    width?: number;
    reducedCaptions?: boolean;
}

export default function MediaInput({ className, name, value, placeholder, onChange, height, width, reducedCaptions }: Props) {
    const { open } = useMediaStore((state) => ({ open: state.open }));

    const handleSelect = (file: FileData) => {
        onChange({ target: { value: file.path } } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleOpen = () => {
        open(handleSelect);
    };

    return (
        <div
            className={cn(
                "grid place-items-center rounded-lg shrink-0 relative bg-white bg-opacity-10 hover:bg-opacity-15 overflow-hidden cursor-pointer group",
                className,
            )}
            style={{ height: height, width: width }}
        >
            {value ? (
                <PathImage path={value} alt={name} className="group-hover:opacity-75 transition-opacity" height={height} width={width} />
            ) : (
                placeholder && (
                    <PathImage
                        path={placeholder}
                        alt={name}
                        className="opacity-60 group-hover:opacity-40 transition-opacity"
                        height={height}
                        width={width}
                    />
                )
            )}
            <button
                type="button"
                onClick={handleOpen}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-25 cursor-pointer w-full h-full"
            >
                <div
                    className={cn(
                        " bg-black bg-opacity-50 backdrop-blur-md rounded-lg flex flex-col items-center justify-center gap-1 pointer-events-none",
                        reducedCaptions ? "p-1" : "max-w-[75%] max-h-[75%] border-2 border-dashed border-white p-6",
                    )}
                >
                    <Icon icon="upload" className="w-6 h-6" />
                    {!reducedCaptions && <span>Upload</span>}
                </div>
            </button>
        </div>
    );
}
