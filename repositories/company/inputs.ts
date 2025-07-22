import type {LANGUAGE} from "~/types/enums";

export type UpdateKey =
    'language' |
    'name' |
    'email' |
    'idNumber' |
    'website' |
    'environment' |
    'benefits'

export type UpdateData = {
    keys: UpdateKey[],
    language?: LANGUAGE | null
    name?: string | null
    email?: string | null
    idNumber?: string | null
    website?: string | null
    environment?: string | null
    benefits?: string[]
}