import type {Response} from "~/types/request";
import type {InviteData} from "~/repositories/companyInvitation/inputs";
import type {IndexResponse, InviteResponse, DeleteResponse} from "~/repositories/companyInvitation/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export interface CompanyInvitationRepositoryInterface {
    index(companyId: number, gridQuery: GridQueryString): Response<IndexResponse, 'json'>
    invite(companyId: number, data: InviteData): Response<InviteResponse, 'json'>
    deleteInvitation(companyId: number, invitationId: number): Response<DeleteResponse, 'json'>
}