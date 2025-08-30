import type {ACTION_TYPE} from "~/types/enums";
import type {Candidate} from "~/repositories/resources";

export interface ActionModalExpose {
    open(action: ACTION_TYPE, candidates: Candidate[]): void
    close(): void
}