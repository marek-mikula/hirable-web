import {Repository} from "~/repositories/Repository";
import type {PositionExternalApprovalRepositoryInterface} from "~/repositories/positionApproval/PositionExternalApprovalRepositoryInterface";
import type {DecideData} from "~/repositories/positionApproval/inputs";
import type {ExternalDecideResponse, ExternalShowResponse} from "~/repositories/positionApproval/responses";

export class PositionExternalApprovalRepository extends Repository implements PositionExternalApprovalRepositoryInterface {
    public async show(token: string) {
        return this.client.get<'json', ExternalShowResponse>(`/api/positions/external-approvals`, {
            query: { token }
        })
    }

    public async decide(token: string, data: DecideData) {
        return this.client.patch<'json', ExternalDecideResponse>(`/api/positions/external-approvals`, {
            query: { token },
            data
        })
    }
}