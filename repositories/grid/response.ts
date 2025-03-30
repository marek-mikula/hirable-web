import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {Grid, GridQuery} from "~/repositories/resources";

export type ShowResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    grid: Grid
    query: GridQuery
}>

export type UpdateResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    grid: Grid
}>

export type SetColumnWidthResponse = JsonResponse<RESPONSE_CODE.SUCCESS>

export type ResetResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    grid: Grid
}>