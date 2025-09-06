import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PositionCandidateActionShow} from "~/repositories/resources";

export type StoreResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateAction: PositionCandidateActionShow
}>

export type UpdateResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateAction: PositionCandidateActionShow
}>

export type ShowResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateAction: PositionCandidateActionShow
}>
