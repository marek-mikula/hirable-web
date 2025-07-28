import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {ProcessStep} from "~/repositories/resources";

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    processSteps: ProcessStep[]
}>

export type StoreResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    processStep: ProcessStep
}>

export type UpdateResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    processStep: ProcessStep
}>

export type DeleteResponse = JsonResponse<RESPONSE_CODE.SUCCESS>