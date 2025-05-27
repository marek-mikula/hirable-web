import type {SelectOption} from "~/types/common";

export type SelectValue = null | number | string

export type SelectExpose = {
    getOption: (value: string | number) => SelectOption | null
}