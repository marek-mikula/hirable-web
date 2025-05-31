import type {LANGUAGE} from "~/types/enums";

export type StoreData = {
    firstname: string | null
    lastname: string | null
    email: string | null
    language: LANGUAGE | null
    companyName: string | null
    note: string | null
}