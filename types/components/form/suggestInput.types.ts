import type {Promisable} from "~/types/common";

export type InputSuggester = (q: string | null) => Promisable<string[]>