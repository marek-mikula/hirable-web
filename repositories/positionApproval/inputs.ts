import type {POSITION_APPROVAL_STATE} from "~/types/enums";

export type DecideData = {
    state: POSITION_APPROVAL_STATE.APPROVED | POSITION_APPROVAL_STATE.REJECTED
    note: string | null
}