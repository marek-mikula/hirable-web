import type {Response} from "~/types/request";
import type {InviteData} from "~/repositories/companyInvitation/inputs";
import type {IndexResponse, InviteResponse, DeleteResponse} from "~/repositories/companyInvitation/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export interface CompanyInvitationRepositoryInterface {
    index(companyId: number, gridQuery: GridQueryString): Promise<Response<'json', IndexResponse>>
    invite(companyId: number, data: InviteData): Promise<Response<'json', InviteResponse>>
    deleteInvitation(companyId: number, invitationId: number): Promise<Response<'json', DeleteResponse>>
}