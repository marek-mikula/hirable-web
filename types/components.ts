import type {SelectOption} from "~/types/common";

export type FormExpose = {
    validate: () => boolean
}

export type ButtonExpose = {
    focus: () => void
}

export type SearchSelectExpose = {
    getSelectedLabel: () => string | null
    setValue: (option: SelectOption | null) => void
}

export type DataGridExpose = {
    refresh: () => Promise<void>
}