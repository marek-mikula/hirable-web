import {Repository} from "~/repositories/Repository";
import type {CompanyInvitationRepositoryInterface} from "~/repositories/companyInvitation/CompanyInvitationRepositoryInterface";
import type {InviteData} from "~/repositories/companyInvitation/inputs";
import type {DeleteResponse, IndexResponse, InviteResponse} from "~/repositories/companyInvitation/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export class CompanyInvitationRepository extends Repository implements CompanyInvitationRepositoryInterface {
    public async index(companyId: number, gridQuery: GridQueryString) {
        return this.client.get<'json', IndexResponse>(`/api/companies/${companyId}/invitations`, { query: gridQuery })
    }

    public async invite(companyId: number, data: InviteData) {
        return this.client.post<'json', InviteResponse>(`/api/companies/${companyId}/invitations`, { data })
    }

    public async delete(companyId: number, invitationId: number) {
        return this.client.delete<'json', DeleteResponse>(`/api/companies/${companyId}/invitations/${invitationId}`)
    }
}