import type {PositionCandidate} from "~/repositories/resources";

export interface DetailModalExpose {
    open(positionCandidate: PositionCandidate): void
    close(): void
}