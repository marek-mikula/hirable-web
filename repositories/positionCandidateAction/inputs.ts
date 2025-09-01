import type {ACTION_TYPE} from "~/types/enums";

export interface ActionData {
    type: ACTION_TYPE
    date: string | null
    timeStart: string | null
    timeEnd: string | null
    note: string | null
    place: string | null
    instructions: string | null
    result: string | null
    name: string | null
    interviewForm: string | null
    interviewType: string | null
    rejectedByCandidate: boolean | null
    rejectionReason: string | null
    refusalReason: string | null
    testType: string | null
}