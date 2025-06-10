import {Repository} from "~/repositories/Repository";
import type {CompanyInvitationRepositoryInterface} from "~/repositories/companyInvitation/CompanyInvitationRepositoryInterface";
import type {InviteData} from "~/repositories/companyInvitation/inputs";
import type {IndexResponse, InviteResponse} from "~/repositories/companyInvitation/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export class CompanyInvitationRepository extends Repository implements CompanyInvitationRepositoryInterface {
    public async index(companyId: number, gridQuery: GridQueryString) {
        return this.get<IndexResponse>(`/api/company/${companyId}/invitations`, { query: gridQuery })
    }

    public async invite(companyId: number, data: InviteData) {
        return this.post<InviteResponse>(`/api/company/${companyId}/invitations`, { data })
    }
}