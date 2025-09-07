import type {PositionCandidate} from "~/repositories/resources";

export interface PositionCandidateShareModalExpose {
    open(pc: PositionCandidate): void
    close(): void
}