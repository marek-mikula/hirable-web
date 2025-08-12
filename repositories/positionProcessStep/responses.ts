import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PositionProcessStep} from "~/repositories/resources";

export type StoreResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionProcessStep: PositionProcessStep
}>

export type UpdateResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positionProcessStep: PositionProcessStep
}>

export type DeleteResponse = JsonResponse<RESPONSE_CODE.SUCCESS>
