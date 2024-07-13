"use client";

import { z } from "zod";
import { Status } from "@/types/status";
import { useServerAction } from "zsa-react";
import { useState } from "react";
import { compress } from "../image/compress";
import { TAnyZodSafeFunctionHandler } from "zsa";

export default function useZodForm<K, T extends z.ZodObject<any>>(
    schema: T,
    defaultValues: z.infer<T>,
    onSubmit: TAnyZodSafeFunctionHandler,
) {
    const { isPending, execute } = useServerAction(onSubmit);
    const [values, setValues] = useState(defaultValues);

    const setValue = (key: keyof z.infer<T>, value: any) => {
        setValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const getFormData = async () => {
        const formData = new FormData();
        for (const key in values) {
            if ((values[key] as any) instanceof File) {
                formData.append(key, await compress(values[key]));
            } else {
                formData.append(key, values[key]);
            }
            console.log(typeof values[key]);
            console.log(formData.get(key));
        }
        return formData;
    };

    const submitFunction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = schema.safeParse(values);
        if (!result.success) {
            console.error(result.error.errors);
            return;
        }

        const formData = await getFormData();
        const [data, err] = await execute(formData);

        if (err) {
            console.error("formError", err);
            return;
        }

        if (data.error) {
            console.error("serverError", data.error);
            return;
        }

        console.log(data.data);
    };

    const registerText = (key: keyof z.infer<T>) => ({
        name: key,
        value: values[key] as string,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setValue(key, e.target.value);
        },
    });

    const registerSlider = (key: keyof z.infer<T>) => ({
        name: key,
        value: [values[key] as number],
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(key, Number(e.target.value));
        },
    });

    const registerFile = (key: keyof z.infer<T>) => ({
        name: key,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                setValue(key, file);
            }
        },
    });

    return {
        values,
        setValue,
        submitFunction,
        register: {
            text: registerText,
            slider: registerSlider,
            file: registerFile,
        },
        isPending,
    };
}
