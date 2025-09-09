import type {PositionCandidate} from "~/repositories/resources";

export interface PositionCandidateRequestEvaluationModalExpose {
    open(pc: PositionCandidate): void
    close(): void
}