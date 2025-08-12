import {Repository} from "~/repositories/Repository";
import type {PositionApprovalRepositoryInterface} from "~/repositories/positionApproval/PositionApprovalRepositoryInterface";
import type {DecideData} from "~/repositories/positionApproval/inputs";
import type {DecideResponse} from "~/repositories/positionApproval/responses";

export class PositionApprovalRepository extends Repository implements PositionApprovalRepositoryInterface {
    public async decide(positionId: number, id: number, data: DecideData) {
        return this.patch<'json', DecideResponse>(`/api/positions/${positionId}/approvals/${id}/decide`, { data })
    }
}