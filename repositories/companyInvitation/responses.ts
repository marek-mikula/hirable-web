import type {JsonResponse} from "~/types/request";
import type {RESPONSE_CODE} from "~/types/enums";
import type {PaginatedResource, TokenInvitation} from "~/repositories/resources";

export type IndexResponse = JsonResponse<RESPONSE_CODE.SUCCESS, {
    invitations: PaginatedResource<TokenInvitation>
}>

export type InviteResponse = JsonResponse<RESPONSE_CODE.SUCCESS>

export type DeleteResponse = JsonResponse<RESPONSE_CODE.SUCCESS>