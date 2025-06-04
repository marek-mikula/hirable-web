import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PositionApproval} from "~/repositories/resources";
import type {PositionExternal} from "~/repositories/resources";

export type DecideResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    approval: PositionApproval
}>

export type CancelResponse = JsonResponse<RESPONSE_CODE.SUCCESS>

export type ExternalShowResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    position: PositionExternal
}>

export type ExternalDecideResponse = JsonResponse<RESPONSE_CODE.SUCCESS>
