import type {
    Candidate,
    PositionCandidate,
    PositionCandidateAction, PositionCandidateEvaluation,
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
    positionCandidate: PositionCandidate
} | {
    event: 'positionCandidateActionUpdated'
    positionCandidateAction: PositionCandidateAction
} | {
    event: 'select'
    value: boolean
    positionCandidateId: number | number[]
} | {
    event: 'positionProcessStepDeleted'
    positionProcessStepId: number
} | {
    event: 'positionProcessStepUpdated'
    positionProcessStep: PositionProcessStep
} | {
    event: 'candidateUpdated',
    candidate: Candidate
} | {
    event: 'positionCandidateShareCountUpdated',
    positionCandidateId: number
    sharesCount: number
} | {
    event: 'positionCandidateEvaluationRequested',
    positionCandidateId: number
    positionCandidateEvaluations: PositionCandidateEvaluation[]
} | {
    event: 'positionCandidateEvaluationEvaluated',
    positionCandidateId: number
    positionCandidateEvaluation: PositionCandidateEvaluation
} | {
    event: 'positionCandidateEvaluationDeleted',
    positionCandidateId: number
    positionCandidateEvaluation: PositionCandidateEvaluation
}
