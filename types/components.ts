import type {SelectOption} from "~/types/common";

export type SearchSelectExpose = {
    getSelectedLabel: () => string | null
    setValue: (option: SelectOption | null) => void
}

export type DataGridExpose = {
    refresh: () => Promise<void>
}

export type SelectExpose = {
    getOption: (value: string | number) => SelectOption | null
}