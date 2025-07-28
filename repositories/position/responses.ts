import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PaginatedResource, Position, PositionList, KanbanStep} from "~/repositories/resources";

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    positions: PaginatedResource<PositionList>
}>

export type StoreResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    position: Position
}>

export type UpdateResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    position: Position
}>

export type ShowResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    position: Position
}>

export type DeleteResponse = JsonResponse<RESPONSE_CODE.SUCCESS>

export type DuplicateResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    id: number
}>

export type CancelApprovalResponse = JsonResponse<RESPONSE_CODE.SUCCESS>

export type KanbanResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    kanbanSteps: KanbanStep[]
}>

export type KanbanUpdateSettingsResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    kanbanSteps: KanbanStep[]
}>