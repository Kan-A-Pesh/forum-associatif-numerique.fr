interface Status<T> {
    data: T | null;
    error: {
        name: string;
        message: string;
    } | null;
}

export { type Status };
