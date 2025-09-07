import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PositionCandidateShare} from "~/repositories/resources";

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateShares: PositionCandidateShare[]
}>

export type StoreResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateShares: PositionCandidateShare[]
}>

export type DeleteResponse = JsonResponse<RESPONSE_CODE.SUCCESS>
