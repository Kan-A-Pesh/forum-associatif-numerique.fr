import { z } from "zod";
import { compress } from "./image/compress";

export default class Exchanger {
    schema: z.ZodObject<any>;

    constructor(schema: z.ZodObject<any>) {
        this.schema = schema;
    }

    static async toFormData(schema: z.ZodObject<any>, values: any) {
        const exchanger = new Exchanger(schema);
        return exchanger.toFormData(values);
    }

    static async fromFormData(schema: z.ZodObject<any>, formData: FormData) {
        const exchanger = new Exchanger(schema);
        return exchanger.fromFormData(formData);
    }

    async toFormData(values: any): Promise<
        | {
              success: true;
              formData: FormData;
          }
        | {
              success: false;
              error: z.ZodError;
          }
    > {
        // check passed values against schema
        const result = this.schema.safeParse(values);

        if (!result.success) {
            return result;
        }

        const formData = new FormData();
        for (const key in values) {
            const value = values[key];

            // null
            if (value === null) {
                formData.append(key, "");
                formData.append(key + "::type", "null");
                continue;
            }

            // string
            if (typeof value === "string") {
                formData.append(key, value);
                formData.append(key + "::type", "string");
                continue;
            }

            // number
            if (typeof value === "number") {
                formData.append(key, value.toString());
                formData.append(key + "::type", "number");
                continue;
            }

            // boolean
            if (typeof value === "boolean") {
                formData.append(key, value.toString());
                formData.append(key + "::type", "boolean");
                continue;
            }

            // date
            if (value instanceof Date) {
                formData.append(key, value.toISOString());
                formData.append(key + "::type", "date");
                continue;
            }

            // file
            if (value instanceof File) {
                formData.append(key, await compress(value));
                formData.append(key + "::type", "file");
                continue;
            }

            // array
            // TODO: handle array

            // object
            if (typeof value === "object") {
                formData.append(key, JSON.stringify(value));
                formData.append(key + "::type", "object");
                continue;
            }

            // unknown
            console.error("Unknown value type for key:", key);
        }

        return {
            success: true,
            formData,
        };
    }

    async fromFormData(formData: FormData) {
        const values: any = {};

        for (const key of Array.from(formData.keys())) {
            if (key.endsWith("::type")) continue;

            const typeKey = key + "::type";
            const type = formData.get(typeKey);
            const value = formData.get(key);

            switch (type) {
                case "null":
                    values[key] = null;
                    break;
                case "string":
                    values[key] = value as string;
                    break;
                case "number":
                    values[key] = Number(value);
                    break;
                case "boolean":
                    values[key] = value === "true";
                    break;
                case "date":
                    values[key] = new Date(value as string);
                    break;
                case "file":
                    values[key] = value;
                    break;
                case "object":
                    values[key] = JSON.parse(value as string);
                    break;
                default:
                    console.error("Unknown type:", type);
            }
        }

        // Validate values against schema
        return this.schema.safeParse(values);
    }
}
