import type {ACTION_TYPE} from "~/types/enums";
import type {PositionCandidate} from "~/repositories/resources";

export interface ActionStoreModalExpose {
    open(action: ACTION_TYPE, positionCandidates: PositionCandidate[]): void
    close(): void
}