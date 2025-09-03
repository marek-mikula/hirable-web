import type {PositionCandidateAction} from "~/repositories/resources";

export interface ActionShowModalExpose {
    open(positionCandidateAction: PositionCandidateAction): void
    close(): void
}