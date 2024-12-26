import { z } from "zod";

export type Topic = {
    name: string,
    id: number,
    size: number,
    endpoint: string,
    schema: string
}

export type Client = {
    name: string,
    id: number,
    secret: string,
    connected: boolean,
    topic: Topic,
}

// Define a regex for a valid URL path
const urlPathRegex = /^\/[a-zA-Z0-9/_-]*$/;

// Regex to roughly validate TypeScript type definitions
// const tsTypeDefinitionRegex = /^(type|interface)\s+[A-Za-z_][A-Za-z0-9_]*\s*=\s*{[^}]*};?$/s;
const tsTypeDefinitionRegex = /^{(\s*[A-Za-z_$][\w$]*\s*:\s*(string|number|boolean|any|void|undefined|null|Date|RegExp|[\w$]+(\[\])?)(\s*[,;])?)*\s*}$/

export const topicFormSchema = z.object({
  name: z.string().min(1, "Name is required"), // Name must be non-empty
  schema: z
    .string()
    .regex(tsTypeDefinitionRegex, "Schema must be a valid TypeScript type definition string"),
});