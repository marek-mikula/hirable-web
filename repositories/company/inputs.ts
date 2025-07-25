import type {LANGUAGE} from "~/types/enums";

export type UpdateKey =
    'name' |
    'email' |
    'idNumber' |
    'website' |
    'aiOutputLanguage'

export type UpdateData = {
    keys: UpdateKey[],
    name?: string | null
    email?: string | null
    idNumber?: string | null
    website?: string | null
    aiOutputLanguage?: LANGUAGE | null
}