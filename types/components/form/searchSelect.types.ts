import type {SelectOption} from "~/types/common";

export type SearchSelectExpose = {
    setValue: (option: SelectOption | null) => void
    getValue: () => (SelectOption | null)
}