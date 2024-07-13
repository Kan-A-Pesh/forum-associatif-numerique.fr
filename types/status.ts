import { PostgrestError } from "@supabase/supabase-js";

type StatusError = {
    data: null;
    error: {
        name: string;
        message: string;
    };
};

type StatusSuccess<T> = {
    data: T;
    error: null;
};

type Status<T> = StatusError | StatusSuccess<T>;

function ErrorStatus(name: string, message: string): Status<any>;
function ErrorStatus(error: Error): Status<any>;
function ErrorStatus(error: PostgrestError): Status<any>;
function ErrorStatus(nameOrError: string | Error | PostgrestError, message?: string): Status<any> {
    return {
        data: null,
        error: {
            name:
                // nameOrError: string
                typeof nameOrError === "string"
                    ? nameOrError
                    : // nameOrError: Error
                    Object.hasOwn(nameOrError, "name")
                    ? (nameOrError as Error).name
                    : // nameOrError: PostgrestError
                      `Postgres error: ${(nameOrError as PostgrestError).code}`,
            message: (typeof nameOrError === "string" ? message : nameOrError.message) ?? "Unknown error",
        },
    };
}

function SuccessStatus<T>(data: T): Status<T> {
    return {
        data: data,
        error: null,
    };
}

export { type Status, ErrorStatus, SuccessStatus };
