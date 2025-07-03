import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PaginatedResource, Notification} from "~/repositories/resources";

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    notifications: PaginatedResource<Notification>
}>

export type UnreadResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    count: number
}>

export type MarkReadResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    notification: Notification
}>

export type MarkAllReadResponse = JsonResponse<RESPONSE_CODE.SUCCESS>