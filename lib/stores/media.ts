"use client";

import { FileData } from "@/types/file-data";
import { create } from "zustand";

interface MediaState {
    isOpen: boolean;
    savedCallback?: (selected: FileData) => void;
    open: (callback?: (selected: FileData) => void) => void;
    close: () => void;
}

export const useMediaStore = create<MediaState>()((set) => ({
    isOpen: false,
    savedCallback: undefined,
    open: (callback) => set({ isOpen: true, savedCallback: callback }),
    close: () => set({ isOpen: false, savedCallback: undefined }),
}));
