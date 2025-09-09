import {Repository} from "~/repositories/Repository";
import type {DeleteResponse, IndexResponse, StoreResponse, RequestResponse} from "~/repositories/positionCandidateEvaluation/responses";
import type {StoreData, RequestData} from "~/repositories/positionCandidateEvaluation/inputs";
import type {PositionCandidateEvaluationRepositoryInterface} from "~/repositories/positionCandidateEvaluation/PositionCandidateEvaluationRepositoryInterface";

export class PositionCandidateEvaluationRepository extends Repository implements PositionCandidateEvaluationRepositoryInterface {
    public async index(positionId: number, positionCandidateId: number) {
        return this.get<'json', IndexResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/evaluations`)
    }

    public async store(positionId: number, positionCandidateId: number, data: StoreData) {
        return this.post<'json', StoreResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/evaluations`, {
            data
        })
    }

    public async requestEvaluation(positionId: number, positionCandidateId: number, data: RequestData) {
        return this.post<'json', RequestResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/evaluations`, {
            data
        })
    }

    public async deleteEvaluation(positionId: number, positionCandidateId: number, id: number) {
        return this.delete<'json', DeleteResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/evaluations/${id}`)
    }
}