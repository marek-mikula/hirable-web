import type {SelectOption} from "~/types/common";

export type SearchSelectExpose = {
    getSelectedLabel: () => string | null
    setValue: (option: SelectOption | null) => void
}