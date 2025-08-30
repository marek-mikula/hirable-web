import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PositionCandidateAction} from "~/repositories/resources";

export type StoreResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateAction: PositionCandidateAction
}>
