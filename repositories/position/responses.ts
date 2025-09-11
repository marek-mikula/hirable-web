import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {
    PaginatedResource,
    PositionList,
    GeneratedPosition,
    PositionShow
} from "~/repositories/resources";

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positions: PaginatedResource<PositionList>
}>

export type StoreResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    position: PositionShow
}>

export type UpdateResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    position: PositionShow
}>

export type ShowResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    position: PositionShow
}>

export type DeleteResponse = JsonResponse<RESPONSE_CODE.SUCCESS>

export type DuplicateResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    id: number
}>

export type CancelApprovalResponse = JsonResponse<RESPONSE_CODE.SUCCESS>

export type GenerateFromPromptResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    position: GeneratedPosition
}>


export type GenerateFromFileResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    position: GeneratedPosition
}>