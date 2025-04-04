import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PaginatedResource, Token} from "~/repositories/resources";

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    invitations: PaginatedResource<Token>
}>

export type InviteResponse = JsonResponse<RESPONSE_CODE.SUCCESS>