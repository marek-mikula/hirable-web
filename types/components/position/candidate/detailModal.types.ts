import type {PositionCandidate} from "~/repositories/resources";

export interface DetailModalExpose {
    open(positionCandidateId: number): void
    close(): void
}