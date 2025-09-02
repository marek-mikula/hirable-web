import type {PositionCandidate, PositionProcessStep} from "~/repositories/resources";

export interface AddEvent extends CustomEvent {
    from: HTMLElement
    to: HTMLElement
    item: HTMLElement
    oldIndex: number
    newIndex: number
}

export interface KanbanStep {
    step: PositionProcessStep
    totalCandidates: number
    positionCandidates: PositionCandidate[]
}