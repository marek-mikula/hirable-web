import type {POSITION_APPROVAL_STATE} from "~/types/enums";

export type UpdateData = {
    state: POSITION_APPROVAL_STATE.APPROVED | POSITION_APPROVAL_STATE.REJECTED
    note: string | null
}