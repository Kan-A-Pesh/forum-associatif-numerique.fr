import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ClassName = ClassValue | ClassValue[] | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
