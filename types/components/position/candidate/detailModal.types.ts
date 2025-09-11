import type {PositionCandidate} from "~/repositories/resources";

export interface PositionCandidateDetailModalExpose {
    open(pc: PositionCandidate): void
    close(): void
}