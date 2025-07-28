import type {Response} from "~/types/request";
import type {DecideResponse} from "~/repositories/positionApproval/responses";
import type {DecideData} from "~/repositories/positionApproval/inputs";

export interface PositionApprovalRepositoryInterface {
    decide(positionId: number, id: number, data: DecideData): Promise<Response<'json', DecideResponse>>
}