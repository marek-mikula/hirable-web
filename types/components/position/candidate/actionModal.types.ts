import type {ACTION_TYPE} from "~/types/enums";
import type {PositionCandidate} from "~/repositories/resources";

export interface ActionModalExpose {
    open(action: ACTION_TYPE, positionCandidates: PositionCandidate[]): void
    close(): void
}