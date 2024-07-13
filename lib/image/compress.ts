"use client";

import Compressor from "compressorjs";

interface CompressOptions {
    quality?: number;
    maxHeight?: number;
    maxWidth?: number;
}

export const compress = async (file: File | Blob, options?: CompressOptions): Promise<File | Blob> => {
    return await new Promise((resolve, reject) => {
        new Compressor(file, {
            retainExif: false, // Remove metadata
            quality: options?.quality || 0.65,
            maxHeight: options?.maxHeight || 2048,
            maxWidth: options?.maxWidth || 2048,
            convertSize: 0, // Convert to JPEG
            success: resolve,
            error: reject,
        });
    });
};
