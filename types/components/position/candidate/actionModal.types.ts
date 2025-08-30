import type {ACTION_TYPE} from "~/types/enums";
import type {PositionCandidate,PositionProcessStep} from "~/repositories/resources";

export interface ActionModalExpose {
    open(action: ACTION_TYPE, positionCandidates: PositionCandidate[], step: PositionProcessStep): void
    close(): void
}