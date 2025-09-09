import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PositionCandidateEvaluationShow} from "~/repositories/resources";

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateEvaluations: PositionCandidateEvaluationShow[]
}>

export type StoreResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateEvaluation: PositionCandidateEvaluationShow
}>

export type RequestResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateEvaluations: PositionCandidateEvaluationShow[]
}>

export type UpdateResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidateEvaluation: PositionCandidateEvaluationShow
}>

export type DeleteResponse = JsonResponse<RESPONSE_CODE.SUCCESS>
