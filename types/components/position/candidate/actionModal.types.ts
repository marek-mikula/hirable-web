import type {ACTION_TYPE} from "~/types/enums";

export interface ActionModalExpose {
    open(action: ACTION_TYPE): void
    close(): void
}