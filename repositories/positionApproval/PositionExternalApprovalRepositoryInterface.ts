import type {Response} from "~/types/request";
import type {DecideData} from "~/repositories/positionApproval/inputs";
import type {ExternalDecideResponse, ExternalShowResponse} from "~/repositories/positionApproval/responses";

export interface PositionExternalApprovalRepositoryInterface {
    show(token: string): Response<ExternalShowResponse, 'json'>
    decide(token: string, data: DecideData): Response<ExternalDecideResponse, 'json'>
}