import type {SelectOption} from "~/types/common";

export type SearchMultiSelectExpose = {
    setValue: (options: SelectOption[]) => void
    getValue: () => SelectOption[]
}