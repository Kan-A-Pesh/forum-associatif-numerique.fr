import { Status } from "@/types/status";

export default interface EditorProps<T> {
    initial?: T & { [key: string]: any };
    base?: T & { [key: string]: any };
    id?: string;
    lang: number;
    onValuesChange?: (data: T) => void;
    onSubmit?: (data: any) => Promise<Status<any>>;
}
