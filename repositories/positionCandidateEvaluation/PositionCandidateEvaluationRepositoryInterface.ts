import type {Response} from "~/types/request";
import type {DeleteResponse, IndexResponse, StoreResponse, RequestResponse} from "~/repositories/positionCandidateEvaluation/responses";
import type {StoreData, RequestData} from "~/repositories/positionCandidateEvaluation/inputs";

export interface PositionCandidateEvaluationRepositoryInterface {
    index(positionId: number, positionCandidateId: number): Promise<Response<'json', IndexResponse>>
    store(positionId: number, positionCandidateId: number, data: StoreData): Promise<Response<'json', StoreResponse>>
    requestEvaluation(positionId: number, positionCandidateId: number, data: RequestData): Promise<Response<'json', RequestResponse>>
    deleteEvaluation(positionId: number, positionCandidateId: number, id: number): Promise<Response<'json', DeleteResponse>>
}