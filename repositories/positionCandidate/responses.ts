import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PositionCandidate} from "~/repositories/resources";

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidates: PositionCandidate[]
}>

export type ShowResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidate: PositionCandidate
}>

export type SetStepResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionCandidate: PositionCandidate
}>
