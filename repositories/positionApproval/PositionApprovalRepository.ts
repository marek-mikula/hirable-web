import {Repository} from "~/repositories/Repository";
import type {PositionApprovalRepositoryInterface} from "~/repositories/positionApproval/PositionApprovalRepositoryInterface";
import type {UpdateData} from "~/repositories/positionApproval/inputs";
import type {CancelResponse, UpdateResponse} from "~/repositories/positionApproval/responses";

export class PositionApprovalRepository extends Repository implements PositionApprovalRepositoryInterface {
    public async update(positionId: number, id: number, data: UpdateData) {
        return this.patch<UpdateResponse>(`/api/positions/${positionId}/approvals/${id}`, { data })
    }

    public async cancel(positionId: number) {
        return this.post<CancelResponse>(`/api/positions/${positionId}/approvals/cancel`)
    }
}