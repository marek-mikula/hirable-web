import {Repository} from "~/repositories/Repository";
import type {CompanyInvitationRepositoryInterface} from "~/repositories/companyInvitation/CompanyInvitationRepositoryInterface";
import type {InviteData} from "~/repositories/companyInvitation/input";
import type {InviteResponse} from "~/repositories/companyInvitation/response";

export class CompanyInvitationRepository extends Repository implements CompanyInvitationRepositoryInterface {
    public invite(data: InviteData) {
        return this.post<InviteResponse>('/api/company/invitations', { data })
    }
}