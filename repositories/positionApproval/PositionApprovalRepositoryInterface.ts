import type {Response} from "~/types/request";
import type {UpdateResponse} from "~/repositories/positionApproval/responses";
import type {UpdateData} from "~/repositories/positionApproval/inputs";

export interface PositionApprovalRepositoryInterface {
    update(positionId: number, id: number, data: UpdateData): Response<UpdateResponse, 'json'>
}