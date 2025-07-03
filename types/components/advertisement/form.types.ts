import type {SelectOption} from "~/types/common";

export type Place = {
    place: SelectOption | null
    isCustom: boolean
    custom: string | null
}