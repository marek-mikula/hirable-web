import type {PROCESS_STEP} from "~/types/enums";

export type SettingsModalData = {
    order: {
        step: PROCESS_STEP | string
        isCustom: boolean
    }[]
}