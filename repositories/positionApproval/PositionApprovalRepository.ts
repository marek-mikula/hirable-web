import {Repository} from "~/repositories/Repository";
import type {PositionApprovalRepositoryInterface} from "~/repositories/positionApproval/PositionApprovalRepositoryInterface";
import type {UpdateData} from "~/repositories/positionApproval/inputs";
import type {UpdateResponse} from "~/repositories/positionApproval/responses";

export class PositionApprovalRepository extends Repository implements PositionApprovalRepositoryInterface {
    public update(positionId: number, id: number, data: UpdateData) {
        return this.patch<UpdateResponse>(`/api/positions/${positionId}/approvals/${id}`, { data })
    }
}