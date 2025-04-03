import type {SelectOption} from "~/types/common";

export type FormExpose = {
    validate: () => boolean
}

export type ButtonExpose = {
    focus: () => void
}

export type AsyncSelectExpose = {
    getSelectedLabel: () => string | null
    setValue: (option: SelectOption | null) => void
}