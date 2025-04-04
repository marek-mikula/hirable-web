import type {Response} from "~/types/request";
import type {InviteData} from "~/repositories/companyInvitation/input";
import type {IndexResponse, InviteResponse} from "~/repositories/companyInvitation/response";
import type {GridQueryString} from "~/types/grid";

export interface CompanyInvitationRepositoryInterface {
    index(gridQuery: GridQueryString): Response<IndexResponse, 'json'>
    invite(data: InviteData): Response<InviteResponse, 'json'>
}