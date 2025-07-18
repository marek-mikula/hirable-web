import type {RESPONSE_CODE} from "~/types/enums";

export type ErrorRule = {
    routes: string[],
    codes: RESPONSE_CODE[],
    translations: { title: string, message: string }
}