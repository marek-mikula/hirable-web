import {Repository} from "~/repositories/Repository";
import type {CompanyInvitationRepositoryInterface} from "~/repositories/companyInvitation/CompanyInvitationRepositoryInterface";
import type {InviteData} from "~/repositories/companyInvitation/input";
import type {IndexResponse, InviteResponse} from "~/repositories/companyInvitation/response";
import type {GridQueryString} from "~/types/grid";

export class CompanyInvitationRepository extends Repository implements CompanyInvitationRepositoryInterface {
    public index(gridQuery: GridQueryString) {
        return this.get<IndexResponse>('/api/company/invitations', { query: gridQuery })
    }

    public invite(data: InviteData) {
        return this.post<InviteResponse>('/api/company/invitations', { data })
    }
}