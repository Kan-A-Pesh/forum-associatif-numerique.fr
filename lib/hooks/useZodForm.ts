"use client";

import { z } from "zod";
import { Status } from "@/types/status";
import { useState } from "react";
import Exchanger from "../exchanger";

export default function useZodForm<K, T extends z.ZodObject<any>>(
    schema: T,
    defaultValues: z.infer<T>,
    onSubmit: (data: FormData) => Promise<Status<K>>,
) {
    const [values, setValues] = useState(defaultValues);
    const [status, setStatus] = useState<K | null | undefined>(undefined);
    const [errors, setErrors] = useState<string[]>([]);

    let successCallback: (data: K | null) => void;
    let errorCallback: (errors: string[]) => void;

    const changeErrors = (errors: string[]) => {
        setErrors(errors);
        errors.length > 0 && errorCallback && errorCallback(errors);
    };

    const changeStatus = (data: K | null | undefined) => {
        setStatus(data);
        data !== undefined && successCallback && successCallback(data);
    };

    const clear = () => {
        changeStatus(undefined);
        changeErrors([]);
    };

    const setValue = (key: keyof z.infer<T>, value: any) => {
        clear();
        setValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const onSuccess = (callback: (data: K | null) => void) => {
        successCallback = callback;
    };

    const onError = (callback: (errors: string[]) => void) => {
        errorCallback = callback;
    };

    const submitFunction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clear();

        const result = schema.safeParse(values);
        if (!result.success) {
            changeErrors(result.error.errors.map((e) => e.message));
            return;
        }

        const formData = await Exchanger.toFormData(schema, values);

        if (!formData.success) {
            changeErrors([formData.error.message]);
            return;
        }

        const status = await onSubmit(formData.formData);
        if (!status) return;

        status.error ? changeErrors([status.error.message]) : changeStatus(status.data);
        setValues(defaultValues);
        return status;
    };

    const registerText = (key: keyof z.infer<T>) => ({
        name: key,
        value: values[key] as string,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            clear();
            setValue(key, e.target.value);
        },
    });

    const registerSlider = (key: keyof z.infer<T>) => ({
        name: key,
        value: [values[key] as number],
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            clear();
            setValue(key, Number(e.target.value));
        },
    });

    const registerFile = (key: keyof z.infer<T>) => ({
        name: key,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            clear();
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
        status,
        errors,
        onSuccess,
        onError,
    };
}
