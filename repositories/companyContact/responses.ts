import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {CompanyContact, PaginatedResource} from "~/repositories/resources";

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    contacts: PaginatedResource<CompanyContact>
}>

export type StoreResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    contact: CompanyContact
}>

export type SuggestResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    values: string[]
}>