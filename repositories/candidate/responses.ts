import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PaginatedResource, Candidate} from "~/repositories/resources";

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    candidates: PaginatedResource<Candidate>
}>

export type ShowResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    candidate: Candidate
}>

export type UpdateResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    candidate: Candidate
}>