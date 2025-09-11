import type {
    PositionCandidate,
    PositionProcessStep
} from "~/repositories/resources";

export interface AddEvent extends CustomEvent {
    from: HTMLElement
    to: HTMLElement
    item: HTMLElement
    oldIndex: number
    newIndex: number
}

export interface KanbanStep {
    step: PositionProcessStep
    count: number
    positionCandidates: PositionCandidate[]
}

export type KanbanEvent = {
    event: 'positionCandidateUpdated',
    id: number,
} | {
    event: 'select'
    value: boolean
    positionCandidateId: number | number[]
}
