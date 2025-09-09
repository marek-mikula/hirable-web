import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PositionCandidateEvaluation} from "~/repositories/resources";

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateEvaluations: PositionCandidateEvaluation[]
}>

export type StoreResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateEvaluation: PositionCandidateEvaluation
}>

export type RequestResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateEvaluation: PositionCandidateEvaluation
}>

export type DeleteResponse = JsonResponse<RESPONSE_CODE.SUCCESS>
