import type {Response} from "~/types/request";
import type {InviteData} from "~/repositories/companyInvitation/inputs";
import type {IndexResponse, InviteResponse} from "~/repositories/companyInvitation/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export interface CompanyInvitationRepositoryInterface {
    index(gridQuery: GridQueryString): Response<IndexResponse, 'json'>
    invite(data: InviteData): Response<InviteResponse, 'json'>
}