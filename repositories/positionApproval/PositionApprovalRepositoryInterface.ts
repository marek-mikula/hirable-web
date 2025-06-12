import type {Response} from "~/types/request";
import type {CancelResponse, DecideResponse} from "~/repositories/positionApproval/responses";
import type {DecideData} from "~/repositories/positionApproval/inputs";

export interface PositionApprovalRepositoryInterface {
    decide(positionId: number, id: number, data: DecideData): Promise<Response<'json', DecideResponse>>
    cancel(positionId: number): Promise<Response<'json', CancelResponse>>
}