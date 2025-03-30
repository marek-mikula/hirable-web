import type {Response} from "~/types/request";
import type {InviteData} from "~/repositories/companyInvitation/input";
import type {InviteResponse} from "~/repositories/companyInvitation/response";

export interface CompanyInvitationRepositoryInterface {
    invite(data: InviteData): Response<InviteResponse, 'json'>
}