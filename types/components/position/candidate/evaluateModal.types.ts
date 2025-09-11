import type {PositionCandidate, PositionCandidateEvaluation} from "~/repositories/resources";

export interface PositionCandidateEvaluateModalExpose {
    open(pc: PositionCandidate, evaluation?: PositionCandidateEvaluation): void
    close(): void
}