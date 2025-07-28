import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {Position, PositionApproval} from "~/repositories/resources";

export type DecideResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    approval: PositionApproval
}>

export type ExternalShowResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    position: Position
}>

export type ExternalDecideResponse = JsonResponse<RESPONSE_CODE.SUCCESS>
