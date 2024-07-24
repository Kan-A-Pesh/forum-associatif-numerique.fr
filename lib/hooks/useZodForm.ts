"use client";

import { z } from "zod";
import { Status } from "@/types/status";
import { useState } from "react";
import Errors, { hasError, parseServerError, parseZodError } from "@/types/errors";

export interface ZodForm<T> {
    values: T;
    setValue: <Key extends keyof T>(key: Key, value: T[Key] | ((prev: T[Key]) => T[Key])) => void;
    submitFunction?: (e: React.FormEvent<HTMLFormElement>) => Promise<Status<any> | undefined>;
    register: {
        text: (key: keyof T) => {
            name: keyof T;
            value: string;
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
        };
        slider: (key: keyof T) => { name: keyof T; defaul: number[]; onValueChange: (value: number[]) => void };
        number: (key: keyof T) => {
            name: keyof T;
            value: number;
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
        };
    };
    status: any;
    errors: Errors;
    onSuccess: (callback: (data: any) => void) => void;
    onError: (callback: (errors: Errors) => void) => void;
}

export async function submit<T extends z.ZodObject<any>>(
    schema: T,
    values: any,
    onSubmit: (data: any) => Promise<Status<any>>,
): Promise<
    | {
          errors: Errors;
          data: undefined;
      }
    | {
          errors: undefined;
          data: any;
      }
> {
    const result = schema.safeParse(values);
    if (!result.success) {
        return { errors: parseZodError(result.error), data: undefined };
    }

    const status = await onSubmit(result.data);
    if (status.error) {
        return { errors: parseServerError(status.error.message), data: undefined };
    }

    return { data: status.data, errors: undefined };
}

export default function useZodForm<K, T extends z.ZodObject<any>>(
    schema: T,
    defaultValues: z.infer<T> & { [key: string]: any },
    onSubmit?: (data: any) => Promise<Status<K>>,
    onValuesChange?: (values: z.infer<T>) => void,
): ZodForm<z.infer<T>> {
    const [values, setValues] = useState(defaultValues);
    const [status, setStatus] = useState<K | null | undefined>(undefined);
    const [errors, setErrors] = useState<Errors>({});

    let successCallback: (data: K | null) => void;
    let errorCallback: (errors: Errors) => void;

    const changeErrors = (errors: Errors) => {
        setErrors(errors);
        hasError(errors) && errorCallback && errorCallback(errors);
    };

    const changeStatus = (data: K | null | undefined) => {
        setStatus(data);
        data !== undefined && successCallback && successCallback(data);
    };

    const clear = () => {
        changeStatus(undefined);
        changeErrors({});
    };

    const setValue = <Key extends keyof typeof values>(
        key: Key,
        value: (typeof values)[Key] | ((prev: (typeof values)[Key]) => (typeof values)[Key]),
    ) => {
        clear();
        let newValue = value;

        if (typeof value === "function") {
            newValue = (value as (prev: (typeof values)[Key]) => (typeof values)[Key])(values[key]);
        }

        setValues((prev) => ({
            ...prev,
            [key]: newValue,
        }));
        onValuesChange && onValuesChange({ ...values, [key]: newValue });
    };

    const onSuccess = (callback: (data: K | null) => void) => {
        successCallback = callback;
    };

    const onError = (callback: (errors: Errors) => void) => {
        errorCallback = callback;
    };

    const submitFunction =
        onSubmit &&
        (async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            clear();

            const status = await submit(schema, values, onSubmit);

            if (status.errors) {
                changeErrors(status.errors);
                return status.errors;
            }

            changeStatus(status.data);
            setValues(defaultValues);
            return status.data;
        });

    const registerText = (key: keyof z.infer<T>) => {
        const arrayKey = (key as string).split(".");

        return {
            name: key,
            value: ((arrayKey.length > 1 ? values[arrayKey[0]]?.[arrayKey[1]] : values[key]) as string) ?? "",
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                clear();
                arrayKey.length > 1
                    ? setValue(arrayKey[0], { ...values[arrayKey[0]], [arrayKey[1]]: event.target.value ?? null })
                    : setValue(key, (event.target.value ?? null) as any);
            },
        };
    };

    const registerNumber = (key: keyof z.infer<T>) => {
        const arrayKey = (key as string).split(".");

        return {
            name: key,
            value: ((arrayKey.length > 1 ? values[arrayKey[0]]?.[arrayKey[1]] : values[key]) as number) ?? "",
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                clear();
                const v = event.target.value ? Number(event.target.value) : undefined;
                arrayKey.length > 1 ? setValue(arrayKey[0], { ...values[arrayKey[0]], [arrayKey[1]]: v }) : setValue(key, v as any);
            },
        };
    };

    const registerSlider = (key: keyof z.infer<T>) => {
        const arrayKey = (key as string).split(".");

        return {
            name: key,
            defaul: [(arrayKey.length > 1 ? values[arrayKey[0]]?.[arrayKey[1]] : values[key]) as number],
            onValueChange: (value: number[]) => {
                clear();
                setValue(key, value[0] as any);
            },
        };
    };

    return {
        values,
        setValue,
        submitFunction,
        register: {
            text: registerText,
            number: registerNumber,
            slider: registerSlider,
        },
        status,
        errors,
        onSuccess,
        onError,
    };
}
