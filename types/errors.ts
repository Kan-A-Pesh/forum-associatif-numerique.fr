import { z } from "zod";

export default interface Errors {
    [path: string | "_server"]: string;
}

export function parseZodError(
    error: z.ZodError<{
        [x: string]: any;
    }>,
) {
    return error.errors.reduce((acc, error) => {
        acc[error.path.join(".")] = error.message;
        return acc;
    }, {} as Errors);
}

export function parseServerError(error: string) {
    return {
        _server: error,
    };
}

export function hasError(errors: Errors) {
    return Object.keys(errors).length > 0;
}
